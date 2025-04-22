// src/app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Welcome to <span className="text-primary">NotesAI</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        The smart note-taking app with AI-powered summarization.
        Organize your thoughts, store code snippets, and find what you need instantly.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <Link href="/auth/signup">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}