'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        email: fd.get('email'),
        message: fd.get('message'),
      }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="bg-white/10 rounded-2xl p-8 text-center">
        <p className="text-3xl mb-3">✓</p>
        <p className="text-white font-bold text-lg mb-1">Message sent!</p>
        <p className="text-mint/80 text-sm">We&apos;ll get back to you as soon as we can.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="text-white/70 text-sm font-medium">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow/60 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="text-white/70 text-sm font-medium">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow/60 transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-white/70 text-sm font-medium">Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="How can we help?"
          className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-yellow/60 transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-orange text-sm">Something went wrong — please try emailing us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-orange text-white font-bold px-8 py-3.5 rounded-full hover:brightness-110 transition-all self-start disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
