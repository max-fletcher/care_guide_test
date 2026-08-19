import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import UsersTable from '@/components/UsersTable'
import { ROOT } from '@/lib/routes'
import { TUser } from '@/types/users.types'
import { redirect } from 'next/navigation'

const UsersPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const session = await auth()
  const accessToken = session?.user.accessToken
  const role = session?.user.role
  if (role !== 'admin') redirect(ROOT)

  const { page = '1' } = await searchParams
  const params = new URLSearchParams({ page, limit: '10', orderBy: 'createdAt', order: 'desc' })

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?${params.toString()}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then((r) => r.json())

  const { total, limit } = data.response.data.users
  const users = data.response.data.users.items as TUser[]

  return (
    <>
      <Navbar />
      <div className="px-2 lg:px-10 xl:px-16 min-[1400px]:px-28! py-6">
        <h1 className="text-xl font-semibold mb-4">Manage Users</h1>
        <UsersTable users={users} total={total} limit={limit} currentPage={Number(page)} />
      </div>
    </>
  )
}

export default UsersPage
