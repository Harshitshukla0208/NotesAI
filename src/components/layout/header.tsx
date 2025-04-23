'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/providers/auth-provider'
import { LogOut, Settings, Search } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
    BookText,
    Plus,
    Home,
    X,
    Menu
} from 'lucide-react'

export default function Header() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
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

    const userInitials = user?.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'UN'

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'All Notes', href: '/notes', icon: BookText },
        { name: 'Settings', href: '/settings', icon: Settings },
    ]

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: { opacity: 1, y: 0 }
    }

    if (!isMounted) return null

    return (
        <>
            <motion.header
                className="sticky top-0 z-50 w-full bg-transparent dark:bg-black backdrop-blur-md"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-5">
                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>

                            <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
                                Notes<span className="text-primary">AI</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {user ? (
                                <>
                                    <div className="hidden md:flex items-center">
                                        {!isSearchOpen ? (
                                            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                                                <Search className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <AnimatePresence>
                                                <motion.div
                                                    key="search-bar"
                                                    initial={{ width: 0, opacity: 0 }}
                                                    animate={{ width: 160, opacity: 1 }}
                                                    exit={{ width: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Input
                                                        placeholder="Search..."
                                                        className="h-8 text-xs"
                                                        autoFocus
                                                        onBlur={() => setIsSearchOpen(false)}
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        )}
                                    </div>

                                    <ThemeToggle />

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="text-sm gap-2" asChild>
                                                <Link href="/settings">
                                                    <Settings className="h-4 w-4" />
                                                    Settings
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-sm gap-2" onClick={() => signOut()}>
                                                <LogOut className="h-4 w-4" />
                                                Sign out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <div className="flex items-center gap-2 text-sm">
                                    <ThemeToggle />
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/auth/signin">Sign In</Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href="/auth/signup">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.header>

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
                        className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r bg-background md:hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    >
                        <div className="flex h-full flex-col gap-2 p-4">
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
                            <div className="border-t pt-3">
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
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar - Keep this from original Sidebar component */}
            {pathname === '/dashboard' && (
                <motion.aside
                    className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-56 border-r bg-background shadow-sm md:block"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="flex h-full flex-col gap-3 p-4">
                        <div className="flex-1 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + navigation.indexOf(item) * 0.05 }}
                                    >
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
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 + navigation.length * 0.05 }}
                            >
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
            )}
        </>
    )
}