export async function summarizeContent(text: string): Promise<string> {
    try {
        const apiKey = process.env.GROQ_API_KEY

        if (!apiKey) {
            throw new Error('GROQ_API_KEY is not defined')
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that summarizes text in a concise, informative way, Do not tell us what you are doing just create the summary only.'
                    },
                    {
                        role: 'user',
                        content: `Please summarize the following text in 2-3 sentences, Do not tell us what you are doing just create the summary only:\n\n${text}`
                    }
                ],
                max_tokens: 150
            })
        })

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data.choices[0].message.content.trim()
    } catch (error) {
        console.error('Error summarizing content:', error)
        throw error
    }
}