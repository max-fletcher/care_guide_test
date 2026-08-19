import { auth } from '@/auth'
import ExploreMenu from '@/components/ExploreMenu'
import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu'
import { ROOT } from '@/lib/routes'
import { redirect } from 'next/navigation'

type TInterestGroup = {
  interest: string
  count: number
  users: { _id: string; name: string; email: string }[]
}

const InterestPage = async () => {
  const session = await auth()
  const accessToken = session?.user.accessToken
  const role = session?.user.role
  if (role !== 'admin') redirect(ROOT)

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/group-by-interests`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }).then((r) => r.json())

  const groups = data.response.data.usersGroupedByInterest as TInterestGroup[]

  return (
    <>
      <Navbar />
      <div className="px-2 lg:px-10 xl:px-16 min-[1400px]:px-28! py-6">
        <div className="w-full grid grid-cols-12 gap-3 my-3">
          <div className="col-span-3 hidden lg:block">
            <SideMenu title="Explore">
              <ExploreMenu />
            </SideMenu>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <SideMenu>
              <h1 className="text-xl font-semibold mb-4">User grouped by interest</h1>
              {groups.map((group) => (
                <div key={group.interest} className="mb-6">
                  <h2 className="font-medium">
                    {group.interest}
                    <span className="ml-2 w-5 h-5 inline-flex justify-center items-center border border-white p-1 text-xs font-light text-white bg-rest-blue rounded-full">
                      {group.count}
                    </span>
                    {/* <span className="text-sm rounded-xl bg-amber-500 text-white">{group.count}</span> */}
                  </h2>
                  <ul className="ml-4 list-desc">
                    {group.users.map((user) => (
                      <li key={user._id} className="my-2">
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </SideMenu>
          </div>
          <div className="col-span-3 hidden lg:block">
            <SideMenu>
              <div>Left</div>
            </SideMenu>
          </div>
        </div>
      </div>
    </>
  )
}

export default InterestPage
