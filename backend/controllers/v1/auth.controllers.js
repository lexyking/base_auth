import express from 'express'

export const singUpController = (req,res) => {
  console.log('i am the v1 auth')
  res.send('v1 auth signup')
}

export const loginController = (req,res) => {
  console.log('i am the v1 auth')
  res.send('v1 auth login')
}

export const logoutController = (req,res) => {
  console.log('i am the v1 auth')
  res.send('v1 auth signout')
}
