module.exports=(app)=>{
    var index=require('../controllers/index.controller');
    app.get('/',index.render).post('/addData',index.addData).get('/data',index.getData);
}
