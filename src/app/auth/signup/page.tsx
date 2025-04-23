// src/app/auth/signup/page.tsx
import AuthForm from '@/components/auth/auth-form'

export default function SignUp() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <AuthForm mode="signup" />
        </div>
    )
}