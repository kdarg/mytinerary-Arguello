const User = require('../models/modelUsers')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')       
const nodemailer = require('nodemailer') 
const jwt = require('jsonwebtoken')


const sendEmail = async (email, uniqueString) => { // send verification email to user

    const transporter = nodemailer.createTransport({ 
        host: 'smtp.gmail.com',        
        port: 465,
        secure: true,
        auth: {
            user: "***REMOVED***", 
            pass: "***REMOVED***"                          
        }                                              
    })

    // email details
    let sender = "***REMOVED***"  
    let mailOptions = { 
        from: sender,    
        to: email,      
        subject: "Welcome adventurer. Let's verify your email!",
        html: `
        <div >
        <h1 style="color:black">Hey, you're nearly there! Verify your email address to log in and get started: <a style="color:blue font-weight:bold" href=http://localhost:4000/api/verify/${uniqueString}>Verify email</a></h1>
        </div>
        `
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { 
        if (error) { console.log(error) }
        else {
            console.log("Mensaje enviado")

        }
    })
};


///////////////////////////////////////////////// USER CONTROLLER ///////////////////////////////////////////



const usersController = {

    verifyEmail: async (req, res) => {

        const { uniqueString } = req.params; 

        const user = await User.findOne({ uniqueString: uniqueString })
        console.log(user) // search user according to the link
        if (user) {
            user.verifiedEmail = true 
            await user.save()
            res.redirect("http://localhost:3000/signup") 
        }
        else { res.json({ success: false, response: "Unverified email." }) }
    },


//////////////////////////////////////////////////////////////////////////////////////////////////////////

    signUpUsers:async (req,res)=>{

        let {firstname, lastname, email, password, urlimage, country, from } = req.body.userData

        try {
    
            //verifing if the email is already registered

            const existingUser = await User.findOne({ email })
            
            //if the user already exists:

            if (existingUser) {
                console.log(existingUser.from.indexOf(from))

                if (existingUser.from.indexOf(from) === 0) { 

                    res.json({ success: false, from:"signup", message: "User already registered, please log in" })

                } else { 
                    const hashPass = bcryptjs.hashSync(password, 10)

                    existingUser.from.push(from)

                    existingUser.password.push(hashPass) 

                    //  IF HIS SIGN UP IS FROM OUR FORM
                    
                    if(from === "form-Signup"){ 

                        existingUser.uniqueString = crypto.randomBytes(20).toString('hex')

                        await existingUser.save()

                        await sendEmail(email, existingUser.uniqueString)

    
                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Please check your e-mail to continue with your sign up"
                    }) 
                    
                    }else{
                    existingUser.save()
                    
                    res.json({ success: true,
                            from:"signup", 
                            message: "We added " +from+ " to your media to log in" })
                }
            }
            } else {

                //if the user doesnt exist:
            
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
            
            //  IF USER IS SIGNING UP FROM GOOGLE/FACEBOOK DOESNT NEED TO VERIFICATE EMAIL
                if (from !== "form-Signup") { 
                    
                    await setNewUser.save()

                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Yey! account created with" +from
                    }) 
    
                } else { //ELSE: SEND EMAIL TO VERIFICATE

                    await setNewUser.save()
                    await sendEmail(email, setNewUser.uniqueString)
    
                    res.json({
                        success: true, 
                        from:"signup", 
                        firstname,
                        lastname,
                        message: "We sent you an e-mail to validate your registration so you can continue with your sign up."
                    })
                }
            }
        } catch (error) {
            console.log(error)

            res.json({ success: false, message: "Something went wrong, please try again." }) 
        }
    },

/////////////////////////////////////////////////////////////////////////////////////////////////////


    logInUser: async (req, res) => {

        const { email, password, from } = req.body.logedUser
        try {

            //checks if user exists:

            const existingUser = await User.findOne({ email })

            //if the user doesnt exist:

            if (!existingUser) {
                res.json({ success: false, message: "User doesn't exist, try signing up" })

            } else {
                if (from !== "form-Login") { //el registro del user es dif al registro a traves del form log in? bueno, verificamos si su pass coincide
                    
                    let passMatches = existingUser.password.filter(pass =>bcryptjs.compareSync(password, pass))
                    
                    if (passMatches.length > 0) { 

                        const userData = {
                                        id: existingUser._id,
                                        firstname: existingUser.firstname,
                                        lastname: existingUser.lastname,
                                        email: existingUser.email,
                                        from:existingUser.from
                                        }

                        await existingUser.save()

                        const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn:  60* 60*24 })

                        res.json({ success: true, 
                                from:from,
                                response: {token, userData}, 
                                message:"Welcome back "+userData.firstname,
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
                            email: existingUser.email,
                            from: existingUser.from
                            }
                        
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn:  60* 60*24 })


                        res.json({ success: true, 
                            from: from, 
                            response: {token, userData }, 
                            message:"Welcome back "+userData.firstname,
                        })
                        }else{
                            res.json({ success: false, 
                                from: from,  
                                message:"Email or password doesn't match.",
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



/////////////////////////////////////////////////////////////////////////////////////////////////////



    logOutUser: async (req, res) => {
    
        const email = req.body.closeuser
        const user = await User.findOne({ email })
        await user.save()
        res.json(console.log('Closed session ' + email))
    },


}
module.exports = usersController