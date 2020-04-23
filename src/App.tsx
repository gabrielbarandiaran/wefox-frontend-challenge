import React from 'react'
import AppRouter from 'router'
// Redux
import { Provider } from 'react-redux'
import { store } from 'redux/store/configureStore'
// Components
import Layout from 'components/layout'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <AppRouter />
      </Layout>
    </Provider>
  );
};

export default App;