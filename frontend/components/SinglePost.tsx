'use client'
import { TNote } from '@/types/notes.types'
import { TPost } from '@/types/posts.types'

type TSinglePostProps = {
  post: TPost
  onEdit: (data: TPost | TNote) => void
  deleteData: (_id: string) => void
}

const SinglePost = ({ post, onEdit, deleteData }: TSinglePostProps) => {
  return (
    <>
      <div>
        <div className="flex">
          <div className="ml-3 mb-5">
            <h6 className="text-xl mb-1.5">{post.author}</h6>
            <p className="text-[14px] text-muted2"> {post.createdAt} . Public</p>
          </div>
        </div>
        <div className="mb-5">{post.title}</div>
        <div className="mb-5">{post.content}</div>
        <button className="p-2 mr-3 bg-amber-600 rounded" onClick={() => onEdit(post)}>
          Update
        </button>
        <button className="p-2 bg-red-600 rounded" onClick={() => deleteData(post._id)}>
          DELETE
        </button>
      </div>
    </>
  )
}

export default SinglePost
