import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Note = {
    id: string
    title: string
    content: string
    is_code: boolean
    language?: string
    created_at: string
    updated_at: string
    user_id: string
    is_public: boolean
    summary?: string
    tags?: string[]
}