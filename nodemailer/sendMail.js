const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')

const sendMail=(emailid)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'kd.ecerasystem@gmail.com',
            pass:'******'  // your mail password   process.env.Password
        }
    })
    const mailOption={
        from:'kd.ecerasystem@gmail.com',
        to:emailid,
        subject:'Verify your gmail',
        // text:'verify your gmail'
        html:`<p>click to verify your email</p>`
    }

    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log('Mail not Sent')
        }else{
            console.log('Mail sent!')
        }
    })
}




module.exports= sendMail