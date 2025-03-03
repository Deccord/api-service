import { DocsNav } from '@/components/DocsNav'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto flex gap-12 py-10">
      <aside className="hidden w-64 lg:block">
        <DocsNav />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}