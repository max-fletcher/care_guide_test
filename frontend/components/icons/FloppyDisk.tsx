import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const FloppyDiskIcon = ({ classes = '', width = 22, height = 22 }: Omit<TIconTypes, 'isActive'>) => {
  return (
    <svg
      className={cn('shrink-0', classes)}
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 22 24"
      stroke="#666"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  )
}

export default FloppyDiskIcon
