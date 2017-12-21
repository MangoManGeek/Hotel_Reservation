/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class RoomReview{
	constructor(json){
		this.reviewId=json.reviewId;
		this.roomNumber=json.roomNumber;
		this.hotelId=json.hotelId;
		this.content=json.content;
		this.rating=json.rating;
		this.username=json.username;

	}

	storeToDB(connection){
		var sqlReviewWrites=`insert into Review_Writes values(${this.reviewId}, ${this.rating}, '${this.content}', '${this.username}');`;
		var sqlRoomReview=`insert into RoomReview_Evaluates values (${this.reviewId}, ${this.roomNumber}, ${this.hotelId});`;

		//connection.connect();
		connection.query(sqlReviewWrites, function(err, rows, fields){
			if(err){
				throw err;
			}

			connection.query(sqlRoomReview, function(err, rows, fields){
				if(err){
					throw err;
				}

				//connection.end();
			});
		});
	}



}



module.exports=RoomReview;
