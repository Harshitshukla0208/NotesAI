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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">All Notes</h1>
            <NoteList />
        </div>
    )
}