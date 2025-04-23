// src/app/notes/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import NoteList from '@/components/notes/note-list'

export default function Notes() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/signin')
        }
    }, [user, loading, router])

    if (loading || !user) return null

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Notes</h1>
                </div>
                <NoteList />
            </div>
        </div>
    )
}