import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Note } from '@/lib/supabase/client'
import { useAuth } from '@/providers/auth-provider'

export function useNotes() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const fetchNotes = async (): Promise<Note[]> => {
        if (!user) return []

        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    // const fetchNote = async (id: string): Promise<Note | null> => {
    //     const { data, error } = await supabase
    //         .from('notes')
    //         .select('*')
    //         .eq('id', id)
    //         .single()

    //     if (error) throw error
    //     return data
    // }

    const createNote = async (note: Partial<Note>): Promise<Note> => {
        if (!user) throw new Error('User not authenticated')

        const newNote = {
            ...note,
            user_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('notes')
            .insert([newNote])
            .select()
            .single()

        if (error) throw error
        return data
    }

    const updateNote = async ({ id, ...updatedData }: Partial<Note> & { id: string }): Promise<Note> => {
        const updates = {
            ...updatedData,
            updated_at: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('notes')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    const deleteNote = async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    const notesQuery = useQuery({
        queryKey: ['notes', user?.id],
        queryFn: fetchNotes,
        enabled: !!user
    })

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes', user?.id] })
        }
    })

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['notes', user?.id] })
            queryClient.invalidateQueries({ queryKey: ['note', data.id] })
        }
    })

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes', user?.id] })
        }
    })

    return {
        notes: notesQuery.data || [],
        isLoading: notesQuery.isLoading,
        error: notesQuery.error,
        createNote: createNoteMutation.mutate,
        updateNote: updateNoteMutation.mutate,
        deleteNote: deleteNoteMutation.mutate,
    }
}

// ✅ VALID HOOK: useNoteById
export function useNoteById(id: string) {
    return useQuery({
        queryKey: ['note', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data
        },
        enabled: !!id
    })
}
