import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json() as {
    name?: string
    email?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    // Graceful degradation — form works, email not sent
    console.warn('RESEND_API_KEY not set — contact form submission dropped', { name, email })
    return NextResponse.json({ success: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_EMAIL ?? email  // fallback: reply to sender
  const from = process.env.EMAIL_FROM ?? 'noreply@briswesttoylibrary.org.au'

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  })

  if (error) {
    console.error('Resend error', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
