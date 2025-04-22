'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/providers/auth-provider'
import {
    LogOut,
    Menu,
    User,
    Settings,
    Search
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function Header() {
    const { user, signOut } = useAuth()
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const userInitials = user?.email
        ? user.email.substring(0, 2).toUpperCase()
        : 'UN'

    return (
        <motion.header
            className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/dashboard" className={`text-lg font-medium ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                                    Dashboard
                                </Link>
                                <Link href="/notes/new" className={`text-lg font-medium ${pathname === '/notes/new' ? 'text-primary' : 'text-muted-foreground'}`}>
                                    New Note
                                </Link>
                                <Link href="/settings" className={`text-lg font-medium ${pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}>
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/dashboard" className="flex items-center">
                        <span className="text-xl font-bold">NotesAI</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <>
                            <div className="hidden md:flex items-center space-x-1">
                                {!isSearchOpen ? (
                                    <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                                        <Search className="h-5 w-5" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                ) : (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="flex items-center"
                                    >
                                        <Input
                                            placeholder="Search notes..."
                                            className="h-9"
                                            autoFocus
                                            onBlur={() => setIsSearchOpen(false)}
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <ThemeToggle />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{userInitials}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-2" asChild>
                                        <Link href="/settings">
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => signOut()}>
                                        <LogOut className="h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}

                    {!user && (
                        <div className="flex items-center gap-2">
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
        </motion.header>
    )
}