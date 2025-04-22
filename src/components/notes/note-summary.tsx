'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2 } from 'lucide-react'
import { useSummarize } from '@/hooks/use-summarize'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface NoteSummaryProps {
    content: string
    summary: string
    onSummaryGenerated: (summary: string) => void
}

export default function NoteSummary({
    content,
    summary,
    onSummaryGenerated
}: NoteSummaryProps) {
    const { summarizeText, loading } = useSummarize()
    const [localSummary, setLocalSummary] = useState(summary)

    useEffect(() => {
        setLocalSummary(summary)
    }, [summary])

    const handleGenerateSummary = async () => {
        if (!content.trim()) {
            toast("Cannot summarize", {
                description: "Note content is empty",
            })
            return
        }

        try {
            const generated = await summarizeText(content)
            setLocalSummary(generated)
            onSummaryGenerated(generated)

            toast("Summary generated", {
                description: "AI has created a summary of your note"
            })
        } catch {
            toast("Failed to generate summary", {
                description: "Please try again later",
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Summary</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateSummary}
                            disabled={loading || !content.trim()}
                            className="gap-1"
                        >
                            <Wand2 className="h-4 w-4" />
                            {loading ? 'Generating...' : 'Regenerate'}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {localSummary ? (
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{localSummary}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">
                            No summary available. Generate one using AI.
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
