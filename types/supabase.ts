export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          content: string
          created_at: string | null
          description: string | null
          favicon: string | null
          group_id: string
          id: string
          title: string | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          description?: string | null
          favicon?: string | null
          group_id: string
          id?: string
          title?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          description?: string | null
          favicon?: string | null
          group_id?: string
          id?: string
          title?: string | null
          type?: string
          user_id?: string
        }
      }
      groups: {
        Row: {
          created_at: string | null
          id: string
          slug: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          slug: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          slug?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type Group = Database['public']['Tables']['groups']['Row']
