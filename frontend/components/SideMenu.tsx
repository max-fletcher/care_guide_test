import { cn } from '@/lib/utils'

const SideMenu = ({ children, title, classes }: { children: React.ReactNode; title?: string; classes?: string }) => {
  return (
    <div className={cn(`bg-white p-6 rounded-sm mb-3`, classes)}>
      {title && <h4 className="font-medium text-xl leading-3 mb-7">{title}</h4>}
      {children}
    </div>
  )
}

export default SideMenu
