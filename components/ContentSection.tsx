// components/ContentSection.tsx

import { FC, ReactNode } from 'react'

interface ContentSectionProps {
  title: string
  children: ReactNode
}

const ContentSection: FC<ContentSectionProps> = ({ title, children }) => {
  return (
    <section className="mx-auto my-12 max-w-3xl px-4 py-8 border-2 border-border shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-transform">
      <h2 className="mb-6 font-heading text-4xl">{title}</h2>
      <p className="font-base text-lg leading-relaxed">{children}</p>
    </section>
  )
}

export default ContentSection
