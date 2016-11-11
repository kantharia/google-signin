var express = require('express');
var app = express();
var port = process.env.PORT || 3030;
var bodyParser = require("body-parser");
var mongoose   = require('mongoose');
var Users = require('./data_models/users');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/webchat');

app.use(express.static('./public'));
app.use(bodyParser.json())

//Add User
app.post('/users', function(req, res, next){
	console.log('Got Response : ', req.body );

	Users.findOne({email:req.body.email}, function(err, data) {
		if(err){
			res.json(err)
		}
		else if(data){
			console.log('USER ALREADY AVAILABLE')
			res.json({"status":"user already available"});
		}
		else{
			var newUser = req.body;
			var user = new Users(newUser);

			user.save( function (err,data) {
				if(err)
					res.json(err);
				else
					console.log('data', data);
					res.json({"status":"new user added"});
			})
		}
	})


})

// Fetch Users List
app.get('/users', function(req, res) {
	res.send({"server":"active"})
});

app.listen(port, function(){
	console.log('Server Listening to port no ' + port);
})