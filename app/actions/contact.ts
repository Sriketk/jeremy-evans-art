'use server'

import { sendContactEmail } from '../lib/email'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const subject = formData.get('subject')?.toString()
  const message = formData.get('message')?.toString()

  // Validate the data
  if (!name || !email || !subject || !message) {
    return {
      error: 'All fields are required'
    }
  }

  try {
    await sendContactEmail({
      name,
      email,
      subject,
      message
    })

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    }
  } catch (error) {
    console.error('Error in submitContactForm:', error)
    return {
      error: 'Failed to send message. Please try again later.'
    }
  }
} 