/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class ServiceReview{
	constructor(json){
		this.reviewId=json.reviewId;
		this.sType=json.sType;
		this.hotelId=json.hotelId;
		this.content=json.content;
		this.rating=json.rating;
		this.username=json.username;

	}

	storeToDB(connection){
		var sqlReviewWrites=`insert into Review_Writes values(${this.reviewId}, ${this.rating}, '${this.content}', '${this.username}');`;
		var sqlBReview=`insert into ServiceReview_Rates values (${this.reviewId}, ${this.hotelId}, '${this.sType}');`;

		//connection.connect();
		connection.query(sqlReviewWrites, function(err, rows, fields){
			if(err){
				throw err;
			}

			connection.query(sqlBReview, function(err, rows, fields){
				if(err){
					throw err;
				}

				//connection.end();
			});
		});
	}

}



module.exports=ServiceReview;