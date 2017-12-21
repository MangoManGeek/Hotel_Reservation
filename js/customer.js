
/*var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1331',
  database : 'hotel'
});*/

class Customer{
	//use userName as cid
	constructor(json){
		this.userName=json.userName; 		//varchar -->use as cid
		this.password=json.password;		//varchar 
		this.name=json.name;				//varchar
		this.phone=json.phone; 				//int
		this.address=json.address; 			//varchar
		this.email=json.email;				//varchar

	}

	storeToDB(connection){
		var sql="insert into customers values ("+ "'"+this.userName+"'"+"," +"'"+this.password+"'"+","+"'"+this.name+"'"+","+this.phone+","+"'"+this.address+"'"+","+"'"+this.email+"'"+");";
		//connection.connect();
		connection.query(sql, function (err, rows, fields) {
  		if (err) throw err

		});

		//connection.end();

	}

	//return null if not found
	//callback is callback function that will perform response  callback(Customer)
	static getCustomer(connection,userName,callback){
		var sql=`select * from customers where cid='${userName}'`;
		
		//connection.connect();
		connection.query(sql, function (err, rows, fields) {
  		if (err){

  		  throw err
  		}

  		if(rows.length==0){
  			callback(null);
  			return;
  		}
  		
  		var c={};
  		c.userName=rows[0].cid; 		//varchar
		c.password=rows[0].password;		//varchar 
		c.name=rows[0].name;				//varchar
		c.phone=rows[0].phone; 				//int
		c.address=rows[0].address; 			//varchar
		c.email=rows[0].email;
		
		callback(new Customer(c));

		//a=new Customer(c);
		
		//console.log(c);

		});

		//connection.end();
		//console.log(person);
		//var a=new Customer(c);
		//console.log(c);
		

		//return person;
	}


}


module.exports=Customer;