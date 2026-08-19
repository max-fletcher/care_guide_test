import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const ArrowDownIcon = ({ classes = '', width = 10, height = 6 }: Omit<TIconTypes, 'isActive'>) => {
  return (
    <svg className={cn('shrink-0', classes)} width={width} height={height} fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
      <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
    </svg>
  )
}

export default ArrowDownIcon
