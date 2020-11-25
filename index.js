var mongoose=require('./config/mongoose');
var express=require('./config/express');
var cors=require('cors');

var db=mongoose();
var app=express();
app.use(cors());
app.listen(3000);
module.exports=app;

console.log('Server running at http://localhost:3000');
