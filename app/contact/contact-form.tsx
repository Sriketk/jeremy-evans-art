'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "../actions/contact"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type FormStatus = {
  type: 'success' | 'error' | null;
  message: string | null;
}

type ContactFormResponse = {
  error?: string;
  success?: boolean;
  message?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({
    type: null,
    message: null
  });

  async function handleSubmit(formData: FormData) {
    try {
      const result = await submitContactForm(formData) as ContactFormResponse;
      
      if (result.error) {
        setStatus({
          type: 'error',
          message: result.error
        });
        return;
      }

      setStatus({
        type: 'success',
        message: result.message || 'Message sent successfully!'
      });

      // Reset the form
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    }
  }

  return (
    <div className="space-y-4">
      {status.type && (
        <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>
            {status.message}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            className="border-gray-300 focus-visible:ring-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="border-gray-300 focus-visible:ring-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-gray-700">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="What is this regarding?"
            className="border-gray-300 focus-visible:ring-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            rows={5}
            className="border-gray-300 focus-visible:ring-gray-400"
            required
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="border-gray-300 hover:bg-gray-50"
        >
          Send Message
        </Button>
      </form>
    </div>
  )
} 