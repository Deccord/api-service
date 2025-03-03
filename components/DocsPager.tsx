import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface DocsPagerProps {
  prev?: {
    href: string
    title: string
  }
  next?: {
    href: string
    title: string
  }
}

export function DocsPager({ prev, next }: DocsPagerProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {next.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}