// src/app/auth/signin/page.tsx
import AuthForm from '@/components/auth/auth-form'

export default function SignIn() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <AuthForm mode="signin" />
        </div>
    )
}