import { NextResponse } from 'next/server'
import { summarizeContent } from '@/lib/groq/client'

export async function POST(request: Request) {
    try {
        const { text } = await request.json()

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required and must be a string' },
                { status: 400 }
            )
        }

        const summary = await summarizeContent(text)

        return NextResponse.json({ summary })
    } catch (error) {
        console.error('Error in summarize route:', error)
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        )
    }
}