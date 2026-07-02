'use client'

import { useState } from 'react'

type FaqItem = {
  question: string
  answerHtml: string
}

type Category = {
  label: string
  items: FaqItem[]
}

const DEFAULT_INITIAL_LIMIT = 5

export function FaqAccordion({
  categories,
  initialLimit = DEFAULT_INITIAL_LIMIT,
}: {
  categories: Category[]
  initialLimit?: number
}) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const hasMore = totalItems > initialLimit

  let remaining = initialLimit
  const visibleCategories = expanded
    ? categories
    : categories
        .map(cat => {
          if (remaining <= 0) return { ...cat, items: [] }
          const items = cat.items.slice(0, remaining)
          remaining -= items.length
          return { ...cat, items }
        })
        .filter(cat => cat.items.length > 0)

  return (
    <div className="flex flex-col gap-10">
      {visibleCategories.map((cat) => (
        <div key={cat.label}>
          <h2 className="text-xl font-bold text-forest mb-4 pb-2 border-b border-mint/40">
            {cat.label}
          </h2>
          <div className="flex flex-col gap-2">
            {cat.items.map((item, i) => {
              const key = `${cat.label}-${i}`
              const isOpen = openKey === key
              return (
                <div key={key} className="bg-white rounded-xl border border-mint/30 shadow-sm overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-dark hover:text-forest transition-colors"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className={`text-mint transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-6 pb-5 prose"
                      dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          className="self-center text-sm font-semibold text-forest hover:brightness-110 transition-all cursor-pointer"
        >
          {expanded ? 'Show less' : `Show ${totalItems - initialLimit} more`}
        </button>
      )}
    </div>
  )
}
