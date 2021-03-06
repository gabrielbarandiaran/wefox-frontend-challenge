import React from 'react';
import { Helmet } from 'react-helmet';
// Components
import Header from 'components/header';
// Image
import logo from 'assets/images/logo/logo192.png';
// Styles
import 'assets/scss/global.scss';
import 'normalize-scss';

const Layout: React.FC = ({children}) => {
  return (
    <div>
      <Helmet>
          <title>Sweet Spot</title>
          <meta name="ABC" content="ABC" />
          <link rel="icon" type="image/png" href={logo} sizes="16x16" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
      </Helmet>

      <Header />
      {children}

    </div>
  )
}

export default Layout;