'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    const router = useRouter()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
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

    const handleCardClick = () => {
        router.push(`/notes/${note.id}`)
    }

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsShareDialogOpen(true)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleteDialogOpen(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
        >
            <Card 
                className="overflow-hidden h-full flex flex-col relative cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={handleCardClick}
            >
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
                        <div className="mt-3 p-3 bg-muted rounded-md text-xs">
                            <p className="font-medium">Summary:</p>
                            <p>{truncateText(note.summary, 100)}</p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between pt-3 pb-3 border-t">
                    <div className="text-xs text-muted-foreground">
                        {formatDate(note.updated_at)}
                    </div>
                    <div className="flex gap-2 z-10" onClick={e => e.stopPropagation()}>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleShareClick}
                            className="hover:bg-muted"
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            asChild
                            className="hover:bg-muted"
                        >
                            <Link href={`/notes/${note.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDeleteClick}
                            className="hover:bg-muted"
                        >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Note</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this note? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
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
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share Note</DialogTitle>
                        <DialogDescription>
                            {note.is_public
                                ? "Anyone with the link can view this note."
                                : "Make this note public to share it."}
                        </DialogDescription>
                    </DialogHeader>

                    {note.is_public && (
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Input
                                readOnly
                                value={generateShareableUrl(note.id)}
                                className="flex-1"
                            />
                            <Button size="sm" className="w-full sm:w-auto" onClick={handleCopyShareLink}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </Button>
                        </div>
                    )}

                    <DialogFooter className="mt-2">
                        {!note.is_public && (
                            <Button onClick={handleMakePublic} className="w-full sm:w-auto">
                                Make Public
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}