var express = require('express');
var app = express();
var port = process.env.PORT || 3030;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Users = require('./data_models/users');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/webchat');

app.use(express.static('./public'));
app.use(bodyParser.json())

//Add User
app.post('/users', function(req, res, next) {
    Users.findOne({ id: req.body.id }, function(err, data) {
        if (err) {
            res.json(err)
        } else if (data) {

        	 Users.findOneAndUpdate({
			    		id: data.id
			    	}, {
			    		online: true
			    	}, {
			    		upsert: false
			    	}, function(err, data){
			    		console.log('Data', data);
			    	})

            console.log('USER ALREADY AVAILABLE')
            res.json({ "status": "user already available" });
        } else {
            var newUser = req.body;
            var user = new Users(newUser);

            user.save(function(err, data) {
                if (err)
                    res.json(err);
                else
                    console.log('data', data);
                res.json({ "status": "new user added" });
            })
        }
    })
})

// Fetch Users List
app.get('/users', function(req, res) {
    Users.find(function(err, data) {
        if (err) {
            res.json({ "error": err });
        }

        res.send({ "users": data })
    })
});

app.post('/logout', function(req, res) {
    console.log('Req', req.headers.uid);

    Users.findOneAndUpdate({
    		id: req.headers.uid
    	}, {
    		online: false
    	}, {
    		upsert: false
    	}, function(err, data){
    		console.log('Data', data);
    	})
    res.json({ "logout": "successfully" })
})

app.listen(port, function() {
    console.log('Server Listening to port no ' + port);
})
