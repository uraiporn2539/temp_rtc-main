var mongoose=require('mongoose');

module.exports=()=>{
    mongoose.set('debug',true);
    var db=mongoose.connect('mongodb://localhost/s58030249');
    require('../app/models/temp_rtc.model');
    return db;
}
