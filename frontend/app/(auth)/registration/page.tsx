import AuthCard from '@/components/AuthCard'
import AuthForm from '@/components/AuthForm'
import AuthLayout from '@/components/AuthLayout'
import { TAuthType } from '@/constants/enums'

// export default signIn

const Registration = () => {
  return (
    <>
      <AuthLayout type={TAuthType.REGISTRATION}>
        <AuthCard>
          <AuthForm type={TAuthType.REGISTRATION} />
        </AuthCard>
      </AuthLayout>
    </>
  )
}

export default Registration
