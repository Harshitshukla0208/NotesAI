'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2 } from 'lucide-react'
import { useSummarize } from '@/hooks/use-summarize'
import { toast } from "sonner"
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
    // const { toast } = useToast()

    const handleGenerateSummary = async () => {
        if (!content.trim()) {
            toast({
                title: "Cannot summarize",
                description: "Note content is empty",
                variant: "destructive"
            })
            return
        }

        try {
            const generatedSummary = await summarizeText(content)
            onSummaryGenerated(generatedSummary)
            toast({
                title: "Summary generated",
                description: "AI has created a summary of your note"
            })
        } catch (error) {
            toast({
                title: "Failed to generate summary",
                description: "Please try again later",
                variant: "destructive"
            })
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Summary</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateSummary}
                            disabled={loading}
                            className="gap-1"
                        >
                            <Wand2 className="h-4 w-4" />
                            {loading ? "Generating..." : "Regenerate"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {summary ? (
                        <p className="text-sm">{summary}</p>
                    ) : (
                        <div className="text-sm text-muted-foreground italic">
                            No summary available. Generate one using AI.
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}