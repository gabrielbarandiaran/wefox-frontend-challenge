import React from 'react'
import Helmet from 'react-helmet'
import 'assets/scss/global.scss'

interface LayoutProps {
  titleExtension: string;
}

export const Layout: React.FC<LayoutProps> = (props, {children}) => {
  return (
    <div>
      <Helmet>
          <title>Sweet Spot | {props.titleExtension}</title>
          <meta name="ABC" content="ABC" />
          <link rel="icon" type="image/png" href="assets/images/logo/favicon.ico" sizes="16x16" />
      </Helmet>

      {children}

    </div>
  )
}