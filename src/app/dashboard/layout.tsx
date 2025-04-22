// src/app/dashboard/layout.tsx
import Sidebar from '@/components/layout/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 md:ml-56">
                <div className="container py-6 md:py-8">
                    {children}
                </div>
            </div>
        </div>
    )
}