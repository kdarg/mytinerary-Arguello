const User = require('../models/modelUsers')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')       
const nodemailer = require('nodemailer') 
const jwt = require('jsonwebtoken')

    //SEND VERIFICATION EMAIL TO USER

const sendEmail = async (email, uniqueString) => { 

    const transporter = nodemailer.createTransport({ 
        host: 'smtp.gmail.com',        
        port: 465,
        secure: true,
        auth: {
            user: "***REMOVED***", 
            pass: "***REMOVED***"                          
        }                                              
    })

    let sender = "***REMOVED***"  
    let mailOptions = { 
        from: sender,    
        to: email,      
        subject: "Welcome adventurer. Let's verify your email!",
        html: 
        `        <div >
        <h1 style="color:black">Hey, you're nearly there! Verify your email address to log in and get started: <a style="color:blue font-weight:bold" href=http://localhost:4000/api/verify/${uniqueString}>Verify email</a></h1>
        </div>`
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { 
        if (error) { console.log(error) }
        else {
            console.log("Mensaje enviado")

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
            res.redirect("http://localhost:3000/signup") 
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
                console.log(existingUser.from.indexOf(from))

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
                        message: "Yey! account created with" + " " +from
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
        console.log(req.user)
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