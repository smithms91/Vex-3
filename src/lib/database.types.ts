export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          address: string | null
          company: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          job_title: string | null
          last_name: string | null
          location: string | null
          notes: string[] | null
          phone_number: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          notes?: string[] | null
          phone_number?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          notes?: string[] | null
          phone_number?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string
        }
        Insert: {
          id: string
          stripe_customer_id: string
        }
        Update: {
          id?: string
          stripe_customer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          border: string
          direct: boolean
          disabled: boolean
          email: string
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          onboarding: boolean
          phone_number: string | null
          premium: boolean
          profile_color: string | null
          profile_picture: string | null
          socials: Json[] | null
          stripe_current_period_end: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          theme_color: string
          username: string | null
          vex_branding: boolean
          website: string | null
        }
        Insert: {
          border?: string
          direct?: boolean
          disabled?: boolean
          email: string
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          onboarding?: boolean
          phone_number?: string | null
          premium?: boolean
          profile_color?: string | null
          profile_picture?: string | null
          socials?: Json[] | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          theme_color?: string
          username?: string | null
          vex_branding?: boolean
          website?: string | null
        }
        Update: {
          border?: string
          direct?: boolean
          disabled?: boolean
          email?: string
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          onboarding?: boolean
          phone_number?: string | null
          premium?: boolean
          profile_color?: string | null
          profile_picture?: string | null
          socials?: Json[] | null
          stripe_current_period_end?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          theme_color?: string
          username?: string | null
          vex_branding?: boolean
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      socials: {
        Row: {
          created_at: string
          id: string
          network: string
          title: string | null
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          network: string
          title?: string | null
          user_id?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          network?: string
          title?: string | null
          user_id?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      verify_user_password: {
        Args: {
          password: string
        }
        Returns: boolean
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
