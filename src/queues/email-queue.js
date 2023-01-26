const Bull = require("Bull");
const emailProcesses = require("../processes/consumer");

const emailQueue = new Bull("email",{
    redis : 6379
});



//emailQueue.process(emailProcesses);

//Producer ( publishing data inside a queue)
const sendEmail = ( data )=>{
    emailQueue.add(data,{
        attemps: 3
    });
   

};

module.exports=  { emailQueue, sendEmail};