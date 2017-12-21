/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Room{
	constructor(json){
		this.hotelId=json.hotelId;
		this.roomNumber=json.roomNumber;
		this.price=json.price;
		this.capacity=json.capacity;
		this.floorNumber=json.floorNumber;
		this.description=json.description;
		this.type=json.type;
	}

	storeToDB(connection){
		var sql=`insert into Has_Room value (${this.hotelId}, ${this.roomNumber},${this.price},${this.capacity},${this.floorNumber},'${this.description}','${this.type}');`;
		//connection.connect();
		connection.query(sql, function(err,rows,fields){
			if(err){
				throw err;
			}
		});
		//connection.end();
	}

	//callback(arrayOfHotels)
	static getRoomsByHotelId(connection,hotelId, callback){
		var sql=`select * from Has_Room where hotelId=${hotelId};`;
		
		//connection.connect();
		connection.query(sql, function(err,rows,fields){
			var rooms=[];
			for(var i=0;i<rows.length;i++){
				rooms.push(new Room(rows[i]));
			}
			callback(rooms);
		});

		//connection.end();

	}

	//callback(arrayOfRooms)
	static getRoomsByHotelIdAndType(connection,hotelId, type,address, callback){
		var sql=`select * from Has_Room where hotelId=${hotelId} and type='${type}';`;
		
		//connection.connect();
		//console.log("hotelId:" + hotelId);
		//console.log("type: "+type);
		connection.query(sql, function(err,rows,fields){
			if(err){
				throw err;
			}
			//console.log("rows:"+ rows);
			var rooms=[];
			for(var i=0;i<rows.length;i++){
				var r={
					hotelId: rows[i].hotelId,
					roomNumber: rows[i].room_no,
					price: rows[i].price,
					capacity: rows[i].capacity,
					floorNumber: rows[i].floor_no,
					description: rows[i].description,
					type: rows[i].type

				}
				rooms.push(new Room(r));
			}
			callback(rooms,address);
		});

		//connection.end();

	}

	//callback(room)
	static getRoomByHotelIdAndRoomNumber(connection,hotelId, roomNumber, callback){
		var sql=`select * from Has_Room where hotelId=${hotelId} and room_no='${roomNumber}';`;
		
		//connection.connect();
		connection.query(sql, function(err,rows,fields){
			
			callback(new Room(rows[0]));
		});

		//connection.end();
	}

	//callback(room)
	static getRoomByInvoiceNumber(connection,invoice,callback){
		var sql=`select * from Has_Room 
				 where hotelId=(select hotelId from reserves where invoiceNo=${invoice}) 
				 and room_no=(select room_no from reserves where invoiceNo=${invoice});`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}

			callback(new Room(rows[0]));
		});

		//connection.end();

	}


	//callback(isFree) boolean value
	static isFree(connection,hotelId, roomNumber, inDate, outDate, callback){
		var sql=`select r.room_no
				from reserves r, Reservation_Makes m
				where r.hotelId=${hotelId}
				and r.room_no=${roomNumber}
				and r.invoiceNo=m.invoiceNo
				and (('${inDate}'>=m.inDate and '${inDate}'<=m.outDate) or ('outDate'>=m.inDate and 'outDate'<=m.outDate));`;

		//connection.connect();

		console.log("in: "+ inDate);
		console.log("out: "+ outDate);
		console.log("id:"+hotelId);
		console.log("roomNumber:" + roomNumber);
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}
			var isfree=false;
			if(rows.length>0){
				isfree=true;
			}

			callback(isfree);
		});
	}


}



module.exports=Room;
