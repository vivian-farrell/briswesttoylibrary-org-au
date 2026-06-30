import type { Metadata } from 'next'
import BarcodeGenerator from '@/components/BarcodeGenerator'

export const metadata: Metadata = {
  title: 'Barcode Generator | Brisbane West Toy Library',
  description: 'Generate printable Code 39 barcodes from SETLS export codes.',
  robots: { index: false, follow: false },
}

export default function BarcodePage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <BarcodeGenerator />
      </div>
    </div>
  )
}
