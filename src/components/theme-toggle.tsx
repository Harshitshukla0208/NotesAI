"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </motion.div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </motion.div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <span>System</span>
                    </motion.div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}