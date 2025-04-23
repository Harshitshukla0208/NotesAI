// src/app/layout.tsx
import './globals.css'
import { Metadata } from 'next'
import { AuthProvider } from '@/providers/auth-provider'
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import AppLayout from '@/components/app-layout'

export const metadata: Metadata = {
  title: 'NotesAI - Smart Note Taking App',
  description: 'A powerful note-taking application with AI summarization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <AuthProvider>
              <AppLayout>{children}</AppLayout>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
