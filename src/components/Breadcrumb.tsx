import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="px-12 py-3 border-b border-[var(--rule)] bg-[var(--bg2)]">
      <p className="label flex gap-2 items-center">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex gap-2 items-center">
            {i > 0 && <span className="opacity-40">·</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[var(--text)] transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[var(--text)]">{crumb.label}</span>
            )}
          </span>
        ))}
      </p>
    </div>
  )
}
