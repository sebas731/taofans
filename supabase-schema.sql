-- =============================================
--  ALBUM MUNDIAL 2026 — Schema de base de datos
--  Ejecutar en Supabase SQL Editor
-- =============================================

-- 1. Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre      TEXT NOT NULL,
  email       TEXT NOT NULL,
  whatsapp    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de figuritas faltantes por usuario
CREATE TABLE IF NOT EXISTS public.figuritas_faltantes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero      INTEGER NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, numero)
);

-- 3. Tabla de pedidos enviados
CREATE TABLE IF NOT EXISTS public.pedidos (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  figuritas   INTEGER[] NOT NULL DEFAULT '{}',
  mensaje     TEXT DEFAULT '',
  estado      TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'procesado', 'entregado')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
--  Row Level Security (RLS) — Seguridad
-- =============================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.figuritas_faltantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos             ENABLE ROW LEVEL SECURITY;

-- Profiles: cada usuario solo ve y edita el suyo
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Figuritas faltantes: solo el dueño
CREATE POLICY "figuritas_select_own" ON public.figuritas_faltantes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "figuritas_insert_own" ON public.figuritas_faltantes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "figuritas_update_own" ON public.figuritas_faltantes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "figuritas_delete_own" ON public.figuritas_faltantes
  FOR DELETE USING (auth.uid() = user_id);

-- Pedidos: solo el dueño
CREATE POLICY "pedidos_select_own" ON public.pedidos
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "pedidos_insert_own" ON public.pedidos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
--  Trigger: crear perfil al registrarse
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nombre, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
