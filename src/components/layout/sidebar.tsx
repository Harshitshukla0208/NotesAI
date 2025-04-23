'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
    BookText,
    Plus,
    Home,
    Settings,
    Menu,
    X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    
    // Prevent hydration errors by waiting for client-side mount
    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    useEffect(() => {
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false)
    }, [pathname])
    
    // Close menu if escape key is pressed
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false)
        }
        
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [])
    
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
    
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: { opacity: 1, y: 0 }
    }
    
    if (!isMounted) return null
    
    return (
        <>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
            
            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.aside
                        className="fixed left-0 top-0 z-40 h-full w-64 border-r bg-background md:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    >
                        <div className="flex h-full flex-col gap-2 pt-16 p-4">
                            <div className="flex-1 space-y-1">
                                {navigation.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.div 
                                            key={item.name}
                                            variants={mobileMenuVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: navigation.indexOf(item) * 0.05 }}
                                        >
                                            <Button
                                                asChild
                                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                                className={cn(
                                                    'w-full justify-start',
                                                    pathname === item.href && 'bg-muted font-medium'
                                                )}
                                            >
                                                <Link href={item.href} className="flex items-center">
                                                    <Icon className="mr-3 h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    )
                                })}
                            </div>
                            <motion.div 
                                variants={mobileMenuVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: navigation.length * 0.05 }}
                            >
                                <Button asChild className="w-full" size="sm">
                                    <Link href="/notes/new" className="flex items-center">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Note
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
            
            {/* Desktop Sidebar */}
            <motion.aside
                className="fixed dark:bg-black left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-56 border-r bg-background shadow-sm md:block"
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
            >
                <div className="flex h-full flex-col gap-3 p-4">
                    <div className="flex-1 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            return (
                                <motion.div key={item.name} variants={itemVariants}>
                                    <Button
                                        asChild
                                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                                        className={cn(
                                            'w-full justify-start transition-all',
                                            pathname === item.href && 'bg-muted font-medium'
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center">
                                            <Icon className="mr-3 h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </Button>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="border-t pt-3">
                        <motion.div variants={itemVariants}>
                            <Button asChild className="w-full" size="sm">
                                <Link href="/notes/new" className="flex items-center">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Note
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}