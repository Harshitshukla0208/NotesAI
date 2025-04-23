// src/components/auth/protected-route.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/signin')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Loading...</h2>
                    <p className="text-muted-foreground mt-2">Please wait while we verify your session.</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null // Will redirect in the useEffect
    }

    return <>{children}</>
}