const AuthCard = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <section className="bg-white p-12 rounded-md mt-3.75 lg:mt-0">{children}</section>
    </>
  )
}

export default AuthCard
