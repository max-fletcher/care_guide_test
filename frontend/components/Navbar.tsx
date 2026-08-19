'use client'
import SearchInput from '@/components/SearchInput'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import HomeIcon from './icons/Home'
import UserGroupIcon from './icons/UserGroup'
import BellIcon from './icons/Bell'
import SpeechBubbleIcon from './icons/SpeechBubble'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import MagnifyingGlassIcon from './icons/MagnifyingGlass'
import ArrowDownIcon from './icons/ArrowDown'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: userSession } = useSession()
  const [searchText, setSearchText] = useState('')

  const pathname = usePathname()

  return (
    <>
      <div className="sticky top-0 z-50 w-full h-auto bg-white px-2 lg:px-10 xl:px-16 min-[1400px]:px-28!">
        {/* lg:max-w-290 xl:max-w-325 */}
        <div className="flex items-center justify-between mx-auto">
          <div className="mx-2 my-4">
            <Image className="w-40 h-auto" src="/icons/logo.svg" width={150} height={150} alt="Logo" />
          </div>

          <div className="w-full ml-auto hidden lg:flex items-center">
            <div className="mr-4 ml-auto">
              <SearchInput searchText={searchText} setSearchText={setSearchText} name="search" placeholder="input search text" type="text" className="h-12" />
            </div>
            <ul className="flex justify-center items-center mr-4 ml-auto">
              <li className={cn(`px-4 py-7 mx-1 xl:mx-3 border-rest-blue`, pathname === '/posts' && 'border-b-3')}>
                <Link href={'/posts'} className="" aria-current="page">
                  <HomeIcon isActive={pathname === '/posts'} />
                </Link>
              </li>
              <li className={cn(`px-4 py-7 mx-1 xl:mx-3 border-rest-blue`, pathname === '/friends' && 'border-b-3')}>
                <Link href={'/posts'} className="" aria-current="page">
                  <UserGroupIcon isActive={pathname === '/friends'} />
                </Link>
              </li>
              <li className="px-4 py-7 mx-1 xl:mx-3 border-rest-blue relative">
                <span className="absolute top-6.5 right-4.5 w-5 h-5 inline-flex justify-center items-center border border-white p-1 text-xs font-light text-white transform translate-x-1/2 -translate-y-1/2 bg-rest-blue rounded-full">
                  6
                </span>
                <BellIcon />
              </li>
              <li className={cn(`px-4 py-7 mx-1 xl:mx-3 border-rest-blue relative`, pathname === '/chat' && 'border-b-3')}>
                <span className="absolute top-6.5 right-4.5 w-5 h-5 inline-flex justify-center items-center border border-white p-1 text-xs font-light text-white transform translate-x-1/2 -translate-y-1/2 bg-rest-blue rounded-full">
                  2
                </span>
                <Link href={'/posts'} aria-current="page">
                  <SpeechBubbleIcon isActive={pathname === '/chat'} />
                </Link>
              </li>
            </ul>
            <div className="flex items-center">
              <Image
                className="w-10 mr-3 rounded-full border-2 border-rest-blue"
                src={userSession?.user.avatar ?? `/images/avatars/people1.png`}
                width={150}
                height={150}
                alt="Profile avatar"
              />
              <p>
                {userSession?.user.firstName} {userSession?.user.lastName}
              </p>
              <button className="ml-3">
                <ArrowDownIcon />
              </button>
            </div>
          </div>
          <div className="block lg:hidden mr-4">
            <MagnifyingGlassIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
