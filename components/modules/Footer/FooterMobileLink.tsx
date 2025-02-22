import Link from 'next/link'
import React from 'react'

const FooterMobileLink = ({ text }: { text: string }) => {
  return (
    <div className='footer__mobile'>
      <Link href='#'>{text}</Link>
    </div>
  )
}

export default FooterMobileLink
