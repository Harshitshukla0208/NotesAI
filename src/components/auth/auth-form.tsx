'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AuthFormProps {
    mode: 'signin' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn, signUp } = useAuth()
    // const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } =
                mode === 'signin'
                    ? await signIn(email, password)
                    : await signUp(email, password)

            if (error) {
                throw error
            }

            if (mode === 'signup') {
                toast({
                    title: "Account created",
                    description: "Please check your email to verify your account"
                })
            }
        } catch (error: any) {
            toast({
                title: "Authentication error",
                description: error?.message || "Failed to authenticate",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            className="w-full max-w-md mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    {mode === 'signin'
                        ? "Enter your credentials to access your notes"
                        : "Sign up to start creating and organizing your notes"
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

          // src/components/auth/auth-form.tsx (completion)
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ?
                        (mode === 'signin' ? 'Signing in...' : 'Signing up...') :
                        (mode === 'signin' ? 'Sign in' : 'Sign up')
                    }
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                    <Link
                        href={mode === 'signin' ? '/auth/signup' : '/auth/signin'}
                        className="font-medium text-primary hover:underline ml-1"
                    >
                        {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}