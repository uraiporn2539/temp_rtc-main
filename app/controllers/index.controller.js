const { temp_rtc } = require('../models/temp_rtc.model');

var render=(req,res)=>{
    temp_rtc.find({},(err,data)=>{
	    if(!err)res.render('index',{tempData: data});
    });
}

var addData=(req,res)=>{
    var r=temp_rtc.insertMany(req.body);
    res.json(r)
}

var getData=(req,res)=>{
    temp_rtc.find({},(err,data)=>{
        if(!err){
            let detail=new Array();
            let tmp={};
            data.forEach((item,index)=>{
		        if(!item.temperature||!item.humidity||item.humidity>100)return;
                let dt=new Date(Date.UTC(item.year, (item.month-1), item.day, item.hour, item.minute));
                detail.push({'dateTime':dt, 'temperature':item.temperature, 'humidity':item.humidity});
            });
            detail.sort((a,b)=>{
                return b.dateTime-a.dateTime;
            });
            detail.forEach((item,index)=>{
                if(isNaN(item.dateTime.getUTCDate())||isNaN(item.dateTime.getUTCMonth())||isNaN(item.dateTime.getUTCFullYear())||!item.temperature||!item.humidity||item.humidity>100)return;
		        let obj=tmp[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]=tmp[item.dateTime.getUTCDate()+'/'+(item.dateTime.getUTCMonth()+1)+'/'+item.dateTime.getUTCFullYear()]||{count:0, totalTemperature:0, totalHumidity:0};
		        obj.count++;
		        obj.totalTemperature+=item.temperature;
		        obj.totalHumidity+=(item.humidity/5);
            });
	        let result=Object.entries(tmp).map(function(entry){
		        return {date: entry[0], temperature: entry[1].totalTemperature/entry[1].count, humidity: entry[1].totalHumidity/entry[1].count};
	        });
            res.json({detail:detail, average: result.slice(0,7)});
        }
    })
}

module.exports={
    render,
    addData,
    getData
}


