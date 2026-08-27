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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      conquistas_catalogo: {
        Row: {
          created_at: string
          descricao: string
          icone: string | null
          slug: string
          titulo: string
          xp: number
        }
        Insert: {
          created_at?: string
          descricao: string
          icone?: string | null
          slug: string
          titulo: string
          xp?: number
        }
        Update: {
          created_at?: string
          descricao?: string
          icone?: string | null
          slug?: string
          titulo?: string
          xp?: number
        }
        Relationships: []
      }
      conquistas_usuario: {
        Row: {
          conquista_slug: string
          created_at: string
          id: string
          identidade_id: string
        }
        Insert: {
          conquista_slug: string
          created_at?: string
          id?: string
          identidade_id: string
        }
        Update: {
          conquista_slug?: string
          created_at?: string
          id?: string
          identidade_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conquistas_usuario_conquista_slug_fkey"
            columns: ["conquista_slug"]
            isOneToOne: false
            referencedRelation: "conquistas_catalogo"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "conquistas_usuario_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      diario_espiritual: {
        Row: {
          created_at: string
          data: string
          id: string
          identidade_id: string
          intencao: string | null
          minutos: number
          reflexao: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: string
          id?: string
          identidade_id: string
          intencao?: string | null
          minutos?: number
          reflexao?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: string
          id?: string
          identidade_id?: string
          intencao?: string | null
          minutos?: number
          reflexao?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diario_espiritual_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      estudos_conteudo: {
        Row: {
          chave: string
          created_at: string
          id: string
          identidade_id: string
          tipo: string
        }
        Insert: {
          chave: string
          created_at?: string
          id?: string
          identidade_id: string
          tipo: string
        }
        Update: {
          chave?: string
          created_at?: string
          id?: string
          identidade_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "estudos_conteudo_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      favoritos: {
        Row: {
          capitulo: number
          created_at: string
          id: string
          identidade_id: string
          livro: string
          texto: string | null
          versiculo: number
        }
        Insert: {
          capitulo: number
          created_at?: string
          id?: string
          identidade_id: string
          livro: string
          texto?: string | null
          versiculo: number
        }
        Update: {
          capitulo?: number
          created_at?: string
          id?: string
          identidade_id?: string
          livro?: string
          texto?: string | null
          versiculo?: number
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_denuncias: {
        Row: {
          comentario: string | null
          created_at: string
          id: string
          identidade_id: string | null
          motivo: string
          resposta_id: string | null
          situacao: string
          topico_id: string | null
          updated_at: string
        }
        Insert: {
          comentario?: string | null
          created_at?: string
          id?: string
          identidade_id?: string | null
          motivo: string
          resposta_id?: string | null
          situacao?: string
          topico_id?: string | null
          updated_at?: string
        }
        Update: {
          comentario?: string | null
          created_at?: string
          id?: string
          identidade_id?: string | null
          motivo?: string
          resposta_id?: string | null
          situacao?: string
          topico_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_denuncias_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_denuncias_resposta_id_fkey"
            columns: ["resposta_id"]
            isOneToOne: false
            referencedRelation: "forum_respostas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_denuncias_topico_id_fkey"
            columns: ["topico_id"]
            isOneToOne: false
            referencedRelation: "forum_topicos"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_reacoes: {
        Row: {
          created_at: string
          id: string
          identidade_id: string
          resposta_id: string | null
          tipo: string
          topico_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          identidade_id: string
          resposta_id?: string | null
          tipo?: string
          topico_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          identidade_id?: string
          resposta_id?: string | null
          tipo?: string
          topico_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_reacoes_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_reacoes_resposta_id_fkey"
            columns: ["resposta_id"]
            isOneToOne: false
            referencedRelation: "forum_respostas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_reacoes_topico_id_fkey"
            columns: ["topico_id"]
            isOneToOne: false
            referencedRelation: "forum_topicos"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_respostas: {
        Row: {
          corpo: string
          created_at: string
          id: string
          identidade_id: string
          status: string
          topico_id: string
          updated_at: string
        }
        Insert: {
          corpo: string
          created_at?: string
          id?: string
          identidade_id: string
          status?: string
          topico_id: string
          updated_at?: string
        }
        Update: {
          corpo?: string
          created_at?: string
          id?: string
          identidade_id?: string
          status?: string
          topico_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_respostas_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_respostas_topico_id_fkey"
            columns: ["topico_id"]
            isOneToOne: false
            referencedRelation: "forum_topicos"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_secoes: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          nome: string
          ordem: number
          slug: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          ordem?: number
          slug: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          ordem?: number
          slug?: string
        }
        Relationships: []
      }
      forum_topicos: {
        Row: {
          corpo: string
          created_at: string
          fixado: boolean
          id: string
          identidade_id: string
          respostas_count: number
          secao_id: string
          slug: string
          status: string
          titulo: string
          trancado: boolean
          ultima_atividade: string
          updated_at: string
        }
        Insert: {
          corpo: string
          created_at?: string
          fixado?: boolean
          id?: string
          identidade_id: string
          respostas_count?: number
          secao_id: string
          slug: string
          status?: string
          titulo: string
          trancado?: boolean
          ultima_atividade?: string
          updated_at?: string
        }
        Update: {
          corpo?: string
          created_at?: string
          fixado?: boolean
          id?: string
          identidade_id?: string
          respostas_count?: number
          secao_id?: string
          slug?: string
          status?: string
          titulo?: string
          trancado?: boolean
          ultima_atividade?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_topicos_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topicos_secao_id_fkey"
            columns: ["secao_id"]
            isOneToOne: false
            referencedRelation: "forum_secoes"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_uso: {
        Row: {
          chave: string
          contagem: number
          created_at: string
          id: string
          janela: string
          updated_at: string
        }
        Insert: {
          chave: string
          contagem?: number
          created_at?: string
          id?: string
          janela: string
          updated_at?: string
        }
        Update: {
          chave?: string
          contagem?: number
          created_at?: string
          id?: string
          janela?: string
          updated_at?: string
        }
        Relationships: []
      }
      identidades: {
        Row: {
          apelido: string | null
          created_at: string
          email: string | null
          id: string
          melhor_streak: number
          nivel: number
          santo_escolhido: boolean
          santo_imagem: string | null
          santo_nome: string
          santo_slug: string
          streak: number
          token: string
          ultima_oracao: string | null
          updated_at: string
          user_id: string | null
          xp: number
        }
        Insert: {
          apelido?: string | null
          created_at?: string
          email?: string | null
          id?: string
          melhor_streak?: number
          nivel?: number
          santo_escolhido?: boolean
          santo_imagem?: string | null
          santo_nome: string
          santo_slug: string
          streak?: number
          token?: string
          ultima_oracao?: string | null
          updated_at?: string
          user_id?: string | null
          xp?: number
        }
        Update: {
          apelido?: string | null
          created_at?: string
          email?: string | null
          id?: string
          melhor_streak?: number
          nivel?: number
          santo_escolhido?: boolean
          santo_imagem?: string | null
          santo_nome?: string
          santo_slug?: string
          streak?: number
          token?: string
          ultima_oracao?: string | null
          updated_at?: string
          user_id?: string | null
          xp?: number
        }
        Relationships: []
      }
      leituras_biblia: {
        Row: {
          capitulo: number
          created_at: string
          id: string
          identidade_id: string
          livro: string
        }
        Insert: {
          capitulo: number
          created_at?: string
          id?: string
          identidade_id: string
          livro: string
        }
        Update: {
          capitulo?: number
          created_at?: string
          id?: string
          identidade_id?: string
          livro?: string
        }
        Relationships: [
          {
            foreignKeyName: "leituras_biblia_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      notas: {
        Row: {
          capitulo: number
          conteudo: string
          created_at: string
          id: string
          identidade_id: string
          livro: string
          updated_at: string
          versiculo: number | null
        }
        Insert: {
          capitulo: number
          conteudo: string
          created_at?: string
          id?: string
          identidade_id: string
          livro: string
          updated_at?: string
          versiculo?: number | null
        }
        Update: {
          capitulo?: number
          conteudo?: string
          created_at?: string
          id?: string
          identidade_id?: string
          livro?: string
          updated_at?: string
          versiculo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notas_identidade_id_fkey"
            columns: ["identidade_id"]
            isOneToOne: false
            referencedRelation: "identidades"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          atualizado_em: string
          autor: string | null
          categoria: string
          corpo: string
          criado_em: string
          destaque: boolean
          fonte_nome: string | null
          fonte_url: string | null
          id: string
          imagem_url: string | null
          publicada: boolean
          publicado_em: string
          resumo: string
          slug: string
          tags: string[]
          titulo: string
        }
        Insert: {
          atualizado_em?: string
          autor?: string | null
          categoria?: string
          corpo: string
          criado_em?: string
          destaque?: boolean
          fonte_nome?: string | null
          fonte_url?: string | null
          id?: string
          imagem_url?: string | null
          publicada?: boolean
          publicado_em?: string
          resumo: string
          slug: string
          tags?: string[]
          titulo: string
        }
        Update: {
          atualizado_em?: string
          autor?: string | null
          categoria?: string
          corpo?: string
          criado_em?: string
          destaque?: boolean
          fonte_nome?: string | null
          fonte_url?: string | null
          id?: string
          imagem_url?: string | null
          publicada?: boolean
          publicado_em?: string
          resumo?: string
          slug?: string
          tags?: string[]
          titulo?: string
        }
        Relationships: []
      }
      push_dispositivos: {
        Row: {
          ativo: boolean
          auth: string
          created_at: string
          endpoint: string
          falhas: number
          fuso_offset: number
          horarios: Json
          id: string
          p256dh: string
          ultimo_envio: Json
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          auth: string
          created_at?: string
          endpoint: string
          falhas?: number
          fuso_offset?: number
          horarios?: Json
          id?: string
          p256dh: string
          ultimo_envio?: Json
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          auth?: string
          created_at?: string
          endpoint?: string
          falhas?: number
          fuso_offset?: number
          horarios?: Json
          id?: string
          p256dh?: string
          ultimo_envio?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reconciliar_identidade_conta: {
        Args: { _email?: string; _token_anonimo: string; _user_id: string }
        Returns: string
      }
      registrar_uso_ia: {
        Args: { _chave: string; _janela: string }
        Returns: number
      }
      somar_xp: {
        Args: { _delta: number; _identidade_id: string }
        Returns: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
