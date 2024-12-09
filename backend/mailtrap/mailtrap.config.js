import { MailtrapClient } from "mailtrap"
import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_MAILER_EMAIL_HOST : endpoint,
  NODE_MAILER_API_TOKEN : token,
} = process.env

export const mailtrapClient = new MailtrapClient({ endpoint, token });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test"
};
