'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useNotes } from '@/hooks/use-notes'
import { useSummarize } from '@/hooks/use-summarize'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wand2, Save, ArrowLeft, Code, FileText, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Note } from '@/lib/supabase/client'
import { Toggle } from '@/components/ui/toggle'
import { Label } from '@/components/ui/label'
import { codeLanguageOptions } from '@/lib/utils'
import CodeEditor from './code-editor'

interface NoteEditorProps {
    noteId?: string
}

export default function NoteEditor({ noteId }: NoteEditorProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { createNote, updateNote } = useNotes()
    const { summarizeText, loading: summarizeLoading } = useSummarize()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isCode, setIsCode] = useState(false)
    const [language, setLanguage] = useState('javascript')
    const [isPublic, setIsPublic] = useState(false)
    const [summary, setSummary] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [editorTab, setEditorTab] = useState('edit')

    const isEditMode = !!noteId

    // If in edit mode, fetch the note data
    const { data: existingNote, isLoading } = useNotes().getNoteById(noteId || '')

    useEffect(() => {
        if (isEditMode && existingNote) {
            setTitle(existingNote.title || '')
            setContent(existingNote.content || '')
            setIsCode(existingNote.is_code || false)
            setLanguage(existingNote.language || 'javascript')
            setIsPublic(existingNote.is_public || false)
            setSummary(existingNote.summary || '')
        }
    }, [existingNote, isEditMode])

    const handleSave = async () => {
        if (!title.trim()) {
            toast({
                title: "Title required",
                description: "Please add a title for your note",
                variant: "destructive"
            })
            return
        }

        setIsSaving(true)

        try {
            const noteData: Partial<Note> = {
                title,
                content,
                is_code: isCode,
                language: isCode ? language : undefined,
                is_public: isPublic,
                summary
            }

            if (isEditMode && noteId) {
                await updateNote({ id: noteId, ...noteData })
                toast({
                    title: "Note updated",
                    description: "Your changes have been saved"
                })
            } else {
                await createNote(noteData)
                toast({
                    title: "Note created",
                    description: "Your new note has been saved"
                })
                router.push('/dashboard')
            }
        } catch (error) {
            toast({
                title: "Error saving note",
                description: "There was a problem saving your note",
                variant: "destructive"
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleGenerateSummary = async () => {
        if (!content.trim()) {
            toast({
                title: "Empty content",
                description: "Add some content before generating a summary",
                variant: "destructive"
            })
            return
        }

        try {
            const generatedSummary = await summarizeText(content)
            setSummary(generatedSummary)
            toast({
                title: "Summary generated",
                description: "AI summary has been created"
            })
        } catch (error) {
            toast({
                title: "Summary failed",
                description: "Unable to generate summary at this time",
                variant: "destructive"
            })
        }
    }

    if (isLoading && isEditMode) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading note...</p>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <div className="flex items-center gap-2">
                    <Toggle
                        pressed={isPublic}
                        onPressedChange={setIsPublic}
                        aria-label="Toggle public sharing"
                        className="gap-1"
                    >
                        <Share2 className="h-4 w-4" />
                        {isPublic ? "Public" : "Private"}
                    </Toggle>

                    <Toggle
                        pressed={isCode}
                        onPressedChange={setIsCode}
                        aria-label="Toggle code snippet"
                        className="gap-1"
                    >
                        {isCode ? (
                            <>
                                <Code className="h-4 w-4" />
                                <span>Code</span>
                            </>
                        ) : (
                            <>
                                <FileText className="h-4 w-4" />
                                <span>Text</span>
                            </>
                        )}
                    </Toggle>

                    <Button onClick={handleSave} disabled={isSaving} className="gap-1">
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <Input
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium"
                />

                {isCode && (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            {codeLanguageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <Tabs value={editorTab} onValueChange={setEditorTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="edit" className="mt-4">
                        {isCode ? (
                            <CodeEditor
                                value={content}
                                onChange={setContent}
                                language={language}
                                className="min-h-[400px] font-mono text-sm"
                            />
                        ) : (
                            <Textarea
                                placeholder="Write your note content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[400px]"
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="preview" className="mt-4">
                        {isCode ? (
                            <CodeEditor
                                value={content}
                                language={language}
                                readOnly
                                className="min-h-[400px]"
                            />
                        ) : (
                            <div className="border rounded-md p-4 min-h-[400px] prose dark:prose-invert max-w-none">
                                {content || <span className="text-muted-foreground">No content to preview</span>}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="summary">Summary</Label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateSummary}
                            disabled={summarizeLoading || !content.trim()}
                            className="gap-1"
                        >
                            <Wand2 className="h-4 w-4" />
                            {summarizeLoading ? "Generating..." : "Generate Summary"}
                        </Button>
                    </div>
                    <Textarea
                        id="summary"
                        placeholder="Note summary will appear here..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="h-24"
                    />
                </div>
            </div>
        </motion.div>
    )
}