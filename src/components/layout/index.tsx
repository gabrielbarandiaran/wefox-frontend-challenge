import React from 'react'
import {Helmet} from 'react-helmet'
// Components
import { Header } from 'components/header'
// Styles
import 'assets/scss/global.scss'
import 'normalize-scss'

export const Layout: React.FC = ({children}) => {
  return (
    <div>
      <Helmet>
          <title>Sweet Spot</title>
          <meta name="ABC" content="ABC" />
          <link rel="icon" type="image/png" href="assets/images/logo/favicon.ico" sizes="16x16" />
      </Helmet>

      <Header />
      {children}

    </div>
  )
}