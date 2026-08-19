import Link from 'next/link'
import NewTagBox from './NewTagBox'
import PlayIcon from './icons/Play'
import GraphIcon from './icons/Graph'
import FriendPlusIcon from './icons/FriendPlus'
import BookmarkIcon from './icons/Bookmarks'
import FriendGroupIcon from './icons/FriendGroup'
import ConsoleIcon from './icons/Console'
import FloppyDiskIcon from './icons/FloppyDisk'
import CogIcon from './icons/Cog'
import { cn } from '@/lib/utils'

const ExploreMenu = () => {
  const exploreMenuItems = [
    {
      icon: <PlayIcon classes="mr-3.5" />,
      title: 'Leading',
      new: true,
      link: '/learning'
    },
    {
      icon: <GraphIcon classes="mr-3.5" />,
      title: 'Insights',
      new: false,
      link: '/insights'
    },
    {
      icon: <FriendPlusIcon classes="mr-3.5" />,
      title: 'Find friends',
      new: false,
      link: '/find-friends'
    },
    {
      icon: <BookmarkIcon classes="mr-3.5" />,
      title: 'Bookmarks',
      new: false,
      link: '/bookmarks'
    },
    {
      icon: <FriendGroupIcon classes="mr-3.5" />,
      title: 'Group',
      new: false,
      link: '/friend-groups'
    },
    {
      icon: <ConsoleIcon classes="mr-3.5" />,
      title: 'Gaming',
      new: true,
      link: '/gaming'
    },
    {
      icon: <CogIcon classes="mr-3.5" />,
      title: 'Settings',
      new: false,
      link: '/settings'
    },
    {
      icon: <FloppyDiskIcon classes="mr-3.5" />,
      title: 'Save post',
      new: false,
      link: '/save-post'
    }
  ]

  return (
    <>
      {exploreMenuItems.map((exploreMenuItem, index) => (
        <div key={index} className={cn(`flex justify-between items-center`, index === exploreMenuItems.length - 1 ? '' : 'mb-6')}>
          <Link href={exploreMenuItem.link} className="flex items-center text-base text-muted2 font-medium">
            {exploreMenuItem.icon}
            {exploreMenuItem.title}
          </Link>
          {exploreMenuItem.new && <NewTagBox />}
        </div>
      ))}
    </>
  )
}

export default ExploreMenu
