/*var mysql=require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class CreditCard{
	constructor(json){
		this.Cnumber=json.Cnumber;
		this.invoiceNumber=json.invoiceNumber;
		this.billingAddr=json.billingAddr;
		this.name=json.name;
		this.secCode=json.secCode;
		this.type=json.type;
		this.expDate=json.expDate;	//has to be yyyy-m-d
	}

	storeToDB(connection){
		var sql=`insert into CreditCard values (${this.Cnumber}, ${this.invoiceNumber},'${this.expDate}','${this.type}','${this.secCode}','${this.name}','${this.billingAddr}');`;
		//connection.connect();
		connection.query(sql,function(err,rows,fields){
			if(err){
				throw err;
			}
		});
		//connection.end();
	}

	//callback(creditCard)
	static getCreditCard(connection,Cnumber,callback){
		var sql=`select * from CreditCard where Cnumber=${Cnumber}`;
		//connection.connect();
		connection.query(sql,function(err, rows, fields){
			if(err){
				throw err;
			}
			var c={};
			c.Cnumber=rows[0].Cnumber;
			c.billingAddr=rows[0].billingAddr;
			c.name=rows[0].name;
			c.secCode=rows[0].secCode;
			c.type=rows[0].type;
			c.expDate=rows[0].expDate;
			//console.log(c);

			callback(new CreditCard(c));


		});
		//connection.end();
	}

}


module.exports=CreditCard;

