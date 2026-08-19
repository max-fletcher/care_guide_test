'use client'
import ExploreMenu from '@/components/ExploreMenu'
import FeedPostForm from '@/components/FeedPostForm'
import SideMenu from '@/components/SideMenu'
import { TPost } from '@/types/posts.types'
import { useSession } from 'next-auth/react'
import PostsList from './PostsList'
import { useRouter } from 'next/navigation'
import { EContentChangeMode, EContentType } from '@/types/content.type'
import { useState } from 'react'
import { TNote } from '@/types/notes.types'

const FeedContainer = ({ posts, type }: { posts: TPost[] | TNote[]; type: EContentType }) => {
  const [contentChangeMode, setContentChangeMode] = useState<EContentChangeMode>(EContentChangeMode.CREATE)
  const [editingData, setEditingData] = useState<TPost | TNote | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  function handleEditRequest(data: TPost | TNote) {
    setEditingData(data)
    setContentChangeMode(EContentChangeMode.UPDATE)
  }

  function resetForm() {
    setEditingData(null)
    setContentChangeMode(EContentChangeMode.CREATE)
    router.refresh() // Refetches server data without a full browser reload
  }

  async function handleCreatePost(title: string, content: string) {
    if (!session?.user) return

    const postData = {
      title,
      content,
      author: session.user.id
    }

    const accessToken = session?.user.accessToken
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${type}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(postData)
    })

    if (response.ok) resetForm()
  }

  async function handleUpdatePost(_id: string, title: string, content: string) {
    if (!session?.user) return

    const patchData = {
      title,
      content,
      author: session.user.id
    }

    const accessToken = session?.user.accessToken
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${type}/${_id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(patchData)
    })

    if (response.ok) resetForm()
  }

  async function handleDeletePost(_id: string) {
    if (!session?.user) return

    const accessToken = session?.user.accessToken
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${type}/${_id}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    // Refetches server data without a full browser reload
    if (response.ok) {
      resetForm()
      router.refresh() // Refetches server data without a full browser reload
    }
  }

  return (
    <>
      <div className="w-full grid grid-cols-12 gap-3 my-3">
        <div className="col-span-3 hidden lg:block">
          <SideMenu title="Explore">
            <ExploreMenu />
          </SideMenu>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <SideMenu>
            <FeedPostForm
              label="Write Someting"
              mode={contentChangeMode}
              editingData={editingData}
              handleCreatePost={handleCreatePost}
              handleUpdatePost={handleUpdatePost}
            />
          </SideMenu>
          {posts.length > 0 && <PostsList posts={posts} onEdit={handleEditRequest} deleteData={handleDeletePost} />}
        </div>
        <div className="col-span-3 hidden lg:block">
          <SideMenu>
            <div>Left</div>
          </SideMenu>
        </div>
      </div>
    </>
  )
}

export default FeedContainer
