'use client'
import { TPost } from '@/types/posts.types'
import SideMenu from './SideMenu'
import SinglePost from './SinglePost'
import { TNote } from '@/types/notes.types'

type TPostsListProps = {
  posts: TPost[]
  onEdit: (data: TPost | TNote) => void
  deleteData: (_id: string) => void
}

const PostsList = ({ posts, onEdit, deleteData }: TPostsListProps) => {
  return (
    <>
      {posts.map((post) => (
        <SideMenu key={post._id}>
          <SinglePost key={post._id} post={post} onEdit={onEdit} deleteData={deleteData} />
        </SideMenu>
      ))}
    </>
  )
}

export default PostsList
