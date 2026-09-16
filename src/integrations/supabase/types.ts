export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      activity_content: {
        Row: {
          category: string
          created_at: string
          description: string
          icon_key: string
          id: string
          is_active: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon_key?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon_key?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          activity_key: string
          activity_type: string
          child_id: string
          completed_at: string
          created_at: string
          duration_seconds: number | null
          id: string
          score: number | null
        }
        Insert: {
          activity_key: string
          activity_type: string
          child_id: string
          completed_at?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          score?: number | null
        }
        Update: {
          activity_key?: string
          activity_type?: string
          child_id?: string
          completed_at?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          id: string
          notes: string | null
          parent_id: string
          preferred_date: string | null
          price_inr: number | null
          service_name: string
          status: string
          updated_at: string
        }
        Insert: {
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          parent_id: string
          preferred_date?: string | null
          price_inr?: number | null
          service_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          parent_id?: string
          preferred_date?: string | null
          price_inr?: number | null
          service_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      children: {
        Row: {
          age_group: string
          avatar: string
          created_at: string
          id: string
          nickname: string
          parent_id: string
          preferences: Json
          updated_at: string
        }
        Insert: {
          age_group: string
          avatar?: string
          created_at?: string
          id?: string
          nickname: string
          parent_id: string
          preferences?: Json
          updated_at?: string
        }
        Update: {
          age_group?: string
          avatar?: string
          created_at?: string
          id?: string
          nickname?: string
          parent_id?: string
          preferences?: Json
          updated_at?: string
        }
        Relationships: []
      }
      mood_checkins: {
        Row: {
          checked_in_at: string
          child_id: string
          created_at: string
          id: string
          mood: string
          note: string | null
        }
        Insert: {
          checked_in_at?: string
          child_id: string
          created_at?: string
          id?: string
          mood: string
          note?: string | null
        }
        Update: {
          checked_in_at?: string
          child_id?: string
          created_at?: string
          id?: string
          mood?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mood_checkins_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      parental_consents: {
        Row: {
          agreed: boolean
          agreed_at: string
          child_id: string | null
          consent_type: string
          created_at: string
          id: string
          parent_id: string
        }
        Insert: {
          agreed?: boolean
          agreed_at?: string
          child_id?: string | null
          consent_type: string
          created_at?: string
          id?: string
          parent_id: string
        }
        Update: {
          agreed?: boolean
          agreed_at?: string
          child_id?: string | null
          consent_type?: string
          created_at?: string
          id?: string
          parent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parental_consents_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          badge_key: string
          child_id: string
          earned_at: string
          id: string
          label: string
        }
        Insert: {
          badge_key: string
          child_id: string
          earned_at?: string
          id?: string
          label: string
        }
        Update: {
          badge_key?: string
          child_id?: string
          earned_at?: string
          id?: string
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_completions: {
        Row: {
          child_id: string
          completed_on: string
          created_at: string
          id: string
          task_id: string
        }
        Insert: {
          child_id: string
          completed_on?: string
          created_at?: string
          id?: string
          task_id: string
        }
        Update: {
          child_id?: string
          completed_on?: string
          created_at?: string
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_completions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "routine_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      routine_tasks: {
        Row: {
          child_id: string
          created_at: string
          emoji: string
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          child_id: string
          created_at?: string
          emoji?: string
          id?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          emoji?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_tasks_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      owns_child: { Args: { _child_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "parent"],
    },
  },
} as const
