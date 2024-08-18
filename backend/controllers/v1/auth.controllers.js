import express from 'express'
import { User } from '../../models/v1/user.model.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken, generateTokenAndSetCookie } from '../../helpers/utils.js'

export const singUp = async (req,res) => {
  const {name, email, password} = req.body
  try {
    if(!email, !name, !password) throw new Error('All fields are required!')
    
    const userAlreadyExists = await User.find({email})
    if(userAlreadyExists.length > 0) throw new Error('User already exists, please login.')
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const [verificationToken, verificationTokenCreatedAt, verificationTokenExpiresAt ] = generateVerificationToken()

    console.log({ verificationToken, verificationTokenCreatedAt, verificationTokenExpiresAt})
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenCreatedAt,
      verificationTokenExpiresAt
    })
    
    generateTokenAndSetCookie(res, newUser._id)

    await newUser.save()

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

export const login = async(req,res) => {
  console.log('i am the v1 auth', req.body)
  res.send('v1 auth login')
}

export const logout = (req,res) => {
  console.log('i am the v1 auth')
  res.send('v1 auth signout')
}
