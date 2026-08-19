import { TAuthType } from '@/constants/enums'
import Image from 'next/image'

const AuthLayout = ({ children, type }: { children: React.ReactNode; type: TAuthType }) => {
  return (
    <>
      <div className="relative">
        <Image src="/svgs/shape1.svg" width={100} height={100} alt="shape1" className="absolute hidden lg:block w-40 z-1" />
        <Image src="/svgs/shape2.svg" width={100} height={100} alt="shape2" className="absolute hidden lg:block w-120 top-0 right-5 z-1" />
        <Image src="/svgs/shape3.svg" width={100} height={100} alt="shape3" className="absolute hidden lg:block w-130 bottom-0 right-0 z-1" />
        <div></div>
        <section className="py-12.5 md:py-25 flex justify-center align-center relative z-2">
          <div className="max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330 grid grid-cols-3 gap-4 md:gap-8 items-center p-3">
            <div className="col-span-3 lg:col-span-2">
              {type === TAuthType.REGISTRATION ? (
                <Image className="object-cover w-auto h-auto" src="/images/registration.png" width={1176} height={868} alt="registration image" />
              ) : (
                <Image className="object-cover w-auto h-auto" src="/images/login.png" width={1176} height={868} alt="login image" />
              )}
            </div>
            <div className="col-span-3 lg:col-span-1">{children}</div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AuthLayout
