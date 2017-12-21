/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Hotel{
	constructor(json){
		this.hotelId=json.hotelId;
		this.phone=json.phone;
		this.street=json.street;
		this.city=json.city;
		this.state=json.state;
		this.country=json.country;
		this.zip=json.zip;

	}

	storeToDB(connection){
		var sql=`insert into Hotel values (${this.hotelId},${this.phone},'${this.street}','${this.city}','${this.state}','${this.country}','${this.zip}');`;
		//console.log(sql);
		//connection.connect();
		connection.query(sql,function(err,rows,fields){
			if(err){
				throw err;
			}

		});
		//connection.end();
	}

	//callback(arrayOfHotels)
	static getHotelsByLocation(connection,country,state,callback){
		var sql=`select * from hotel where country='${country}' and state='${state}';`;

		//connection.connect();
		connection.query(sql, function(err,rows,fields){
			var hotels=[];
			for(var i=0;i<rows.length;i++){
				hotels.push(new Hotel(rows[i]));
			}
			callback(hotels);

		});
		//connection.end();

	}

	//callback(hotel)
	static getHotelById(connection,hotelId,callback){
		var sql=`select * from hotel where hotelId=${hotelId};`;

		//connection.connect;
		connection.query(sql, function(err, rows, fields){
			callback(new Hotel(rows[0]));
		});

		//connection.end();
	}

	//callback(arrayofHotels)
	static getHotelsByLocationAndRoomType(connection,country, state, type, callback){

		var sql=`select distinct h.*
				from Hotel h, Has_Room r
				where h.hotelId=r.hotelid
				and h.country='${country}'
				and h.state='${state}'
				and r.type='${type}';`;


		//connection.connect();
		connection.query(sql, function(err, rows, fields){

			if(err){
				throw err;
			}

			var hs=[];

			for(var i=0;i<rows.length;i++){
				hs.push(new Hotel(rows[i]));
			}

			callback(hs);

		});
		//connection.end();
	}
}


module.exports=Hotel;