import AuthForm from '@/components/AuthForm'
import AuthCard from '@/components/AuthCard'
import { TAuthType } from '@/constants/enums'
import AuthLayout from '@/components/AuthLayout'

const Login = () => {
  return (
    <>
      <AuthLayout type={TAuthType.LOGIN}>
        <AuthCard>
          <AuthForm type={TAuthType.LOGIN} />
        </AuthCard>
      </AuthLayout>
    </>
  )
}

export default Login
