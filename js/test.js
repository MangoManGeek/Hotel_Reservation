var Customer=require("./customer.js");
var CreditCard=require("./creditCard.js");
var Hotel=require("./hotel.js");
var Room=require("./room.js");
var Reservation=require("./reservation.js");
var Breakfast=require("./breakfast.js");
var Service=require("./service.js");
var RoomReview=require("./roomReview.js");
var BreakfastReview=require("./breakfastReview.js");
var ServiceReview=require("./serviceReview.js");
var Util=require("./util.js");

/*
var thiss={
	hotelId: 2,
	phone: 732,
	
	street:"Sturbridge",
	city:"piscataway",
	state:"nj",
	country: "US",
	zip: "08854"


}


var h=new hotel(thiss);
h.storeToDB();



hotel.getHotelById(2,function(hotel){
	console.log(hotel);
})


var cc=new CreditCard({
	Cnumber:"555",
	billingAddr: "15 Sturbridge",
	name: "Da",
	secCode: "000",
	type: "Visa",
	expDate: "2018-1-1"
});
cc.storeToDB();
/*
CreditCard.getCreditCard(333,function(c){
	console.log(c.secCode);
})
*//*
var r={
	hotelId:1,
	roomNumber: 101,
	price: 100.5,
	capacity: 4,
	floorNumber:1,
	description: "good room",
	type: "biao jian"

};
var room=new Room(r);
room.storeToDB();

Room.getRoomByHotelIdAndRoomNumber(1,101,function(room){
	console.log(room);
});
*/
/*
var r={
	invoiceNumber:1,
	resDate: "2017-1-1",
	totalAmount: 100,
	inDate: "2017-1-1",
	outDate: "2017-2-2",
	username: "123",
	Cnumber: '111',

}*/

var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});


/*
var breakfast={
	hotelId: 111,
	bType: "standard+",
	description: "good breakfast",
	bPrice: 60
};

var b=new Breakfast(breakfast);
b.storeToDB();*/
/*
var service={
	sType: "Japanese",
	sCost: 100,
	hotelId: 111
}
*/

/*
var rreview={
	reviewId: 1,
	roomNumber: 101,
	hotelId: 111,
	content: "content",
	rating: 1,
	username: 'cid'
}

var r=new RoomReview(rreview);
r.storeToDB();


var sreview={
	reviewId: 9,
	sType: "pickup",
	hotelId: 111,
	content: "content",
	rating: 1,
	username: 'cid'
}



var s=new ServiceReview(sreview);
console.log(s);
*/

/*s.storeToDB();
*/

//console.log(JSON.stringify([{a:1, b:2},{a:1, b:2}]));


//var sql=`select * from Has_Room where hotelId=${hotelId} and room_no='${roomNumber}';`;


Util.generateInvoiceNumber(connection, function(max){

});

//console.log(sql);