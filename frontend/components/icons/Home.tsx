import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const HomeIcon = ({ classes = '', width = 18, height = 21, isActive = false }: TIconTypes) => {
  return (
    <svg className={cn(classes)} style={{ width, height }} fill="none" viewBox="0 0 18 21" xmlns="http://www.w3.org/2000/svg">
      <path
        className="_home_active"
        stroke={isActive ? '#1890FF' : '#000'}
        fillOpacity={isActive ? '1' : '.6'}
        strokeWidth="1.5"
        strokeOpacity={isActive ? '1' : '.6'}
        d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z"
      ></path>
      <path
        className="_home_active"
        stroke={isActive ? '#1890FF' : '#000'}
        fillOpacity={isActive ? '1' : '.6'}
        strokeWidth="1.5"
        strokeOpacity={isActive ? '1' : '.6'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857"
      ></path>
    </svg>
  )
}

export default HomeIcon
