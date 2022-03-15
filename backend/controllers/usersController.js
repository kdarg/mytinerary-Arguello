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
                        message: "We sent you an e-mail to validate your registration so you can continue with your sign up"
                    })
                }
            }
        } catch (error) {
            //console.log(error)

            res.json({ success: false, message: "Something went wrong, please try again" }) 
        }
    },

}
module.exports = usersController