'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { error } = await supabase.auth.getSession()

            // Regardless of error, redirect to dashboard
            // If there was an error, user will just need to sign in again
            console.log("error in auth/callback/page.tsx", error)
            router.push('/dashboard')
        }

        handleAuthCallback()
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Finalizing authentication...</h2>
                <p className="text-muted-foreground mt-2">You'll be redirected shortly.</p>
            </div>
        </div>
    )
}