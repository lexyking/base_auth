import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js'
import { mailtrapClient, sender } from './mailtrap.config.js'

export const sendVerificationEmail = async (user, verificationToken) => {

  const getHtml = () => VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken).replace("{username}", user.name)

  const recipient = [{ email: user.email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email address',
      html: getHtml(),
      category: "Email Verification"
      })

    console.log("Email send successfully", response)
    
  } catch (error) {
    console.log(`Error sending verification email`, error)
    throw new Error(`Failed to sendind verification email: ${ error }`)
  }
}