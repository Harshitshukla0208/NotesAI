'use client'

import { useState } from 'react'
import { useNotes } from '@/hooks/use-notes'
import NoteCard from './note-card'
import { Input } from '@/components/ui/input'
import { Search, FileText, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NoteList() {
    const { notes, isLoading } = useNotes()
    const [searchTerm, setSearchTerm] = useState('')
    const [showTextNotes, setShowTextNotes] = useState(true)
    const [showCodeNotes, setShowCodeNotes] = useState(true)

    const filteredNotes = notes.filter(note => {
        // Filter by search term
        const matchesSearch =
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())

        // Filter by note type
        const matchesType =
            (note.is_code && showCodeNotes) || (!note.is_code && showTextNotes)

        return matchesSearch && matchesType
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading notes...</p>
                </div>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">No notes yet</h3>
                <p className="text-muted-foreground mt-1">
                    Create your first note to get started
                </p>
                <Button className="mt-4" asChild>
                    <Button className="mt-4" asChild>
                        <Link href="/notes/new">Create a note</Link>
                    </Button>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex gap-2">
                    <Toggle
                        pressed={showTextNotes}
                        onPressedChange={setShowTextNotes}
                        aria-label="Show text notes"
                        className="gap-1"
                    >
                        <FileText className="h-4 w-4" />
                        Text
                    </Toggle>
                    <Toggle
                        pressed={showCodeNotes}
                        onPressedChange={setShowCodeNotes}
                        aria-label="Show code notes"
                        className="gap-1"
                    >
                        <Code className="h-4 w-4" />
                        Code
                    </Toggle>
                </div>
            </div>

            {filteredNotes.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No matching notes found</p>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {filteredNotes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </motion.div>
            )}
        </div>
    )
}