var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));



app.get('/:name', function(req, res){
    fs.readFile('./data/countries.json', 'utf-8', function(err, data){
		if(err)throw err;
		var country = req.params.name.toUpperCase();
		var countries = JSON.parse(data);
		if(countries[country] === undefined){
			res.status(404).send('404: Country not found, please provide a valid country');
		}else{

			res.render('index', {country: countries[country]});
			
		}
            
    })
    
});


app.listen(8080,function(){
    console.log('listening at port 8080');
});