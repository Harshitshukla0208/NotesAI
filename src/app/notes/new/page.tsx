'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import NoteEditor from '@/components/notes/note-editor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NewNote() {
    const { user, loading } = useAuth()
    const router = useRouter()
    
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/signin')
        }
    }, [user, loading, router])
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-center">
                    <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-3 text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }
    
    if (!user) return null
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8"
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
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Create a New Note</h1>
                    </div>
                </div>
                
                <div className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
                    <NoteEditor />
                </div>
            </div>
        </motion.div>
    )
}