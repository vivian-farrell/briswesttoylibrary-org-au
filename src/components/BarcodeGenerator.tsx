'use client'

import JsBarcode from 'jsbarcode'
import { useMemo, useRef, useEffect, useState } from 'react'

type Entry = { code: string; title?: string }

// Parses one CSV line into fields, handling RFC 4180 double-quoted fields.
// Only the first two fields are needed; the rest are ignored.
function parseCsvLine(line: string): [string, string | undefined] {
  const fields: string[] = []
  let i = 0
  while (i < line.length && fields.length < 2) {
    if (line[i] === '"') {
      let field = ''
      i++ // skip opening quote
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') {
          field += '"'
          i += 2
        } else if (line[i] === '"') {
          i++ // skip closing quote
          break
        } else {
          field += line[i++]
        }
      }
      fields.push(field)
      if (line[i] === ',') i++ // skip separator
    } else {
      const end = line.indexOf(',', i)
      if (end === -1) {
        fields.push(line.slice(i))
        break
      }
      fields.push(line.slice(i, end))
      i = end + 1
    }
  }
  // Strip single quotes as a convenience for manual entry
  const code = (fields[0] ?? '').trim().replace(/^'|'$/g, '')
  const title = (fields[1] ?? '').trim().replace(/^'|'$/g, '') || undefined
  return [code, title]
}

function parseEntries(raw: string): Entry[] {
  return raw
    .split(/\r?\n/)
    .map(line => {
      const [rawCode, title] = parseCsvLine(line.trim())
      const code = rawCode.toUpperCase()
      return { code, title }
    })
    .filter(entry => entry.code.length > 0)
}

function BarcodeItem({
  code, label, barWidth, barHeight,
}: { code: string; label: string; barWidth: number; barHeight: number }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return
    setError(false)
    try {
      JsBarcode(svgRef.current, code, {
        format: 'CODE39',
        width: barWidth,
        height: barHeight,
        displayValue: true,
        fontSize: 11,
        margin: 6,
      })
    } catch {
      setError(true)
    }
  }, [code, barWidth, barHeight])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60px] text-xs text-red-600 gap-1">
        <span>Invalid</span>
        <span className="font-mono">{code}</span>
      </div>
    )
  }

  return (
    <>
      <svg ref={svgRef} className="w-full" />
      {label && (
        <p className="text-xs text-center leading-tight px-1 pb-1 w-full truncate">{label}</p>
      )}
    </>
  )
}

export default function BarcodeGenerator() {
  const [rawInput, setRawInput] = useState('')
  const [label, setLabel] = useState('Brisbane West Toy Library')
  const [barWidth, setBarWidth] = useState(1.5)
  const [barHeight, setBarHeight] = useState(70)
  const [columns, setColumns] = useState(4)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const entries = useMemo(() => parseEntries(rawInput), [rawInput])

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setRawInput((ev.target?.result as string) ?? '')
    }
    reader.readAsText(file)
    // Reset so the same file can be re-uploaded if needed
    e.target.value = ''
  }

  return (
    <>
      <style>{`
        @media print {
          nav, header, footer, #barcode-controls { display: none !important; }
          #barcode-grid { display: grid !important; gap: 0.5rem; }
          .barcode-wrapper { break-inside: avoid; page-break-inside: avoid; }
          @page { margin: 1cm; }
        }
      `}</style>

      <div id="barcode-controls">
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">Barcode Generator</h1>
        <p className="text-muted text-lg leading-relaxed mb-8">
          Paste SETLS codes below to generate printable Code 39 barcodes.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-mint/30 flex flex-col gap-6 mb-8">
          <div>
            <div className="flex items-center justify-between mb-2 gap-4">
              <label className="text-sm font-semibold text-dark" htmlFor="codes-input">
                Codes
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-forest hover:brightness-110 transition-all cursor-pointer"
              >
                Upload CSV ↑
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="sr-only"
                aria-label="Upload CSV file"
              />
            </div>
            <div className="mb-3 rounded-xl bg-cream border border-mint/30 px-4 py-3 text-sm text-muted space-y-1">
              <p><span className="font-semibold text-dark">One code per line.</span> Upload directly from a SETLS export (via Toys &gt; Toys (list) &gt; CSV) or type codes manually.</p>
              <p>To include the toy name, add a comma after the code: <code className="font-mono bg-white/80 px-1 rounded">T001,Toy Name Here</code></p>
              <p className="text-muted/70">If the toy name contains a comma, wrap it in quotes: <code className="font-mono bg-white/80 px-1 rounded">T001,"Name, with comma"</code>. Codes are automatically uppercased and quotes are automatically stripped.</p>
            </div>
            <textarea
              id="codes-input"
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              placeholder={"T001\nT002,Mega Bloks 80-piece\nT003,Fisher-Price Farm"}
              rows={5}
              className="w-full rounded-xl border border-mint/40 bg-cream px-4 py-3 font-mono text-sm text-dark placeholder:text-muted/40 focus:outline-none focus:border-forest/50 transition-colors resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1" htmlFor="bar-width">
                Bar width — {barWidth.toFixed(1)}
              </label>
              <input
                id="bar-width"
                type="range"
                min="1"
                max="3"
                step="0.5"
                value={barWidth}
                onChange={e => setBarWidth(Number(e.target.value))}
                className="w-full accent-forest"
              />
              <p className="text-xs text-muted/60 mt-1">1 = narrow · 3 = wide</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1" htmlFor="bar-height">
                Bar height — {barHeight} px
              </label>
              <input
                id="bar-height"
                type="range"
                min="40"
                max="120"
                step="5"
                value={barHeight}
                onChange={e => setBarHeight(Number(e.target.value))}
                className="w-full accent-forest"
              />
              <p className="text-xs text-muted/60 mt-1">40 = short · 120 = tall</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-1" htmlFor="columns">
                Columns per row
              </label>
              <input
                id="columns"
                type="number"
                min="1"
                max="5"
                value={columns}
                onChange={e => setColumns(Math.min(5, Math.max(1, Number(e.target.value))))}
                className="w-full rounded-xl border border-mint/40 bg-cream px-4 py-2 text-dark focus:outline-none focus:border-forest/50 transition-colors"
              />
              <p className="text-xs text-muted/60 mt-1">4 recommended for A4</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-1" htmlFor="barcode-label">
              Label
            </label>
            <input
              id="barcode-label"
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="e.g. bris west toy library"
              className="w-full rounded-xl border border-mint/40 bg-cream px-4 py-2 text-dark focus:outline-none focus:border-forest/50 transition-colors"
            />
            <p className="text-xs text-muted/60 mt-1">Printed between the barcode and toy name — leave blank to omit</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => window.print()}
              disabled={entries.length === 0}
              className="inline-block bg-forest text-white font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Print barcodes
            </button>
            {entries.length > 0 && (
              <p className="text-muted text-sm">
                {entries.length} barcode{entries.length !== 1 ? 's' : ''} ready
              </p>
            )}
          </div>
        </div>
      </div>

      {entries.length > 0 && (
        <div
          id="barcode-grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          className="grid gap-2"
        >
          {entries.map(({ code, title }, i) => (
            <div key={`${code}-${i}`} className="barcode-wrapper flex flex-col items-center">
              <div className="barcode-cell border border-black p-1 w-full flex flex-col items-center justify-center text-center">
                <BarcodeItem code={code} label={label} barWidth={barWidth} barHeight={barHeight} />
              </div>
              <div className="w-full px-1 pt-0.5" style={{ minHeight: '2.4em' }}>
                {title && (
                  <p className="text-xs text-center leading-tight line-clamp-2">{title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
