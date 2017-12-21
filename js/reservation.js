/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Reservation{
	constructor(json){
		this.invoiceNumber=json.invoiceNumber;
		this.resDate=json.resDate;
		this.totalAmount=json.totalAmount;
		this.inDate=json.inDate;
		this.outDate=json.outDate;
		this.username=json.username;
		this.Cnumber=json.Cnumber;
	}

	storeToDB(connection){
		var sql=`insert into Reservation_Makes values (${this.invoiceNumber}, '${this.username}', '${this.Cnumber}', '${this.resDate}', ${this.totalAmount} , '${this.inDate}', '${this.outDate}');`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}
		});
		//connection.end();
	}

	//callback(arrayOfReservations)
	static getReservationsByUsername(connection,username, callback){
		var sql=`select * from Reservation_Makes where cid='${username}';`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			var rs=[];
			for(var i=0;i<rows.length;i++){
				var data={
					invoiceNumber: rows[i].invoiceNo,
					resDate: rows[i].resDate,
					totalAmount: rows[0].totalAmt,
					inDate:rows[0].inDate,
					outDate: rows[0].outDate,
					username: rows[0].cid,
					Cnumber: rows[0].Cnumber
				}
				rs.push(new Reservation(data));
			}
			callback(rs);
		});

		//connection.end();
	}
}



module.exports=Reservation;