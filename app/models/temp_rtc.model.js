var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tempSensorRTCSchema=new Schema({
    temperature: Number,
    humidity: Number,
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
});

const temp_rtc=mongoose.model('temp_rtc',tempSensorRTCSchema);
module.exports={
    temp_rtc
}
