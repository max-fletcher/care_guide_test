import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const FriendGroupIcon = ({ classes = '', width = 22, height = 22 }: Omit<TIconTypes, 'isActive'>) => {
  return (
    <svg
      className={cn('shrink-0', classes)}
      width={width}
      height={height}
      fill="none"
      stroke="#666"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
}

export default FriendGroupIcon
