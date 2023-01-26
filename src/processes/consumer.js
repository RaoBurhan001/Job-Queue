const { Job } = require ("Bull");

const nodemailer = require("nodemailer");

const emailProcesses = async( Job )=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "example@gmail.com",
            pass: "<your password>"
        },
        tls: {
            rejectUnauthorized: false
        }
        
    });


    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
           
        } else {
            console.log("Server is ready to take our messages");
          
        }
    });

    const email = {
        from: "example@gmail.com",
        to: "toyour@gmail.com",
        subject: "Sending A Simple Email using Node.js",
        text: "Now is the time for all good men to send Email via Node.js!"
    };


    
    const info =transporter.sendMail(email, function(err, success){
        if (err) {
            console.log(err);
        } else {
            console.log("Nodemailer Email sent: " + success.response);
        }
    });
    return  nodemailer.getTestMessageUrl(info);
    
};

module.exports=emailProcesses;