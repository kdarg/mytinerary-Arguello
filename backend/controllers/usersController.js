const User = require('../models/modelUsers')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')       
const nodemailer = require('nodemailer') 
const jwt = require('jsonwebtoken')

    //SEND VERIFICATION EMAIL TO USER

const sendEmail = async (email, uniqueString) => { 

    const transporter = nodemailer.createTransport({ 
        host: process.env.EMAIL_SMTP_SERVER,        
        port: Number(process.env.EMAIL_SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_SMTP_USERNAME, 
            pass: process.env.EMAIL_SMTP_PASSWORD                 
        }                                              
    })

    let sender = process.env.EMAIL_SMTP_USERNAME
    let mailOptions = { 
        from: sender,    
        to: email,      
        subject: "Welcome adventurer. Let's verify your email!",
        html: 
        `   
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_2 .v-src-width { width: auto !important; } #u_content_image_2 .v-src-max-width { max-width: 75% !important; } #u_content_heading_3 .v-font-size { font-size: 30px !important; } }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #5cc5d8;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #5cc5d8;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #5cc5d8;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #ffffff">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #fdf2f2;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #fdf2f2;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_image_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="${process.env.FRONTEND_URL}.com/assets/imgs/newlogo.png"  alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 21%;max-width: 121.8px;" width="121.8" class="v-src-width v-src-max-width"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #7c7575; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 24px;">
    <strong>HELLO ADVENTURER!<br /></strong>
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #757272; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 20px;">
    You're nearly there!<br />Verify your email address to log in and get started:
  </h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com/" style="height:39px; v-text-anchor:middle; width:138px;" arcsize="77%" stroke="f" fillcolor="#ff2c7a"><w:anchorlock/><center style="color:#ffffff;font-family:arial,helvetica,sans-serif;"><![endif]-->
    <a href="${process.env.BACKEND_URL}/api/verify/${uniqueString}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #ff2c7a; border-radius: 30px;-webkit-border-radius: 30px; -moz-border-radius: 30px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;"><strong><span style="line-height: 16.8px; font-size: 14px;">VERIFY EMAIL</span></strong></span></span>
    </a>
  <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: #ffffff">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #b3b3b3;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #b3b3b3;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:110px;">
  <!--[if (mso)|(IE)]><table width="110" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:110px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/ImSillyKaru" title="Twitter" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.facebook.com/KarenxArguello/" title="Facebook" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.instagram.com/karuarguello/" title="Instagram" target="_blank">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png"  alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
        
        `
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { 
        if (error) { console.log(error) }
        else {
            console.log("Message sent!")

        }
    })
};


    // USERS CONTROLLER

const usersController = {

    // VERIFY EMAIL

    verifyEmail: async (req, res) => {

        const { uniqueString } = req.params; 

        const user = await User.findOne({ uniqueString: uniqueString })

        if (user) {
            user.verifiedEmail = true 
            await user.save()
            res.redirect(`${process.env.FRONTEND_URL}/login`) 
        }
        else { res.json({ success: false, response: "Unverified email." }) }
    },

    // SIGN UP 

    signUpUsers:async (req,res)=>{

        let {firstname, lastname, email, password, urlimage, country, from } = req.body.userData

        try {
    
            //verifing if the email is already registered

            const existingUser = await User.findOne({ email })
            
            //if the user already exists

            if (existingUser) {

                if (existingUser.from.indexOf(from) === 0) { 

                    res.json({ success: false, from:"signup", message: "User already registered, please log in." })

                } else { 
                    const hashPass = bcryptjs.hashSync(password, 10)

                    existingUser.from.push(from)

                    existingUser.password.push(hashPass) 

                    //  if his/her sign up is from our form 
                    
                    if(from === "form-Signup"){ 

                        existingUser.uniqueString = crypto.randomBytes(20).toString('hex')

                        await existingUser.save()

                        await sendEmail(email, existingUser.uniqueString)

                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Please check your email to continue with your sign up."
                    }) 
                    
                    }else{
                    existingUser.save()
                    
                    res.json({ success: true,
                            from:"signup", 
                            message: "We added " +from+ " to your media to log in." })
                }
            }
            } else {

                //if user doesnt exist
            
                const hashPass = bcryptjs.hashSync(password, 10) 

                const setNewUser = await new User({
                    firstname,
                    lastname,
                    email,
                    password:[hashPass],
                    uniqueString:crypto.randomBytes(20).toString('hex'),
                    verifiedEmail:false,
                    urlimage,
                    country,
                    from:[from],
                })
            
            //  if user is signing up from Google/Facebook, he/she doesnt need to verificate email 

                if (from !== "form-Signup") { 
                    
                    await setNewUser.save()

                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Yeey! account created with" + " " +from
                    }) 
    
                } else { // else: send email to verificate 

                    await setNewUser.save()
                    await sendEmail(email, setNewUser.uniqueString)
    
                    res.json({
                        success: true, 
                        from:"signup", 
                        firstname,
                        lastname,
                        message: "We sent you an email to validate your registration so you can continue with your sign up."
                    })
                }
            }
        } catch (error) {
            console.log(error)

            res.json({ success: false, message: "Something went wrong, please try again." }) 
        }
    },

    // LOG IN 

    logInUser: async (req, res) => {

        const { email, password, from } = req.body.logedUser
        try {

            // checks if user exists:

            const existingUser = await User.findOne({ email })

            // if the user doesnt exist:

            if (!existingUser) {
                res.json({ success: false, message: "User doesn't exist, try signing up." })

            } else {
                if (from !== "form-Login") { // user different from our form log in? okey, we verify if her/his pass matches 
                    
                    let passMatches = existingUser.password.filter(pass =>bcryptjs.compareSync(password, pass))
                    
                    if (passMatches.length > 0) { 

                        const userData = {
                                        id: existingUser._id,
                                        firstname: existingUser.firstname,
                                        lastname: existingUser.lastname,
                                        urlimage:existingUser.urlimage,
                                        email: existingUser.email,
                                        from:existingUser.from
                                        }

                        await existingUser.save()

                        const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn:  60* 60*24 })

                        res.json({ success: true, 
                                from:from,
                                response: {token, userData}, 
                                message:"Hello, "+userData.firstname + " " + userData.lastname + "!",
                                })

                    } else {
                        res.json({ success: false, 
                            from: from, 
                            message:"You haven't register with "+from+". If you want to log in this way, you must sign up with "+from
                        })
                    }
                } else { 

                    if(existingUser.verifiedEmail){
                        let passMatches = existingUser.password.filter(pass =>bcryptjs.compareSync(password, pass))

                        if(passMatches .length >0){

                        const userData = {
                            id: existingUser._id,
                            firstname: existingUser.firstname, 
                            lastname: existingUser.lastname,
                            urlimage: existingUser.urlimage,
                            email: existingUser.email,
                            from: existingUser.from
                            }
                        
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn:  60* 60*24 })

                        res.json({ success: true, 
                            from: from, 
                            response: {token, userData }, 
                            message:"Welcome "+userData.firstname + " " + userData.lastname + "!",
                        })
                        }else{
                            res.json({ success: false, 
                                from: from,  
                                message:"Email and password do not match. Please try again",
                            })
                        }
                    }else{
                        res.json({ success: false, 
                            from: from, 
                            message:"You haven't verified your email, please check your inbox and complete your sign up."
                        }) 
                    }

                } 
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Something went wrong, please try again." })
        }
    },

    // LOG OUT

    logOutUser: async (req, res) => {
    
        const email = req.body.closeuser
        const user = await User.findOne({ email })
        await user.save()
        res.json(console.log('Closed session ' + email))
    },

    // VERIFY TOKEN

    VerifyToken:(req, res) => {

        if(!req.err){
        res.json({success:true,
                response:{id:req.user.id, firstname:req.user.firstname, lastname:req.user.lastname, urlimage: req.user.urlimage, email:req.user.email, from:"token"},
                message:"Welcome "+req.user.firstname}) 
        }else{
            res.json({success:false,
            message:"Please try logging in again."}) 
        }
    }

};

module.exports = usersController