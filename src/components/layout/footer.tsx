import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
                <div className="text-center text-sm text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} NotesAI. All rights reserved.
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/terms" className="hover:underline">
                        Terms
                    </Link>
                    <Link href="/privacy" className="hover:underline">
                        Privacy
                    </Link>
                    <Link href="/help" className="hover:underline">
                        Help
                    </Link>
                </div>
            </div>
        </footer>
    )
}