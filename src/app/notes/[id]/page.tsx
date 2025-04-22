'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react' // Add this import
import { useAuth } from '@/providers/auth-provider'
import { useNotes } from '@/hooks/use-notes'
import NoteEditor from '@/components/notes/note-editor'
import NoteSummary from '@/components/notes/note-summary'

export default function EditNote({ params }: { params: { id: string } }) {
    const resolvedParams = use(params) // Unwrap the params Promise
    const id = resolvedParams.id // Get the id from resolved params
    
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const { data: note, isLoading: noteLoading, error } = useNotes().getNoteById(id)
    
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/signin')
        }
    }, [user, authLoading, router])
    
    if (authLoading || noteLoading || !user) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }
    
    if (error || !note) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-medium">Note not found</h2>
                <p className="mt-2 text-muted-foreground">
                    The note you are looking for doesn't exist or you don't have permission to view it.
                </p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="mt-4 text-primary hover:underline"
                >
                    Go back to dashboard
                </button>
            </div>
        )
    }
    
    const handleSummaryUpdate = (summary: string) => {
        // Update note with new summary
    }
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <NoteEditor noteId={id} />
                </div>
                <div>
                    <NoteSummary
                        content={note.content}
                        summary={note.summary || ''}
                        onSummaryGenerated={handleSummaryUpdate}
                    />
                </div>
            </div>
        </div>
    )
}