
class Util{

static storeReserves(connection,hotelId, roomNumber, invoiceNumber){

	var sql=`insert into reserves values ( ${invoiceNumber}, ${hotelId}, ${roomNumber} );`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

	});

}

static storeIncludes(connection, bType, hotelId, invoiceNumber, quantity){

	var sql=`insert into includes values ( '${bType}', ${hotelId}, ${invoiceNumber}, ${quantity} );`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

	});

}


static storeContains(connection, sType, hotelId, invoiceNumber){

	var sql=`insert into contains values ( '${sType}', ${hotelId}, ${invoiceNumber} );`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

	});

}

static computeDate(indate, outdate){
	var start = Date.parse(indate);
  	var end = Date.parse(outdate);
  	var timeDiff = end - start;
  	var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  	return daysDiff;


}


//callback(maxCurrentInvoiceNumber)
static generateInvoiceNumber(connection, callback){

	var sql="select max(invoiceNo) as max from Reservation_Makes;";

	connection.query(sql, function(err, rows, fields){

		//console.log("invioce:");
		//console.log(rows);

		if(rows[0].max==null){
			console.log('in null');
			callback(10000);
			return;
		}
		console.log('not in null');
		callback(rows[0].max);



	});


	
}

//callback(maxCurrentReviewID)
static generateReviewId(connection, callback){

	var sql="select max(reviewId) as max from Review_Writes;";

	connection.query(sql, function(err, rows, fields){

		//console.log("invioce:");
		//console.log(rows);

		if(rows[0].max==null){
			console.log('in null');
			callback(10000);
			return;
		}
		console.log('not in null');
		callback(rows[0].max);



	});


	
}

//callback(array of json{hotelId, type, max})
static getHighRoomType(connection, callback){
	var sql=`select t3.hotelId, t3.type, t3.avgRating as max
from 
(
select t1.hotelId, max(avgRating) as max
from
	(
	select hr.hotelId, hr.type, avg(rw.rating) as avgRating
	from Has_Room hr, Review_Writes rw,  RoomReview_Evaluates rr
	where rr.reviewId=rw.reviewId
	and rr.hotelid=hr.hotelId
	and rr.room_no=hr.room_no
	group by hr.hotelid, hr.room_no
	)t1
group by t1.hotelId
)t2,
(
select hr.hotelId, hr.type, avg(rw.rating) as avgRating
from Has_Room hr, Review_Writes rw,  RoomReview_Evaluates rr
where rr.reviewId=rw.reviewId
and rr.hotelid=hr.hotelId
and rr.room_no=hr.room_no
group by hr.hotelid, hr.room_no
)t3
where t2.hotelId=t3.hotelId
and t3.avgRating=t2.max;`;

	
	connection.query(sql, function(err, rows, fields){
		if(err){
			throw err;
		}

		callback(rows);
	});
}


//callback(array of json{cid, sum})
static getTop5Customer(connection, callback){

	var sql=`select t.cid, t.sum
from
(select r.cid, sum(r.totalAmt) as sum
from Customers c, Reservation_Makes r
where c.cid=r.cid
group by r.cid)t
order by t.sum
desc limit 5;`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

		callback(rows);

	});

}


//callback(array of json {hotelId, bType, max})
static getHighBreakfastType(connection, callback){
	var sql=`select t4.hotelId, t4.bType, t4.rating as max
from
(select t2.hotelId, max(t2.rating) as max
from ( select t1.hotelId, t1.bType, avg(t1.rating) as rating
		   from ( select b.hotelId, b.bType, re.rating
				      from Review_Writes re,
							  BreakfastReview_Assesses b
					  where re.reviewId=b.reviewId ) t1
		   group by t1.hotelId, t1.bType ) t2
group by t2.hotelId ) t3,
( select t1.hotelId, t1.bType, avg(t1.rating) as rating
		   from ( select b.hotelId, b.bType, re.rating
				      from Review_Writes re,
							  BreakfastReview_Assesses b
					  where re.reviewId=b.reviewId ) t1
		   group by t1.hotelId, t1.bType ) t4
where t3.hotelId=t4.hotelId
and t4.rating=t3.max;`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

		callback(rows);

	});


}

//callback(array of json {hotelId, sType, max})
static getHighServiceType(connection, callback){

	var sql=`select t4.hotelId, t4.sType, t4.rating as max
from
( select t2.hotelId, max(t2.rating) as max
  from ( select t1.hotelId, t1.sType, avg(t1.rating) as rating
    from ( select s.hotelId, s.sType, re.rating
      from Review_Writes re,
        ServiceReview_Rates s
      where re.reviewId=s.reviewId ) t1
             group by t1.hotelId, t1.sType ) t2
  group by t2.hotelId ) t3,
( select t1.hotelId, t1.sType, avg(t1.rating) as rating
    from ( select s.hotelId, s.sType, re.rating
      from Review_Writes re,
        ServiceReview_Rates s
      where re.reviewId=s.reviewId ) t1
             group by t1.hotelId, t1.sType) t4
where t3.hotelId=t4.hotelId
and t4.rating=t3.max;`;

	connection.query(sql, function(err, rows, fields){

		if(err){
			throw err;
		}

		callback(rows);

	});
	}



}



module.exports=Util;

