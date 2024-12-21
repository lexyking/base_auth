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
    throw new Error(`Failed to send verification email: ${ error }`)
  }
}

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "7363fc1b-e654-4c6d-bb20-86195ef7785e",
      template_variables: {
        "company_info_name": "44labs.io",
        "name": username,
        "company_info_address": "Test_Company_info_address",
        "company_info_city": "Test_Company_info_city",
        "company_info_zip_code": "Test_Company_info_zip_code",
        "company_info_country": "Test_Company_info_country"
      }
    })

    console.log("Welcome Email send successfully", response)
    
  } catch (error) {
    console.log(`Error sending welcome email`, error)
    throw new Error(`Failed to send welcome email: ${ error }`)
  }
} 