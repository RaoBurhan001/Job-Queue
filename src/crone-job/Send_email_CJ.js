const cron = require("cron");

const { emailQueue }= require("../queues/email-queue");
const emailProcesses = require("../processes/consumer");

const scheduleJob = new cron.CronJob("5 * * * * *", async  () => {

    const queueCount = emailQueue.getJobCounts();
    if(queueCount.waiting ===0)
    {
        scheduleJob.stop();
    }
    else{
      
    
        emailQueue.process(emailProcesses);
    }
});



module.exports = scheduleJob;

