'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from '../modules/header/Header'
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800)
  return (
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <div></div>
    </>
  )
}
export default Layout
