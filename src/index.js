const  express = require("express");
const  bodyParser = require ( "body-parser");
//const redisClient = require("./config/redis-config");
const { sendEmail } = require("./queues/email-queue");
const scheduleJob = require("./crone-job/Send_email_CJ");


const app = express();

app.use(bodyParser.json());

app.get("/", (req, res)=> {
    return res.status(200).json("Hello World");
});


app.post("/send-email", async (req, res)=> {

    const { ...restBody} = req.body;

    const message = "hello there ";

    const emailresp = await sendEmail({
        ...restBody,
        html: `<p>  ${message}</p>`
    });
    scheduleJob.start();
    res.send({status:"ok"});
});





app.listen(5000, () => console.log("App running on port 5000"));