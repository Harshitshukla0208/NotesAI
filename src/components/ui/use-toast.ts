// src/components/ui/use-toast.ts
import { useState } from 'react'

type ToastProps = {
    id: string
    title: string
    description?: string
    variant?: 'default' | 'destructive'
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const toast = (props: ToastProps) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { ...props, id }
        setToasts([...toasts, newToast])

        // Remove toast after 3 seconds
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id))
        }, 3000)
    }

    return { toast, toasts }
}