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

export function FaqAccordion({ categories }: { categories: Category[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-10">
      {categories.map((cat) => (
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
    </div>
  )
}
