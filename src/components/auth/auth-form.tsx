'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AuthFormProps {
    mode: 'signin' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [githubLoading, setGithubLoading] = useState(false)
    const { signIn, signUp, signInWithGoogle, signInWithGitHub } = useAuth()

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
                toast("Account created", {
                    description: "Please check your email to verify your account",
                })
            } else {
                toast("Signed in successfully", {
                    description: "Welcome back!",
                })
            }
        } catch (error: any) {
            toast("Authentication error", {
                description: error?.message || "Failed to authenticate",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true)
        try {
            const { error } = await signInWithGoogle()
            if (error) {
                throw error
            }
            // No need for toast here as redirect will happen
        } catch (error: any) {
            toast("Google authentication error", {
                description: error?.message || "Failed to authenticate with Google",
            })
            setGoogleLoading(false)
        }
    }

    const handleGitHubSignIn = async () => {
        setGithubLoading(true)
        try {
            const { error } = await signInWithGitHub()
            if (error) {
                throw error
            }
            // No need for toast here as redirect will happen
        } catch (error: any) {
            toast("GitHub authentication error", {
                description: error?.message || "Failed to authenticate with GitHub",
            })
            setGithubLoading(false)
        }
    }

    return (
        <div className="flex justify-center px-4 py-8 md:py-12 bg-transparent">
            <motion.div
                className="w-full max-w-md mx-auto space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight dark:text-white">
                        {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground dark:text-gray-400">
                        {mode === 'signin'
                            ? "Enter your credentials to access your notes"
                            : "Sign up to start creating and organizing your notes"}
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Button 
                        variant="outline" 
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-2 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                        type="button"
                    >
                        {googleLoading ? (
                            "Connecting..."
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </Button>

                    <Button 
                        variant="outline" 
                        onClick={handleGitHubSignIn}
                        disabled={githubLoading}
                        className="w-full flex items-center justify-center gap-2 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                        type="button"
                    >
                        {githubLoading ? (
                            "Connecting..."
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" fill="#333" className="dark:fill-white" />
                                </svg>
                                Continue with GitHub
                            </>
                        )}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t dark:border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground dark:bg-black dark:text-gray-500">
                                Or continue with email
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                            >
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
                                className="dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                            >
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
                                className="dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                    >
                        {loading
                            ? mode === 'signin'
                                ? 'Signing in...'
                                : 'Signing up...'
                            : mode === 'signin'
                                ? 'Sign in'
                                : 'Sign up'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                        <Link
                            href={mode === 'signin' ? '/auth/signup' : '/auth/signin'}
                            className="font-medium text-primary hover:underline ml-1 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            {mode === 'signin' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}