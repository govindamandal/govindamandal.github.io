import { motion, type Variants } from 'framer-motion'
import type { ElementType, MouseEvent, MouseEventHandler, ReactNode } from 'react'

type InteractiveCardProps = {
  as?: 'article' | 'button' | 'div'
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLElement>
  onMouseLeave?: MouseEventHandler<HTMLElement>
  onMouseMove?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit' | 'reset'
  variants?: Variants
  [key: string]: unknown
}

export function InteractiveCard({ as = 'div', children, className = '', ...props }: InteractiveCardProps) {
  const Component = (as === 'article' ? motion.article : as === 'button' ? motion.button : motion.div) as ElementType

  function moveSpotlight(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    event.currentTarget.style.setProperty('--spotlight-x', `${x}%`)
    event.currentTarget.style.setProperty('--spotlight-y', `${y}%`)
  }

  function resetSpotlight(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--spotlight-x', '50%')
    event.currentTarget.style.setProperty('--spotlight-y', '0%')
  }

  return (
    <Component
      {...props}
      className={`interactive-card ${className}`}
      onMouseLeave={(event: MouseEvent<HTMLElement>) => {
        resetSpotlight(event)
        props.onMouseLeave?.(event)
      }}
      onMouseMove={(event: MouseEvent<HTMLElement>) => {
        moveSpotlight(event)
        props.onMouseMove?.(event)
      }}
    >
      {children}
    </Component>
  )
}
