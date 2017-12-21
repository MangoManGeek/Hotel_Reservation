
create database hotel;

use  hotel;

create table Customers(
cid varchar(50) primary key,
password varchar(50),
name varchar(50),
phone varchar(20),
address varchar(100),
email varchar(50));

#select * from customers;







create table Hotel(
	hotelId int primary key,
	phone int,
	street varchar(20),
	city varchar(10),
	state varchar(10),
	country varchar(20),
	zip varchar(20)
);

create table Has_Room(
hotelId int,
room_no int,
price float,
capacity int,
floor_no int,
description varchar(100),
type varchar(10),

primary key(hotelId, room_no),
foreign key(hotelId) references Hotel(hotelId)
);


create table Offer_Breakfast(
	hotelId int,
	bType varchar(30),
	Description varchar(100),
	bPrice float,
	Primary key(hotelId, bType),
	Foreign key(hotelId) references Hotel(hotelId)
);

create table Provides_Service(
sType varchar(30),
sCost float,
hotelId int, 
primary key(sType, hotelId), 
foreign key(hotelId) references Hotel(hotelId)
);

create table Review_Writes(
reviewId int, 
rating int, 
textComment varchar(100), 
cid varchar(50),
primary key(reviewId),
foreign key (cid) references Customers(cid)
);

create table RoomReview_Evaluates(
reviewId int, 
room_no int, 
hotelId int, 
primary key(reviewId),
foreign key(hotelId, room_no) references Has_Room(hotelId, room_no),
foreign key(reviewId) references Review_Writes(reviewId)
);

create table BreakfastReview_Assesses(
reviewId int,
bType varchar(30), 
hotelId int, 
primary key(reviewId), 
foreign key(hotelId,bType) references Offer_Breakfast( hotelId,bType),
foreign key(reviewId) references Review_Writes(reviewId)
);

create table ServiceReview_Rates(
reviewId int, 
hotelId int,
sType varchar(30),
primary key(reviewId),
foreign key(sType, hotelId) references Provides_Service(sType, hotelId),
foreign key(reviewId) references Review_Writes(reviewId)
);

create table CreditCard(
	Cnumber varchar(20),
    invoiceNo int,
	expDate date,
	type varchar(10),
	secCode varchar(20),
	name varchar(20),
	billingAddr varchar(30),
    primary key(Cnumber, invoiceNo)
);


create table Reservation_Makes(
	invoiceNo int, 
	cid varchar(50), 
	Cnumber varchar(20),
	resDate date, 
	totalAmt float, 
    inDate date,
    outDate date,
	primary key(invoiceNo),
	foreign key( Cnumber,invoiceNo) references CreditCard( Cnumber, invoiceNo), 
	foreign key(cid) references Customers(cid)
);

create table includes(
bType varchar(30), 
hotelId int, 
invoiceNo int, 
quantity int,
primary key(bType, hotelId, invoiceNo),
foreign key(hotelId,bType) references Offer_Breakfast(hotelId,bType), 
foreign key(invoiceNo) references Reservation_Makes(invoiceNo)
);

create table contains(
sType  varchar(30),
hotelId  int, 
invoiceNo  int,
primary key(sType, hotelId, invoiceNo),
foreign key(sType, hotelId) references Provides_Service(sType, hotelId), 
foreign key(invoiceNo) references Reservation_Makes(invoiceNo) 
);

create table reserves(
	invoiceNo int,
	#cid varchar(50), 
	hotelId int,
	room_no int,
	primary key(invoiceNo, hotelId, room_no),
	foreign key(invoiceNo) references Reservation_Makes(invoiceNo),
	foreign key(hotelId, room_no) references Has_Room(hotelId, room_no)
);





#insert data to hotel here:

insert into Hotel values
(1001, 1357812301, '5th Ave', 'New York', 'New York', 'United States', 10011),
(1002, 1357812302, '7th Ave', 'New York', 'New York', 'United States', 10019),
(1003, 1357812303, '2nd Street', 'Edison', 'New Jersey', 'United States', 08854),
(1004, 1357812304, '11 Court', 'Edison', 'New Jersey', 'United States', 08854),
(1005, 1357812305, '1th Ave', 'Dallas', 'Texas', 'United States', 75043),
(1006, 1357812306, '55th Street', 'Dallas', 'Texas', 'United States', 75080),
(1007, 1008823823, 'Changan Street', 'Beijing', 'Beijing', 'China', 100036),
(1008, 1008123123, 'Fuxing Ave', 'Beijing', 'Beijing', 'China', 100036),
(1009, 1008888888, 'Yijia Street', 'Ningbo', 'Zhejiang', 'China', 315000),
(1010, 1008888777, 'Chen Ave', 'Ningbo', 'Zhejiang', 'China', 315000),
(1011, 1008000001, 'Yingze Ave', 'Taiyuan', 'Shanxi', 'China', 030006),
(1012, 1008000002, 'Wucheng Street', 'Taiyuan', 'Shanxi', 'China', 030002);



insert into Has_Room values
(1001,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1001,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1001,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1002,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1002,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1002,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1003,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1003,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1003,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1004,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1004,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1004,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1005,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1005,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1005,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1006,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1006,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1006,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1007,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1007,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1007,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1008,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1008,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1008,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1009,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1009,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1009,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1010,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1010,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1010,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1011,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1011,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1011,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite'),
(1012,101,100,2, 1 , '1 King size bed, 2 people max' , 'Standard'),
(1012,102,200,4, 1 , '2 Queen size beds, 4 people max' , 'Double'),
(1012,103,300,6, 1 , '2 rooms with 3 Queen size beds, 6 people max, very good room!' , 'Suite');






insert into Provides_Service values
( 'Airport Pickup' , 20,1001),
( 'Airport Dropoff' , 20,1001),
( 'Parking' , 20,1001),
( 'Laundry' , 20,1001),
( 'Airport Pickup' , 20,1002),
( 'Airport Dropoff' , 20,1002),
( 'Parking' , 20,1002),
( 'Laundry' , 20,1002),
( 'Airport Pickup' , 20,1003),
( 'Airport Dropoff' , 20,1003),
( 'Parking' , 20,1003),
( 'Laundry' , 20,1003),
( 'Airport Pickup' , 20,1004),
( 'Airport Dropoff' , 20,1004),
( 'Parking' , 20,1004),
( 'Laundry' , 20,1004),
( 'Airport Pickup' , 20,1005),
( 'Airport Dropoff' , 20,1005),
( 'Parking' , 20,1005),
( 'Laundry' , 20,1005),
( 'Airport Pickup' , 20,1006),
( 'Airport Dropoff' , 20,1006),
( 'Parking' , 20,1006),
( 'Laundry' , 20,1006),
( 'Airport Pickup' , 20,1007),
( 'Airport Dropoff' , 20,1007),
( 'Parking' , 20,1007),
( 'Laundry' , 20,1007),
( 'Airport Pickup' , 20,1008),
( 'Airport Dropoff' , 20,1008),
( 'Parking' , 20,1008),
( 'Laundry' , 20,1008),
( 'Airport Pickup' , 20,1009),
( 'Airport Dropoff' , 20,1009),
( 'Parking' , 20,1009),
( 'Laundry' , 20,1009),
( 'Airport Pickup' , 20,1010),
( 'Airport Dropoff' , 20,1010),
( 'Parking' , 20,1010),
( 'Laundry' , 20,1010),
( 'Airport Pickup' , 20,1011),
( 'Airport Dropoff' , 20,1011),
( 'Parking' , 20,1011),
( 'Laundry' , 20,1011),
( 'Airport Pickup' , 20,1012),
( 'Airport Dropoff' , 20,1012),
( 'Parking' , 20,1012),
( 'Laundry' , 20,1012);





insert into Offer_Breakfast values
( 1001, 'French' , 'banana crepe', 20),
( 1001, 'Chinese' , 'dim sum', 20),
( 1001, 'American' , 'sausage biscuit', 20),
( 1001, 'Japanese' , 'sushi', 20),
( 1002, 'French' , 'banana crepe', 20),
( 1002, 'Chinese' , 'dim sum', 20),
( 1002, 'American' , 'sausage biscuit', 20),
( 1002, 'Japanese' , 'sushi', 20),
( 1003, 'French' , 'banana crepe', 20),
( 1003, 'Chinese' , 'dim sum', 20),
( 1003, 'American' , 'sausage biscuit', 20),
( 1003, 'Japanese' , 'sushi', 20),
( 1004, 'French' , 'banana crepe', 20),
( 1004, 'Chinese' , 'dim sum', 20),
( 1004, 'American' , 'sausage biscuit', 20),
( 1004, 'Japanese' , 'sushi', 20),
( 1005, 'French' , 'banana crepe', 20),
( 1005, 'Chinese' , 'dim sum', 20),
( 1005, 'American' , 'sausage biscuit', 20),
( 1005, 'Japanese' , 'sushi', 20),
( 1006, 'French' , 'banana crepe', 20),
( 1006, 'Chinese' , 'dim sum', 20),
( 1006, 'American' , 'sausage biscuit', 20),
( 1006, 'Japanese' , 'sushi', 20),
( 1007, 'French' , 'banana crepe', 20),
( 1007, 'Chinese' , 'dim sum', 20),
( 1007, 'American' , 'sausage biscuit', 20),
( 1007, 'Japanese' , 'sushi', 20),
( 1008, 'French' , 'banana crepe', 20),
( 1008, 'Chinese' , 'dim sum', 20),
( 1008, 'American' , 'sausage biscuit', 20),
( 1008, 'Japanese' , 'sushi', 20),
( 1009, 'French' , 'banana crepe', 20),
( 1009, 'Chinese' , 'dim sum', 20),
( 1009, 'American' , 'sausage biscuit', 20),
( 1009, 'Japanese' , 'sushi', 20),
( 1010, 'French' , 'banana crepe', 20),
( 1010, 'Chinese' , 'dim sum', 20),
( 1010, 'American' , 'sausage biscuit', 20),
( 1010, 'Japanese' , 'sushi', 20),
( 1011, 'French' , 'banana crepe', 20),
( 1011, 'Chinese' , 'dim sum', 20),
( 1011, 'American' , 'sausage biscuit', 20),
( 1011, 'Japanese' , 'sushi', 20),
( 1012, 'French' , 'banana crepe', 20),
( 1012, 'Chinese' , 'dim sum', 20),
( 1012, 'American' , 'sausage biscuit', 20),
( 1012, 'Japanese' , 'sushi', 20);



#insert admin customer
insert into Customers values ('admin', 'admin', 'admin', '7328888888','Hulton Ave, New York, New York, 00001', 'admin@hulton.com');



#insert initial Room Reviews here to show stats:
insert into Review_Writes values
(10001,6, 'Good Room', 'admin'),
(10002,9, 'Good Room', 'admin'),
(10003,8, 'Good Room', 'admin'),
(10004,8, 'Good Room', 'admin'),
(10005,8, 'Good Room', 'admin'),
(10006,6, 'Good Room', 'admin'),
(10007,8, 'Good Room', 'admin'),
(10008,3, 'Good Room', 'admin'),
(10009,3, 'Good Room', 'admin'),
(10010,7, 'Good Room', 'admin'),
(10011,10, 'Good Room', 'admin'),
(10012,4, 'Good Room', 'admin'),
(10013,6, 'Good Room', 'admin'),
(10014,8, 'Good Room', 'admin'),
(10015,3, 'Good Room', 'admin'),
(10016,10, 'Good Room', 'admin'),
(10017,6, 'Good Room', 'admin'),
(10018,8, 'Good Room', 'admin'),
(10019,6, 'Good Room', 'admin'),
(10020,7, 'Good Room', 'admin'),
(10021,2, 'Good Room', 'admin'),
(10022,8, 'Good Room', 'admin'),
(10023,6, 'Good Room', 'admin'),
(10024,3, 'Good Room', 'admin'),
(10025,3, 'Good Room', 'admin'),
(10026,3, 'Good Room', 'admin'),
(10027,10, 'Good Room', 'admin'),
(10028,4, 'Good Room', 'admin'),
(10029,10, 'Good Room', 'admin'),
(10030,9, 'Good Room', 'admin'),
(10031,2, 'Good Room', 'admin'),
(10032,10, 'Good Room', 'admin'),
(10033,6, 'Good Room', 'admin'),
(10034,9, 'Good Room', 'admin'),
(10035,6, 'Good Room', 'admin'),
(10036,7, 'Good Room', 'admin');

insert into RoomReview_Evaluates values
(10001,101,1001),
(10002,102,1001),
(10003,103,1001),
(10004,101,1002),
(10005,102,1002),
(10006,103,1002),
(10007,101,1003),
(10008,102,1003),
(10009,103,1003),
(10010,101,1004),
(10011,102,1004),
(10012,103,1004),
(10013,101,1005),
(10014,102,1005),
(10015,103,1005),
(10016,101,1006),
(10017,102,1006),
(10018,103,1006),
(10019,101,1007),
(10020,102,1007),
(10021,103,1007),
(10022,101,1008),
(10023,102,1008),
(10024,103,1008),
(10025,101,1009),
(10026,102,1009),
(10027,103,1009),
(10028,101,1010),
(10029,102,1010),
(10030,103,1010),
(10031,101,1011),
(10032,102,1011),
(10033,103,1011),
(10034,101,1012),
(10035,102,1012),
(10036,103,1012);



#initialize breakfast review
insert into Review_Writes values
(10037,3,'Good Breakfast', 'admin'),
(10038,2,'Good Breakfast', 'admin'),
(10039,7,'Good Breakfast', 'admin'),
(10040,6,'Good Breakfast', 'admin'),
(10041,7,'Good Breakfast', 'admin'),
(10042,6,'Good Breakfast', 'admin'),
(10043,4,'Good Breakfast', 'admin'),
(10044,9,'Good Breakfast', 'admin'),
(10045,4,'Good Breakfast', 'admin'),
(10046,8,'Good Breakfast', 'admin'),
(10047,4,'Good Breakfast', 'admin'),
(10048,1,'Good Breakfast', 'admin'),
(10049,6,'Good Breakfast', 'admin'),
(10050,10,'Good Breakfast', 'admin'),
(10051,8,'Good Breakfast', 'admin'),
(10052,6,'Good Breakfast', 'admin'),
(10053,5,'Good Breakfast', 'admin'),
(10054,3,'Good Breakfast', 'admin'),
(10055,2,'Good Breakfast', 'admin'),
(10056,4,'Good Breakfast', 'admin'),
(10057,7,'Good Breakfast', 'admin'),
(10058,7,'Good Breakfast', 'admin'),
(10059,10,'Good Breakfast', 'admin'),
(10060,3,'Good Breakfast', 'admin'),
(10061,1,'Good Breakfast', 'admin'),
(10062,5,'Good Breakfast', 'admin'),
(10063,4,'Good Breakfast', 'admin'),
(10064,3,'Good Breakfast', 'admin'),
(10065,6,'Good Breakfast', 'admin'),
(10066,1,'Good Breakfast', 'admin'),
(10067,1,'Good Breakfast', 'admin'),
(10068,1,'Good Breakfast', 'admin'),
(10069,7,'Good Breakfast', 'admin'),
(10070,6,'Good Breakfast', 'admin'),
(10071,10,'Good Breakfast', 'admin'),
(10072,9,'Good Breakfast', 'admin'),
(10073,6,'Good Breakfast', 'admin'),
(10074,4,'Good Breakfast', 'admin'),
(10075,6,'Good Breakfast', 'admin'),
(10076,3,'Good Breakfast', 'admin'),
(10077,8,'Good Breakfast', 'admin'),
(10078,2,'Good Breakfast', 'admin'),
(10079,10,'Good Breakfast', 'admin'),
(10080,10,'Good Breakfast', 'admin'),
(10081,2,'Good Breakfast', 'admin'),
(10082,9,'Good Breakfast', 'admin'),
(10083,3,'Good Breakfast', 'admin'),
(10084,10,'Good Breakfast', 'admin');


insert into BreakfastReview_Assesses values
(10037,'French',1001),
(10038,'Chinese',1001),
(10039,'American',1001),
(10040,'Japanese',1001),
(10041,'French',1002),
(10042,'Chinese',1002),
(10043,'American',1002),
(10044,'Japanese',1002),
(10045,'French',1003),
(10046,'Chinese',1003),
(10047,'American',1003),
(10048,'Japanese',1003),
(10049,'French',1004),
(10050,'Chinese',1004),
(10051,'American',1004),
(10052,'Japanese',1004),
(10053,'French',1005),
(10054,'Chinese',1005),
(10055,'American',1005),
(10056,'Japanese',1005),
(10057,'French',1006),
(10058,'Chinese',1006),
(10059,'American',1006),
(10060,'Japanese',1006),
(10061,'French',1007),
(10062,'Chinese',1007),
(10063,'American',1007),
(10064,'Japanese',1007),
(10065,'French',1008),
(10066,'Chinese',1008),
(10067,'American',1008),
(10068,'Japanese',1008),
(10069,'French',1009),
(10070,'Chinese',1009),
(10071,'American',1009),
(10072,'Japanese',1009),
(10073,'French',1010),
(10074,'Chinese',1010),
(10075,'American',1010),
(10076,'Japanese',1010),
(10077,'French',1011),
(10078,'Chinese',1011),
(10079,'American',1011),
(10080,'Japanese',1011),
(10081,'French',1012),
(10082,'Chinese',1012),
(10083,'American',1012),
(10084,'Japanese',1012);







insert into Review_Writes values
(10085,4, 'Good Service','admin'),
(10086,1, 'Good Service','admin'),
(10087,6, 'Good Service','admin'),
(10088,10, 'Good Service','admin'),
(10089,9, 'Good Service','admin'),
(10090,7, 'Good Service','admin'),
(10091,8, 'Good Service','admin'),
(10092,6, 'Good Service','admin'),
(10093,3, 'Good Service','admin'),
(10094,9, 'Good Service','admin'),
(10095,6, 'Good Service','admin'),
(10096,7, 'Good Service','admin'),
(10097,10, 'Good Service','admin'),
(10098,2, 'Good Service','admin'),
(10099,2, 'Good Service','admin'),
(10100,10, 'Good Service','admin'),
(10101,5, 'Good Service','admin'),
(10102,4, 'Good Service','admin'),
(10103,4, 'Good Service','admin'),
(10104,2, 'Good Service','admin'),
(10105,10, 'Good Service','admin'),
(10106,5, 'Good Service','admin'),
(10107,9, 'Good Service','admin'),
(10108,4, 'Good Service','admin'),
(10109,7, 'Good Service','admin'),
(10110,6, 'Good Service','admin'),
(10111,10, 'Good Service','admin'),
(10112,10, 'Good Service','admin'),
(10113,2, 'Good Service','admin'),
(10114,10, 'Good Service','admin'),
(10115,1, 'Good Service','admin'),
(10116,3, 'Good Service','admin'),
(10117,5, 'Good Service','admin'),
(10118,3, 'Good Service','admin'),
(10119,7, 'Good Service','admin'),
(10120,7, 'Good Service','admin'),
(10121,10, 'Good Service','admin'),
(10122,2, 'Good Service','admin'),
(10123,2, 'Good Service','admin'),
(10124,9, 'Good Service','admin'),
(10125,4, 'Good Service','admin'),
(10126,10, 'Good Service','admin'),
(10127,6, 'Good Service','admin'),
(10128,9, 'Good Service','admin'),
(10129,1, 'Good Service','admin'),
(10130,8, 'Good Service','admin'),
(10131,8, 'Good Service','admin'),
(10132,5, 'Good Service','admin');


select * from Provides_Service;
insert into ServiceReview_Rates values
(10085,1001, 'Airport Pickup'),
(10086,1001, 'Airport Dropoff'),
(10087,1001, 'Parking'),
(10088,1001, 'Laundry'),
(10089,1002, 'Airport Pickup'),
(10090,1002, 'Airport Dropoff'),
(10091,1002, 'Parking'),
(10092,1002, 'Laundry'),
(10093,1003, 'Airport Pickup'),
(10094,1003, 'Airport Dropoff'),
(10095,1003, 'Parking'),
(10096,1003, 'Laundry'),
(10097,1004, 'Airport Pickup'),
(10098,1004, 'Airport Dropoff'),
(10099,1004, 'Parking'),
(10100,1004, 'Laundry'),
(10101,1005, 'Airport Pickup'),
(10102,1005, 'Airport Dropoff'),
(10103,1005, 'Parking'),
(10104,1005, 'Laundry'),
(10105,1006, 'Airport Pickup'),
(10106,1006, 'Airport Dropoff'),
(10107,1006, 'Parking'),
(10108,1006, 'Laundry'),
(10109,1007, 'Airport Pickup'),
(10110,1007, 'Airport Dropoff'),
(10111,1007, 'Parking'),
(10112,1007, 'Laundry'),
(10113,1008, 'Airport Pickup'),
(10114,1008, 'Airport Dropoff'),
(10115,1008, 'Parking'),
(10116,1008, 'Laundry'),
(10117,1009, 'Airport Pickup'),
(10118,1009, 'Airport Dropoff'),
(10119,1009, 'Parking'),
(10120,1009, 'Laundry'),
(10121,1010, 'Airport Pickup'),
(10122,1010, 'Airport Dropoff'),
(10123,1010, 'Parking'),
(10124,1010, 'Laundry'),
(10125,1011, 'Airport Pickup'),
(10126,1011, 'Airport Dropoff'),
(10127,1011, 'Parking'),
(10128,1011, 'Laundry'),
(10129,1012, 'Airport Pickup'),
(10130,1012, 'Airport Dropoff'),
(10131,1012, 'Parking'),
(10132,1012, 'Laundry');






#make initial reservation data here

insert into CreditCard values
('12345',10001, '2017-1-1', 'Visa', '111', 'user1', 'Hulton Ave'),
('12345',10002, '2017-1-1', 'Visa', '111', 'user2', 'Hulton Ave'),
('12345',10003, '2017-1-1', 'Visa', '111', 'user3', 'Hulton Ave'),
('12345',10004, '2017-1-1', 'Visa', '111', 'user4', 'Hulton Ave'),
('12345',10005, '2017-1-1', 'Visa', '111', 'user5', 'Hulton Ave'),
('12345',10006, '2017-1-1', 'Visa', '111', 'user6', 'Hulton Ave'),
('12345',10007, '2017-1-1', 'Visa', '111', 'user7', 'Hulton Ave'),
('12345',10008, '2017-1-1', 'Visa', '111', 'user8', 'Hulton Ave'),
('12345',10009, '2017-1-1', 'Visa', '111', 'user9', 'Hulton Ave'),
('12345',10010, '2017-1-1', 'Visa', '111', 'user10', 'Hulton Ave');

insert into Customers values
('user1','pw','user1','1','1','1'),
('user2','pw','user2','1','1','1'),
('user3','pw','user3','1','1','1'),
('user4','pw','user4','1','1','1'),
('user5','pw','user5','1','1','1'),
('user6','pw','user6','1','1','1'),
('user7','pw','user7','1','1','1'),
('user8','pw','user8','1','1','1'),
('user9','pw','user9','1','1','1'),
('user10','pw','user10','1','1','1');



insert into Reservation_Makes values
(10001, 'user1' , '12345','2017-1-1',640, '2017-1-1' , '2017-1-1'),
(10002, 'user2' , '12345','2017-1-1',420, '2017-1-1' , '2017-1-1'),
(10003, 'user3' , '12345','2017-1-1',750, '2017-1-1' , '2017-1-1'),
(10004, 'user4' , '12345','2017-1-1',950, '2017-1-1' , '2017-1-1'),
(10005, 'user5' , '12345','2017-1-1',750, '2017-1-1' , '2017-1-1'),
(10006, 'user6' , '12345','2017-1-1',820, '2017-1-1' , '2017-1-1'),
(10007, 'user7' , '12345','2017-1-1',980, '2017-1-1' , '2017-1-1'),
(10008, 'user8' , '12345','2017-1-1',770, '2017-1-1' , '2017-1-1'),
(10009, 'user9' , '12345','2017-1-1',410, '2017-1-1' , '2017-1-1'),
(10010, 'user10' , '12345','2017-1-1',280, '2017-1-1' , '2017-1-1');





/*
select * from Customers;
select* from Reservation_Makes;
select * from contains;
select * from includes;
select * from reserves;





describe Reservation_Makes;



 
select max(invoiceNo) as max
from Reservation_Makes;


insert into Reservation_Makes values (${this.invoiceNumber}, '${this.username}', '${this.Cnumber}', '${this.resDate}', ${this.totalAmount} , '${this.inDate}', '${this.outDate}';
       
          */

select t3.hotelId, t3.type, t3.avgRating as max
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
and t3.avgRating=t2.max;

/* Rank Breakfast*/
select t4.hotelId, t4.bType, t4.rating as max
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
and t4.rating=t3.max;




/* top customer*/
select t.cid, t.sum
from
(select r.cid, sum(r.totalAmt) as sum
from Customers c, Reservation_Makes r
where c.cid=r.cid
group by r.cid)t
order by t.sum
desc limit 5;





/* Rank Services */
select t4.hotelId, t4.sType, t4.rating as max
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
and t4.rating=t3.max;









