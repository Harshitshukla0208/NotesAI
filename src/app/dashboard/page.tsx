'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import NoteList from '@/components/notes/note-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Dashboard() {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-1 space-y-4 sm:space-y-5"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 border-b pb-3 sm:pb-4">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>
                <Button size="sm" className="w-full sm:w-auto" asChild>
                    <Link href="/notes/new" className="flex items-center justify-center gap-1">
                        <Plus className="h-3.5 w-3.5" />
                        New Note
                    </Link>
                </Button>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-3 sm:p-4 dark:bg-black">
                <NoteList />
            </div>
        </motion.div>
    )
}