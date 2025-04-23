// src/app/auth/signin/page.tsx
import AuthForm from '@/components/auth/auth-form'
import { BackgroundLines } from "@/components/ui/background-lines";

export default function SignIn() {
    return (
        <div className="w-full min-h-screen dark:bg-black relative">
            {/* Background rendered separately */}
            <div className="absolute inset-0 pointer-events-none">
                <BackgroundLines className="w-full h-full">
                    <div></div>
                </BackgroundLines>
            </div>
            
            {/* Content on top with pointer events enabled */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <AuthForm mode="signin" />
            </div>
        </div>
    )
}