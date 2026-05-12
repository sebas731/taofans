# ⚽ Álbum Mundial 2026 — Sistema de Figuritas Faltantes

Sistema web completo para que tus clientes marquen las figuritas que les faltan
y te las pidan directamente por WhatsApp o email.

---

## 🚀 Stack

- **Next.js 14** — Framework React full-stack
- **Supabase** — Base de datos + autenticación (gratis hasta 500MB)
- **Tailwind CSS** — Estilos
- **Vercel** — Deploy (gratis)

---

## ⚙️ Configuración paso a paso

### 1. Crear proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com) → New Project
2. Anotá tu **Project URL** y **anon key** (Settings → API)
3. En el SQL Editor, ejecutar todo el contenido de `supabase-schema.sql`

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editá `.env.local` con tus datos:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

NEXT_PUBLIC_VENDEDOR_WHATSAPP=5491112345678   # Tu número con código de país
NEXT_PUBLIC_VENDEDOR_EMAIL=tu@email.com
NEXT_PUBLIC_VENDEDOR_NOMBRE=Tu Nombre
```

> ⚠️ El número de WhatsApp debe estar en formato internacional sin el +
> Ejemplo: Argentina → 5491112345678

### 3. Instalar y correr localmente

```bash
npm install
npm run dev
# Abrí http://localhost:3000
```

---

## 🌐 Deploy en Vercel

```bash
# Instalar CLI de Vercel (si no lo tenés)
npm i -g vercel

# Deploy
vercel

# En el dashboard de Vercel agregar las mismas variables de entorno
# Settings → Environment Variables
```

O conectá directamente tu repo de GitHub en [vercel.com](https://vercel.com).

---

## 🖥️ Deploy en VPS (Ubuntu/Debian)

```bash
# En tu servidor
git clone TU_REPO
cd album-mundial-figuritas

npm install
cp .env.example .env.local
# Editar .env.local con tus datos

npm run build
npm start  # corre en puerto 3000
```

### Con PM2 (recomendado para VPS):

```bash
npm install -g pm2
pm2 start npm --name "figuritas" -- start
pm2 save
pm2 startup
```

### Con Nginx como proxy reverso:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Layout raíz
│   ├── globals.css
│   ├── auth/
│   │   ├── login/page.tsx        # Inicio de sesión
│   │   ├── registro/page.tsx     # Registro
│   │   └── callback/route.ts     # OAuth callback
│   └── dashboard/
│       ├── page.tsx              # Selector de figuritas
│       ├── layout.tsx            # Layout con nav
│       └── mis-pedidos/page.tsx  # Historial de pedidos
├── components/
│   ├── FiguitasSelector.tsx      # Grilla de figuritas
│   ├── EnviarPedidoModal.tsx     # Modal de envío
│   └── layout/
│       └── DashboardNav.tsx      # Navegación
├── lib/
│   └── supabase/
│       ├── client.ts             # Cliente browser
│       └── server.ts             # Cliente server
├── types/
│   └── index.ts                  # Tipos + datos del álbum
└── middleware.ts                 # Protección de rutas
```

---

## 🎨 Personalización

### Cambiar figuritas del álbum

Editá `src/types/index.ts` → `GRUPOS_MUNDIAL` para ajustar los rangos
de números según el álbum oficial que uses.

### Cambiar colores/marca

Editá `tailwind.config.js` → colores `brand` y `field`.

---

## 📞 Soporte

¿Dudas? Consultá la documentación de:
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Vercel](https://vercel.com/docs)
