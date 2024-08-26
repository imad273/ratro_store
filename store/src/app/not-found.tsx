import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-white w-full h-screen absolute top-0 left-0 z-50">
      <div className="flex justify-center items-center w-full h-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-main mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something&apos;s missing.</p>
            <p className="mb-4 text-gray-800">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link href="/">
              <Button>
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}