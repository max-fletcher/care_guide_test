import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await auth()
  redirect(session ? '/notes' : '/login')
}

export default Home
