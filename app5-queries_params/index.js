var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var data = require('./data.js')

var app = express();

app.use(bodyParser.json());

app.get('/api/data', function (req, res) {
	let winners = data.filter(function (e, i, arr) {
		let q = req.query
		for (let key in q) {
			if(e[key] !== q[key]){
				return false
			}
		}
		return true
	})
	res.status(200).send(winners)
})

app.post('/api/data', function (req, res) {
	data.push(req.body)
	res.status(200).send('ok')
})

app.get('/api/data/:id', function (req, res) {
	res.status(200).send(data[req.params.id])

})

app.listen(port, function () {
	console.log('Listening on port' + port);
})