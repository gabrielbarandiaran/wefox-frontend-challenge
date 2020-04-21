import React from 'react'
import logo from 'assets/images/logo/logo192.png'

export const Header: React.FC = () => {
  return(
    <nav>
      <img src={logo} alt="Logo" />
    </nav>
  )
}