import { FieldPath, FieldValues } from 'react-hook-form'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import MagnifyingGlassIcon from './icons/MagnifyingGlass'

interface ISearchInputProps<T extends FieldValues> {
  // NOTE: "email" | "password" would work, but we will need to edit it on adding new fields. Hence, we are taking an inference of what this might be from authForm
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  name: FieldPath<T>
  placeholder: string
  type?: string
  autoComplete?: string
  className?: string
}

const SearchInput = <T extends FieldValues>({ searchText, setSearchText, name, placeholder, type, autoComplete, className }: ISearchInputProps<T>) => {
  return (
    <div className="px-2 rounded-full bg-[#F5F5F5] focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 w-80 xl:w-110">
      <div className={cn('flex justify-center items-center', className)}>
        <MagnifyingGlassIcon classes="ml-1" />
        <Input
          id={name}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          className="h-12 shadow-none border-none focus-visible:border-rest-blue placeholder:text-gray-400 focus:placeholder:text-transparent focus-visible:ring-0"
        />
      </div>
    </div>
  )
}

export default SearchInput
