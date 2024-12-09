import jwt from 'jsonwebtoken'

export const generateVerificationToken = () => {
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
  const verificationTokenCreated = Date.now()
  const verificationTokenExpiresAt = verificationTokenCreated + 24 * 60 * 60 * 1000
  return [
    verificationToken, verificationTokenCreated, verificationTokenExpiresAt
  ]
}

export const generateTokenAndSetCookie = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })

  res.cookie("token", jwtToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })

  return jwtToken
}