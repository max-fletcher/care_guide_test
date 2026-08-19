import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const MagnifyingGlassIcon = ({ classes = '', width = 20, height = 20 }: TIconTypes) => {
  return (
    <svg className={cn(classes)} style={{ width, height }} fill="none" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" stroke="#666"></circle>
      <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
    </svg>
  )
}

export default MagnifyingGlassIcon
