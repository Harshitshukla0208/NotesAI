'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/providers/auth-provider'
import { LogOut, Menu, Settings, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const userInitials = user?.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'UN'

    return (
        <motion.header
            className="sticky top-0 z-50 w-full bg-transparent dark:bg-black backdrop-blur-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-5">
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                                <nav className="flex flex-col gap-3 mt-8 text-sm font-medium">
                                    <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>Dashboard</Link>
                                    <Link href="/notes/new" className={`${pathname === '/notes/new' ? 'text-primary' : 'text-muted-foreground'}`}>New Note</Link>
                                    <Link href="/settings" className={`${pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}>Settings</Link>
                                </nav>
                            </SheetContent>
                        </Sheet>

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
    )
}
