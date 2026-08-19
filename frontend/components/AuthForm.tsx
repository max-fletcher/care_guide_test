'use client'
import { TAuthType } from '@/constants/enums'
// import { Loader2 } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TAuthForm, LoginSchema, RegistrationSchema, TRegistrationNextAuthData } from '@/lib/schema/authForm.schema'
import CustomInput from './CustomInput'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import CustomCheckbox from './CustomCheckbox'
import { cn } from '@/lib/utils'

const AuthForm = ({ type }: { type: TAuthType }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { status } = useSession()

  // Redirect logged-in users away from this page
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/posts')
    }
  }, [status, router])

  const isRegistration = type === TAuthType.REGISTRATION

  const formSchema = isRegistration ? RegistrationSchema : LoginSchema
  // 1. Define your form.
  const form = useForm<TAuthForm>({
    resolver: zodResolver(formSchema) as Resolver<TAuthForm>,
    defaultValues: (isRegistration
      ? {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTermsAndConditions: true
        }
      : { email: '', password: '', rememberMe: true }) as TAuthForm
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: TAuthForm) => {
    setError(null)
    setIsLoading(true)
    try {
      // Sign up or sign in using next-auth's signIn function
      let res
      if (isRegistration) {
        const { name, email, password, confirmPassword, isRegistration } = data as TRegistrationNextAuthData
        res = await signIn('credentials', {
          redirect: false,
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          isRegistration: isRegistration,
          callbackUrl: '/posts'
        })

        // console.log('reg responses', res)
      } else {
        const { email, password } = data
        res = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password,
          callbackUrl: '/posts'
        })

        // console.log('login responses', res)
      }
      // Navigate to homepage if logged in
      if (res?.ok) router.push(res?.url || '/posts')
      else throw new Error(res?.error || 'Invalid credentials')
    } catch (error: unknown) {
      // console.log('onSubmit error', error)

      if (error instanceof Error) {
        setError(error.message?.replace(/^Error:\s*/, '') || 'Something went wrong')
      } else {
        setError('Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header className="flex flex-col text-center">
        {/* auth logo */}
        <div className="max-w-40.25 mb-7 mx-auto">
          <Image className="object-cover w-full h-auto" src="/icons/logo.svg" width={1176} height={868} alt="Logo" />
        </div>
        {/* register content para */}
        <p className="font-normal text-auth-form-title font-poppins leading-[1.4] mb-2">{isRegistration ? 'Get Started Now' : 'Welcome back'}</p>
        {/* register title */}
        <h4 className="text-[22px] 2xl:text-[28px] font-medium text-auth-form-title font-poppins mb-12.5">{isRegistration ? 'Registration' : 'Login to your account'}</h4>
        <div className="flex flex-col items-center">
          <Button className="flex items-center rounded-md lg:max-w-full bg-white border-1px border-background text-[13px] xl:text-base font-medium text-auth-form-title font-poppins px-15 py-5.5 mb-10 hover:bg-white hover:cursor-pointer">
            <Image
              src="/icons/google.svg"
              width={100}
              height={100}
              alt="Google"
              // xl:w-full
              className="w-5 h-5 xl:w-8 xl:h-5.5 pt-0.5 hidden min-[350px]:block lg:hidden xl:block"
            ></Image>
            {isRegistration ? 'Register with google' : 'Or sign-in with google'}
          </Button>
        </div>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1.8px] flex-1 bg-or-streak" />
          <span className="text-or-streak font-medium">Or</span>
          <div className="h-[1.8px] flex-1 bg-or-streak" />
        </div>
      </header>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {isRegistration && (
          <>
            <CustomInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter your name"
              type="text"
              className="mb-3"
              labelClassName="flex justify-center lg:block"
            />
          </>
        )}
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
          className="mb-3"
          labelClassName="flex justify-center lg:block"
        />
        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          className="mb-3"
          labelClassName="flex justify-center lg:block"
        />
        {isRegistration && (
          <>
            <CustomInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter password"
              type="password"
              className="mb-3"
              labelClassName="flex justify-center lg:block"
            />
          </>
        )}

        <div className={cn('mb-10 mt-4 grid justify-center xl:justify-start', !isRegistration ? 'grid-cols-2 gap-5' : '')}>
          <CustomCheckbox
            control={form.control}
            name={isRegistration ? 'agreeToTermsAndConditions' : 'rememberMe'}
            label={isRegistration ? 'I agree to terms & conditions' : 'Remember me'}
            labelClassName={cn('text-xs xl:text-nowrap', isRegistration ? 'min-[1400px]:text-base' : 'xl:text-sm')}
          />

          {!isRegistration && (
            <Link href="/register" className="text-rest-blue text-xs xl:text-sm text-end xl:text-start min-[1280px]:text-nowrap 2xl:text-end ps-5 xl:ps-0">
              Forgot password?
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mb-15 mt-10px">
          <Button type="submit" className="min-w-50 lg:w-full bg-rest-blue text-base font-semibold py-6.5 hover:bg-rest-blue hover:cursor-pointer" disabled={isLoading}>
            Login now
          </Button>
        </div>

        {/* <Button type="button" className="form-btn" onClick={() => signIn('github', { callbackUrl: '/posts' })}>
          Sign in with GitHub
        </Button> */}
      </form>

      <section>
        <footer className="flex justify-center">
          <p className="text-sm font-normal text-gray-500">
            {!isRegistration ? "Don't have an account?" : 'Already have an account ?'}
            <Link href={isRegistration ? 'login' : 'registration'} className="ps-1 text-rest-blue">
              {type === TAuthType.REGISTRATION ? 'Sign In' : 'Create an account'}
            </Link>
          </p>
        </footer>
      </section>
    </>
  )
}

export default AuthForm
