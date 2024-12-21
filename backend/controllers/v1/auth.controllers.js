import { User } from '../../models/v1/user.model.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken, generateTokenAndSetCookie } from '../../helpers/utils.js'
import { sendVerificationEmail, sendWelcomeEmail } from '../../mailtrap/emails.js'

export const singUp = async (req,res) => {
  const {name, email, password} = req.body
  try {
    if(!email, !name, !password) throw new Error('All fields are required!')
    
    const userAlreadyExists = await User.find({email})
    if(userAlreadyExists.length > 0) throw new Error('User already exists, please login.')
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const [verificationToken, verificationTokenCreatedAt, verificationTokenExpiresAt ] = generateVerificationToken()
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenCreatedAt,
      verificationTokenExpiresAt
    })
    
    await newUser.save()

    generateTokenAndSetCookie(res, newUser._id)

    await sendVerificationEmail(newUser, verificationToken)

    res.status(201).json({
      message: 'User created successfully',
      user: {
        ...newUser._doc,
        password: undefined
      }
    })

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    })
    
    if(!user) res.status(400).json({ success: "failure", message: 'Invalid or token expired'})

    // const newUser = new User({
    //   ...user,
    //   verificationToken: undefined,
    //   verificationTokenCreatedAt: undefined,
    //   verificationTokenExpiresAt: undefined
    // })
    user.verificationToken = undefined
    user.verificationTokenCreatedAt = undefined
    user.verificationTokenExpiresAt = undefined

    await user.save()

    await sendWelcomeEmail(user.email, user.name)
    console.log({ user, code })

    res.status(200).json({ success: "success", message: "Welcome email send successfully"})
    
    
  } catch (error) {
    res.status(400).json({message: error.message})
    
  }
}

export const login = async(req,res) => {
  
  console.log('i am the v1 auth', req.body)
  res.send('v1 auth login')
}

export const logout = (req,res) => {
  console.log('i am the v1 auth')
  res.send('v1 auth signout')
}
