// src/components/layout/app-layout.tsx
'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const isDashboard = pathname === '/dashboard'

    return (
        <div className={isDashboard ? 'flex min-h-screen flex-col dark:bg-black' : 'flex min-h-screen flex-col'}>
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
        </div>
    )
}
