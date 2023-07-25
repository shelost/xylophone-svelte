export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_data: {
        Row: {
          id: string;
          email: string;
          stripe_customer_id: string | null;
          created_at: string | null;
          projects: Array<Object> | null;
          tasks: Array<Object> | null;
          spaces: Array<Object> | null;
        };
        Insert: {
          id: string;
          email: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
          projects: Array<Object> | null;
          tasks: Array<Object> | null;
          spaces: Array<Object> | null;
        };
        Update: {
          id?: string;
          email?: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
          projects: Array<Object> | null;
          tasks: Array<Object> | null;
          spaces: Array<Object> | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          username: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          username?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          username?: string | null;
          updated_at?: string;
        };
      };
      spaces: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          subtitle: string | null;
          members: Array<string>;
          notes: Array<Object>;
          tasks: Array<Object>;
        };
        Insert: {
          id: string;
          user_id: string;
          title: string | null;
          subtitle: string | null;
          members: Array<string>;
          notes: Array<Object>;
          tasks: Array<Object>;
        };
        Update: {
          id: string;
          user_id: string;
          title: string | null;
          subtitle: string | null;
          members: Array<string>;
          notes: Array<Object>;
          tasks: Array<Object>;
        };
      };
    };
    Functions: {};
  };
}

