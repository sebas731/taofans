import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="field-bg min-h-screen flex flex-col items-center justify-center px-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <Link href="/" className="font-display text-2xl text-brand-400 tracking-widest">
          ⚽ MUNDIAL 2026
        </Link>
      </div>
      <div className="w-full max-w-md animate-slide-up">
        {children}
      </div>
    </div>
  )
}
