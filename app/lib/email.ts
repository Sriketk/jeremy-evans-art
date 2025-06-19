import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function createEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: 600;
            color: #666;
            display: block;
            margin-bottom: 5px;
          }
          .value {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
          }
          .message {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="field">
          <span class="label">Name</span>
          <div class="value">${name}</div>
        </div>
        
        <div class="field">
          <span class="label">Email</span>
          <div class="value">
            <a href="mailto:${email}">${email}</a>
          </div>
        </div>
        
        <div class="field">
          <span class="label">Subject</span>
          <div class="value">${subject}</div>
        </div>
        
        <div class="field">
          <span class="label">Message</span>
          <div class="value message">${message.replace(/\n/g, '<br/>')}</div>
        </div>
      </body>
    </html>
  `;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Jeremy Evans Art <onboarding@resend.dev>",
      to: "jeremyevansart@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: createEmailHtml({ name, email, subject, message }),
      // Include a text version for email clients that don't support HTML
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
