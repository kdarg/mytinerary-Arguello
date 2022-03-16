const User = require('../models/modelUsers')
const bcryptjs = require('bcryptjs')

const usersController = {

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

                    if(from === "form-Signup"){ 

                        await existingUser.save()
    
                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Please check your e-mail to continue with your sign up"
                    }) 
                    
                    }else{
                    existingUser.save()
                    
                    res.json({ success: true,
                            from:"signup", 
                            message: "We added" +from+ "to your media to log in" })
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
                    verifiedEmail:true,
                    urlimage,
                    country,
                    from:[from],
                })
            

                if (from !== "form-Signup") { 
                    
                    await setNewUser.save()

                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Yey! account created with" +from
                    }) 
    
                } else {

                    await setNewUser.save()
    
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
                                        firstname: existingUser.firstname,
                                        email: existingUser.email,
                                        from:existingUser.from
                                        }

                        await existingUser.save()

                        res.json({ success: true, 
                                from:from,
                                response: {userData}, 
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
                            firstname: existingUser.firstname, 
                            email: existingUser.email,
                            from: existingUser.from
                            }
                        
                        res.json({ success: true, 
                            from: from, 
                            response: {userData }, 
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



    LogOutUser: async (req, res) => {
    
        const email = req.body.closeuser
        const user = await User.findOne({ email })
        await user.save()
        res.json(console.log('Closed session ' + email))
    },


}
module.exports = usersController