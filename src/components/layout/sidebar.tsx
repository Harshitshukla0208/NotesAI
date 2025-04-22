'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    BookText,
    Plus,
    Home,
    Settings
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Sidebar() {
    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'All Notes', href: '/notes', icon: BookText },
        { name: 'Settings', href: '/settings', icon: Settings },
    ]

    const sidebarVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    }

    return (
        <motion.aside
            className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-56 border-r bg-background md:block"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <div className="flex h-full flex-col gap-2 p-4">
                <div className="flex-1 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                            <motion.div key={item.name} variants={itemVariants}>
                                <Button
                                    asChild
                                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start',
                                        pathname === item.href && 'bg-muted'
                                    )}
                                >
                                    <Link href={item.href} className="flex items-center">
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                </Button>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div variants={itemVariants}>
                    <Button asChild className="w-full" size="sm">
                        <Link href="/notes/new" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            New Note
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </motion.aside>
    )
}