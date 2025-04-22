// src/app/settings/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'

export default function Settings() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
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
        toast({
            title: "Not implemented",
            description: "This feature is not yet available",
        })
    }

    const handleDeleteAccount = () => {
        toast({
            title: "Not implemented",
            description: "This feature is not yet available",
        })
    }

    if (loading || !user) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Manage your profile information
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleUpdateProfile}>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled>
                                Save Changes
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Manage your account preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Button variant="outline" onClick={() => signOut()}>
                                Sign Out
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                disabled
                            >
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}