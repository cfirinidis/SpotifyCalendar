var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'users',

});
	
router.post('/', function(req, res, next) {
	var myEvent = req.body.myEvent;
	var begin = req.body.begin;
	var end	=	req.body.end;
	var date = req.body.date;

	connection.query(
		"INSERT INTO events(date, event, start, end) VALUES ( ?,?,?,? )",
		[date, myEvent, begin, end], function(err,row,field){
			if(err){
				console.log(err);
				res.send({'success': false, 'message': 'Could not connect to DB' })
			}
			else{
				res.send({'success': true, 'message': 'Added to DB' });
			}
		});
});

router.get('/', function(req, res, next) {

	var date = req.query.date;
	connection.query(

	"SELECT * from events WHERE date=?",
	[date], function(err, result) {
		if(err){
				console.log(err);
				res.send({'success': false, 'message': 'Could not connect to DB' })
			}
			else{
				res.send(result);
			}
	});
});

module.exports = router;