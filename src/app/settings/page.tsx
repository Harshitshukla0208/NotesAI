// src/app/settings/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function Settings() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/signin')
        } else if (user) {
            setEmail(user.email || '')
        }
    }, [user, loading, router])

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault()
        toast("Not implemented", {
            description: "This feature is not yet available",
        })
    }

    const handleDeleteAccount = () => {
        toast("Not implemented", {
            description: "This feature is not yet available",
        })
    }

    const handleSignOut = async () => {
        try {
            await signOut()
            toast("Signed out successfully", {
                description: "You have been signed out of your account",
            })
        } catch (error: any) {
            toast("Authentication error", {
                description: error?.message || "Failed to sign out",
            })
        }
    }

    if (loading || !user) return null

    return (
        <div className="flex justify-center w-full px-4 py-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-3xl space-y-8"
            >
                <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">Settings</h1>
                <div className="grid gap-8">
                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Manage your profile information
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleUpdateProfile}>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                            className="bg-slate-50"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-6">
                                <Button type="submit" disabled className="w-full sm:w-auto">
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Manage your account preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    variant="outline" 
                                    onClick={handleSignOut}
                                    className="w-full sm:w-auto"
                                >
                                    Sign Out
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                    disabled
                                    className="w-full sm:w-auto"
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}