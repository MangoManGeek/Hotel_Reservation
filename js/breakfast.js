/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Breakfast{
	constructor(json){
		this.hotelId=json.hotelId;
		this.bType=json.bType;
		this.description=json.description;
		this.bPrice=json.bPrice;
	}

	storeToDB(connection){
		var sql=`insert into Offer_Breakfast values(${this.hotelId},'${this.bType}','${this.description}',${this.bPrice});`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			if(err){
				throw err;
			}
		});
		//connection.end();
	}

	//callback(array of breakfasts)
	static getBreakfastsByHotelId(connection,hotelId, callback){
		var sql=`select * from Offer_Breakfast where hotelId=${hotelId};`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){

			if(err){
				throw err;
			}

			var bs=[];

			for(var i=0;i<rows.length;i++){
				var data={
					hotelId: rows[i].hotelId,
					bType: rows[0].bType,
					description: rows[0].description,
					bPrice: rows[0].bPrice
				}
				bs.push(new Breakfast(data));
			}
			callback(bs);

		});

		//connection.end();
		
	}


	//callback(arrayOfBreakfasts, arrayOfQuantityOfCorrespondingBreakfast)
	static getBreakfastsByInvoiceNumber(connection,invoice, callback){
		var sql=`select i.quantity, b.*
				 from includes i, Offer_Breakfast b
				 where i.invoiceNo=${invoice}
				 and i.bType=b.bType
				 and i.hotelId=b.hotelId;`;

		//connection.connect();
		connection.query(sql, function(err, rows, fields){
			var quantities=[];
			var breakfasts=[];

			for(var i=0;i<rows.length;i++){
				quantities.push(rows[i].quantity);
				delete rows[i].quantity;
				breakfasts.push(new Breakfast(rows[i]));
			}

			callback(breakfasts, quantities);
		});

		//connection.end();


	}
}




module.exports=Breakfast;