'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { TUser } from '@/types/users.types'

const UsersTable = ({ users, total, limit, currentPage }: { users: TUser[]; total: number; limit: number; currentPage: number }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const accessToken = session?.user.accessToken

  async function toggleRole(user: TUser) {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user._id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ role: newRole })
    })
    if (res.ok) router.refresh()
  }

  async function deleteUser(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    if (res.ok) router.refresh()
  }

  function goToPage(page: number) {
    router.push(`/admin/users?page=${page}`)
  }

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Interests</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{(u.interests || []).join(', ')}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => toggleRole(u)}>Make {u.role === 'admin' ? 'user' : 'admin'}</button>
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        <button disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  )
}

export default UsersTable
