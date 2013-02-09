/*
 * GET bencana listing.
 */

var databaseUrl = "localhost/datakorban";
var collections = ["korban"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.list = function(req, res){

	db.datakorban.find(function(err, datakorban) {
  	res.render('datakorban', {listOfEmployee: datakorban, title: 'Daftar Korban Bencana'});
	});

};
