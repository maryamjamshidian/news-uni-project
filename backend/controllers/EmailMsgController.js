import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
     service: "gmail",
     auth:{
        user: "marryam.jam78@gmail.com",
        pass: "loeu zalb rfai saqm  "  
     }
})
// kpnw vxxu oglg ecfm
// olaf rugs tvdg eomc 
// mhcl cghh hzbe aawr

export const sendEmailMsg = async(req,res)=>{
     const {subject, message, email} = req.body;
     const user = `شما پیامی از طرف ${email} - موضوع پیام ${subject}`
     try {
          let details = {
               from: email,
               to: "maryam.jam7731@gmail.com",
               subject: user,
               text: message,
          }

          await transporter.sendMail(details)

          res.json("ایمیل شما ارسال شد")
          
     } catch (error) {
          res.json(error)
     }
}