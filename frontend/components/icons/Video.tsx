import { cn } from '@/lib/utils'
import { TIconTypes } from '@/types/icon.types'

const VideoIcon = ({ classes = '', width = 22, height = 24 }: Omit<TIconTypes, 'isActive'>) => {
  return (
    <svg className={cn('shrink-0', classes)} width={width} height={height} fill="none" viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#666"
        d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"
      ></path>
    </svg>
  )
}

export default VideoIcon
