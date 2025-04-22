'use client'
import { useRef, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'
import { useTheme } from '@/providers/theme-provider'
import { Textarea } from '@/components/ui/textarea'

interface CodeEditorProps {
    value: string
    onChange?: (value: string) => void
    language: string
    className?: string
    readOnly?: boolean
}

export default function CodeEditor({
    value,
    onChange,
    language,
    className,
    readOnly = false
}: CodeEditorProps) {
    const { theme } = useTheme()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Handle tab key in the editor
    useEffect(() => {
        if (readOnly || !textareaRef.current) return

        const textarea = textareaRef.current

        const handleTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && document.activeElement === textarea) {
                e.preventDefault()
                const start = textarea.selectionStart
                const end = textarea.selectionEnd

                // Insert tab at cursor position
                const newValue =
                    value.substring(0, start) + '  ' + value.substring(end)
                if (onChange) {
                    onChange(newValue)
                }

                // Move cursor after tab
                setTimeout(() => {
                    if (textarea) {
                        textarea.selectionStart = start + 2
                        textarea.selectionEnd = start + 2
                    }
                }, 0)
            }
        }

        textarea.addEventListener('keydown', handleTab)

        return () => {
            textarea?.removeEventListener('keydown', handleTab)
        }
    }, [value, onChange, readOnly])

    if (readOnly) {
        return (
            <div className={cn('relative rounded-md overflow-hidden', className)}>
                <SyntaxHighlighter
                    language={language}
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        minHeight: '400px',
                    }}
                >
                    {value || ' '}
                </SyntaxHighlighter>
            </div>
        )
    }

    return (
        <div className="relative">
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={cn(
                    'font-mono text-sm p-4 resize-none',
                    className
                )}
                spellCheck={false}
                style={{ fontFamily: 'monospace' }}
            />
        </div>
    )
}