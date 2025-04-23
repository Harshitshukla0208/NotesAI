'use client'

import Link from 'next/link'

export default function Footer() {
    return (
        <footer
            className="w-full bg-transparent dark:bg-black backdrop-blur-md"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row">
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} <span className="font-semibold">Notes</span><span className="text-primary">AI</span>. All rights reserved.
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link href="/terms" className="hover:text-primary transition-colors duration-200">Terms</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors duration-200">Privacy</Link>
                        <Link href="/help" className="hover:text-primary transition-colors duration-200">Help</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
