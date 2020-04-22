import React from 'react'
import { Provider } from 'react-redux'
import { Layout } from 'components/layout'
import AppRouter from 'router'
import { store } from 'redux/store/configureStore'

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