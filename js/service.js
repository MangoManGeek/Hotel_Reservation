/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Service{
	constructor(json){
		this.sType=json.sType;
		this.sCost=json.sCost;
		this.hotelId=json.hotelId;

	}

	storeToDB(connection){
		var sql=`insert into Provides_Service values ('${this.sType}', ${this.sCost}, ${this.hotelId});`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}
		});

	//	connection.end();
	}

	//callback(arrayOfServices)
	static getServicesByHotelId(connection,hotelId, callback){
		var sql=`select * from Provides_Service where hotelId=${hotelId};`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}

			var ss=[];
			for(var i=0;i<rows.length;i++){
				ss.push(new Service(rows[i]));
			}

			callback(ss);
		});

		//connection.end();

	}

	//callback(arrayOfServices)
	static getServicesByInvoiceNumber(connection,invoice, callback){
		var sql=`select s.*
				from contains c, Provides_Service s
				where c.invoiceNo=${invoice}
				and c.hotelId=s.hotelId
				and c.sType=s.sType;`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			var ss=[];

			for(var i=0;i<rows.length;i++){
				ss.push(new Service(rows[i]));
			}

			callback(ss);
		});

		//connection.end();
	}
}




module.exports=Service;

