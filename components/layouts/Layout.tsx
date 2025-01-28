'use client'
import Header from '../modules/header/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <div></div>
    </>
  )
}
export default Layout
