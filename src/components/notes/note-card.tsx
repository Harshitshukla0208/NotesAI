'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { Note } from '@/lib/supabase/client'
import { useNotes } from '@/hooks/use-notes'
import { formatDate, truncateText, generateShareableUrl } from '@/lib/utils'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'

import { Edit, Trash, Code, Share2, FileText, Copy } from 'lucide-react'

interface NoteCardProps {
    note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
    const { deleteNote, updateNote } = useNotes()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

    const handleDelete = () => {
        deleteNote(note.id)
        setIsDeleteDialogOpen(false)
        toast("Note deleted", {
            description: "Your note has been permanently removed"
        })
    }

    const handleCopyShareLink = () => {
        const shareUrl = generateShareableUrl(note.id)
        navigator.clipboard.writeText(shareUrl)
        toast("Link copied", {
            description: "Share link has been copied to clipboard"
        })
        setIsShareDialogOpen(false)
    }

    const handleMakePublic = () => {
        updateNote({ id: note.id, is_public: true })
        toast("Note is now public", {
            description: "Anyone with the link can now view this note"
        })
        setIsShareDialogOpen(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="overflow-hidden h-full flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg truncate">
                            {note.title || "Untitled Note"}
                        </CardTitle>
                        <div className="flex-shrink-0">
                            {note.is_code ? (
                                <Code className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                        {truncateText(note.content, 150)}
                    </p>
                    {note.summary && (
                        <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                            <p className="font-medium">Summary:</p>
                            <p>{truncateText(note.summary, 100)}</p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                        {formatDate(note.updated_at)}
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsShareDialogOpen(true)}>
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/notes/${note.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Note</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this note? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Share Dialog */}
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share Note</DialogTitle>
                        <DialogDescription>
                            {note.is_public
                                ? "Anyone with the link can view this note."
                                : "Make this note public to share it."}
                        </DialogDescription>
                    </DialogHeader>

                    {note.is_public && (
                        <div className="flex items-center gap-2">
                            <Input
                                readOnly
                                value={generateShareableUrl(note.id)}
                                className="flex-1"
                            />
                            <Button size="sm" onClick={handleCopyShareLink}>
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                            </Button>
                        </div>
                    )}

                    <DialogFooter>
                        {!note.is_public && (
                            <Button onClick={handleMakePublic}>
                                Make Public
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}
