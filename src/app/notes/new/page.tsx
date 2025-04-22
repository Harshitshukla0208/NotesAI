// src/app/notes/new/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import NoteEditor from '@/components/notes/note-editor'

export default function NewNote() {
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
            <h1 className="text-3xl font-bold tracking-tight">Create a New Note</h1>
            <NoteEditor />
        </div>
    )
}