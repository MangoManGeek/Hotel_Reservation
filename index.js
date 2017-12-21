var express=require("express"); 
var cors=require("cors");
var bodyParser=require("body-parser");
var path=require("path");
var fs=require("fs");

//customize js module
var Customer=require("./js/customer.js");
var CreditCard=require("./js/creditCard.js");
var Hotel=require("./js/hotel.js");
var Room=require("./js/room.js");
var Reservation=require("./js/reservation.js");
var Breakfast=require("./js/breakfast.js");
var Service=require("./js/service.js");
var RoomReview=require("./js/roomReview.js");
var BreakfastReview=require("./js/breakfastReview.js");
var ServiceReview=require("./js/serviceReview.js");
var Util=require("./js/util.js");  

//global variables

var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});

connection.connect();

var isAdmin=false;
var hotels=[];
var dateInfo={};
var type=null;
var hid=0;
var isLoggedIn=false;
var username=null;

var reservationInfo={};




function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


//create express instance
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//custom middleware to log message
app.use(function(req,res,next){
	
	var now = new Date(); 
	var datetime = (now.getMonth()+1) + "/"
                + now.getDate()  + "/" 
                + now.getFullYear() + "  "  
                + now.getHours() + ":"  
                + now.getMinutes() + ":" 
                + now.getSeconds();

    console.log(`${req.method} request for ${req.url}		${datetime}`);
    next();

});
 
//File Server on static files
app.use(express.static("./public"));




app.get('/query', function(req, res){

	if(isEmpty(req.query)){
		console.log("Query is empty");
		req.sendStatus(404);
	}

	if(req.query.target=="hotels"){
		res.json(hotels);
	}

});

app.get('/queryHotels', function(req, res){

	//console.log(hotels);

	res.json(hotels);
	hotels=[];

});

app.get('/roomInfo', function(req, res){




	
	Room.getRoomsByHotelIdAndType(connection,hid,type, null,function(rooms, address){

		//console.log(hid);
		//console.log(type);

		if(rooms.length==0){
			res.sendStatus(500);
			return;
		}

		var rv={};
		reservationInfo.roomNumber=rooms[0].roomNumber;
		rv.roomNum=rooms[0].roomNumber;
		rv.roomType=rooms[0].type;
		rv.roomCap=rooms[0].capacity;
		rv.price=rooms[0].price;
		rv.description=rooms[0].description;

		//reservationInfo.roomNumber=rv.roomNumber;
		//reservationInfo.roomType=


		//console.log(rv);
		res.json(rv);




	});



});


app.get("/myReservation", function(req, res){

	if(isLoggedIn){
		res.send({redirect: "/html/myReservation.html"});
		return;
	}else{
		res.send({redirect: "/html/signin.html"})
		return; 
	}

});


app.get("/getTotal", function(req, res){
	res.json({total: reservationInfo.totalAmount});
})


app.get("/getMyReservation", function(req, res){

	Customer.getCustomer(connection, username, function(c){

		var rvProfile={};
		var rvReservation={};

		rvProfile.username=username;
		rvProfile.name=c.name;
		rvProfile.email=c.email;
		rvProfile.phone=c.phone;
		rvProfile.address=c.address;

		rvReservation.roomNum=reservationInfo.roomNumber;
		rvReservation.indate=reservationInfo.indate;
		rvReservation.outdate=reservationInfo.outdate;
		rvReservation.roomType=type;
		rvReservation.price=reservationInfo.totalAmount;

		//log(rvProfile);
		//console.log(rvReservation);

		res.json({profile: rvProfile,
				  reservation: rvReservation});


	});

});

app.post("/stats", function(req, res){

	var c=req.body.category;

	console.log(req.body);

	if(c==='room'){
		Util.getHighRoomType(connection, function(results){

			rv=[];

			
			for(var i=0;i<results.length; i++){
				rv.push({hotelId: results[i].hotelId,
						type: results[i].type,
						max:results[i].max});

			}

			res.json(rv);
		});
	}else if(c==='customer'){

		Util.getTop5Customer(connection, function(results){

			rv=[];

			
			for(var i=0;i<results.length; i++){
				rv.push({hotelId: 'N/A',
						type: results[i].cid,
						max:results[i].sum});

			}

			res.json(rv);
		});

	}else if(c==='breakfast'){

		Util.getHighBreakfastType(connection, function(results){

			rv=[];

			
			for(var i=0;i<results.length; i++){
				rv.push({hotelId: results[i].hotelId,
						type: results[i].bType,
						max:results[i].max});

			}

			res.json(rv);
		});

	}else{

		Util.getHighServiceType(connection, function(results){

			rv=[];

			
			for(var i=0;i<results.length; i++){
				rv.push({hotelId: results[i].hotelId,
						type: results[i].sType,
						max:results[i].max});

			}

			res.json(rv);
		});

	}

});


app.post("/review", function(req, res){

	

	Util.generateReviewId(connection, function(max){

		var reviewType=req.body.reviewType;
		var newReviewId=max+1;

		if(reviewType==='room'){

			var rReview=new RoomReview({
				reviewId: newReviewId,
				roomNumber: reservationInfo.roomNumber,
				hotelId: reservationInfo.hotelId,
				content: req.body.text,
				rating: req.body.rating,
				username: username
			});

			console.log(rReview);

			rReview.storeToDB(connection);


		}else if(reviewType==='breakfast'){

			var bReview=new BreakfastReview({
				reviewId: newReviewId,
				bType: req.body.detailedType,
				hotelId: reservationInfo.hotelId,
				content: req.body.text,
				rating: req.body.rating,
				username: username

			});
			console.log(bReview);

			bReview.storeToDB(connection);

		}else{
		//service review

			var sReview=new ServiceReview({

				reviewId: newReviewId,
				sType: req.body.detailedType,
				hotelId: reservationInfo.hotelId,
				content: req.body.text,
				rating: req.body.rating,
				username: username
			});
			console.log(sReview);

			sReview.storeToDB(connection);
		}

		res.send({redirect: "/html/home1.html"})

	});



	

});






app.post("/pay", function(req, res){

	//console.log(req.body);


	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	Util.generateInvoiceNumber(connection, function(max){


		console.log(max);
		reservationInfo.invoiceNumber=max+1;

		var cc=req.body;
		//reservationInfo.name=req.body.name;
		cc.invoiceNumber=reservationInfo.invoiceNumber


		var card=new CreditCard(cc);
		card.storeToDB(connection);






		reservationInfo.resDate=date;

	//console.log(reservationInfo);

	var r=new Reservation({
		invoiceNumber: reservationInfo.invoiceNumber,
		resDate: reservationInfo.resDate,
		totalAmount: reservationInfo.totalAmount,
		inDate: reservationInfo.indate,
		outDate: reservationInfo.outdate,
		username: reservationInfo.username,
		Cnumber: card.Cnumber

	});

	//console.log("r:");
	//console.log(r);

	r.storeToDB(connection);

	//console.log(reservationInfo);

	Util.storeReserves(connection, reservationInfo.hotelId, reservationInfo.roomNumber, reservationInfo.invoiceNumber);

	var breakfastQuantity=reservationInfo.breakfast;
	var types=['French', 'Chinese', 'American', 'Japanese'];
	for(var i=0;i<breakfastQuantity.length; i++){
		if(breakfastQuantity[i]==0){
			continue;
		}

		//reservationInfo.totalAmount=reservationInfo.totalAmount+breakfastQuantity[i]*20;

		Util.storeIncludes(connection,types[i], reservationInfo.hotelId, reservationInfo.invoiceNumber, breakfastQuantity[i]);


	}

	var service=reservationInfo.service;

	for(var i=0;i<service.length;i++){
		Util.storeContains(connection, service[i], reservationInfo.hotelId, reservationInfo.invoiceNumber);
		//reservationInfo.totalAmount=reservationInfo.totalAmount+20;
	}






	res.send({redirect: "/html/myReservation.html"});
	});
	







});


app.post("/createReservation", function(req,res){

	//console.log(req.body);

	reservationInfo.price=req.body.price;
	reservationInfo.service=req.body.service;
	reservationInfo.breakfast=req.body.breakfast;  //[FrenchQuantity, ChineseQuantity, AmericanQuantity, JapaneseQuantity]
	reservationInfo.username=username;
	reservationInfo.indate=dateInfo.indate;
	reservationInfo.outdate=dateInfo.outdate;
	reservationInfo.totalAmount=Util.computeDate(dateInfo.indate,dateInfo.outdate)*req.body.price;

	var service=reservationInfo.service;
	var breakfastQuantity=reservationInfo.breakfast;

	for(var i=0;i<breakfastQuantity.length; i++){
		if(breakfastQuantity[i]==0){
			continue;
		}

		reservationInfo.totalAmount=reservationInfo.totalAmount+breakfastQuantity[i]*20;


	}

	for(var i=0;i<service.length;i++){
		reservationInfo.totalAmount=reservationInfo.totalAmount+20;
	}


	res.send({redirect: "/html/pay.html"});


});



app.post("/login", function(req, res){

	//console.log(req.body);

	var user=req.body.username;
	var password=req.body.password;

	Customer.getCustomer(connection, user, function(customer){

		//console.log(customer);

		if(customer==null){ 
			res.send({redirect: "/html/signin1.html"});
			return;
		}
		if(customer.password!=password){
		res.send({redirect: "/html/signin1.html"});
			return;

		}

		isLoggedIn=true;
		username=user;
		if(user==='admin'){

			isAdmin=true;

			res.send({redirect: "/html/stats.html"});

		}else{

			res.send({redirect: "/html/home1.html"});

		}
		




	});

});

app.post("/register", function(req, res){

	var customer=new Customer(req.body);

	customer.storeToDB(connection);

	res.send({redirect: "/html/signin.html"});

});


 


 app.post("/hid", function(req, res){

 	//console.log(req.body.hid);

 	hid=req.body.hid;
 	reservationInfo.hotelId=hid;

/*
 	if(isLoggedIn){
 		res.send({redirect: "/html/hotel-room1.html"});
 	}else{
 		res.send({redirect: "/html/hotel-room.html"});
 	}

 */	
 	res.send({redirect: "/html/hotel-room.html"});

 });


app.post("/home", function(req, res){

	dateInfo.indate=req.body.indate;
	dateInfo.outdate=req.body.outdate;
	type=req.body.roomType;

	Hotel.getHotelsByLocationAndRoomType(connection,req.body.country, req.body.state, req.body.roomType, function(hs){

		

		for(var i=0;i<hs.length;i++){
			//console.log( hs[i]);
			var address=hs[i].street+','+hs[i].city+','+hs[i].state+','+hs[i].country+','+hs[i].zip;
			//console.log('address: '+address);
			Room.getRoomsByHotelIdAndType(connection,hs[i].hotelId,req.body.roomType,address, function(rooms,address){
				//var isPushed=false;
				/*for(var j=0;j<rooms.length; j++){
					//console.log(rooms[j]);
					Room.isFree(connection,rooms[j].hotelId, rooms[j].roomNumber, req.body.indate, req.body.outdate, function(isfree){
						if(isfree && !isPushed){
							hotels.push({hotelId: hs[i].hotelId,
										 price: rooms[j].price});
							isPushed=true;
						}
					});
					hotels.push({hotelId: rooms[j].hotelId,
								price: rooms[j].price});
					break;


				}*/
				//var address=hs[i].street+','+hs[i].city+','+hs[i].state+','+hs[i].country+','+hs[i].zip;
				if(rooms.length>0){

					hotels.push({hotelId: rooms[0].hotelId,
								price: rooms[0].price,
								location: address});
				}
			});
		}

	});

	if(isLoggedIn){
		res.send({redirect: "/html/hotelList.html"});

	}else{
		res.send({redirect: "/html/signin.html"});
	}

});



/*
@deprecated

app.post("/login",function(req,res){
	//console.log(req.body);
	
	var username=req.body.username; 
	var password=req.body.password;

	Customer.getCustomer(username, function(c){
		if(c.password==password){
			console.log("login successful");
			res.send({redirect: "/html/pay.html"});
			
		}else{
			console.log("login failed");
			res.send({redirect: "/public/indexx.html"});				//change html here
		}
	});

});


@deprecated
app.post("/register",function(req,res){


	//console.log(req.body) ; 
	var person=new Customer(req.body);
	person.storeToDB(); 

	res.send({redirect: "/public/index.html"});

});
*/







app.listen(8080);
console.log("Server running on port 8080");

module.exports=app;

