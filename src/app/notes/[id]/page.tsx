'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { useNotes } from '@/hooks/use-notes'
import NoteEditor from '@/components/notes/note-editor'
import NoteSummary from '@/components/notes/note-summary'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Define proper types for the async params
type PageParams = {
    params: Promise<{
        id: string
    }>
}

export default function EditNote({ params }: PageParams) {
    // Unwrap the params using React.use()
    const { id } = use(params)
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const { getNoteById, updateNote } = useNotes()
    const { data: note, isLoading: noteLoading, error } = getNoteById(id)
    const [currentContent, setCurrentContent] = useState('')
    const [currentSummary, setCurrentSummary] = useState('')
    
    useEffect(() => {
        if (note) {
            setCurrentContent(note.content || '')
            setCurrentSummary(note.summary || '')
        }
    }, [note])
    
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/signin')
        }
    }, [user, authLoading, router])
    
    const handleSummaryGenerated = (summary: string) => {
        setCurrentSummary(summary)
        if (note?.id) {
            updateNote({ id: note.id, summary })
        }
    }
    
    if (authLoading || noteLoading || !user) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-center">
                    <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-3 text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }
    
    if (error || !note) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto text-center py-12 px-4"
            >
                <div className="bg-card rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium">Note not found</h2>
                    <p className="mt-2 text-muted-foreground">
                        The note you are looking for doesn't exist or you don't have permission to view it.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Go back to dashboard
                    </button>
                </div>
            </motion.div>
        )
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6"
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                    <div>
                        <Link 
                            href="/dashboard" 
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                        >
                            <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">
                            {note.title || 'Untitled Note'}
                        </h1>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
                            <NoteEditor
                                noteId={id}
                                onContentChange={setCurrentContent}
                                onSummaryChange={setCurrentSummary}
                                externalSummary={currentSummary}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6 sticky top-20">
                            <h2 className="text-lg font-medium mb-3 border-b pb-2">Note Summary</h2>
                            <NoteSummary
                                content={currentContent}
                                summary={currentSummary}
                                onSummaryGenerated={handleSummaryGenerated}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}