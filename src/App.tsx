import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'redux/store/configureStore'
import AppRouter from 'router'
import { Layout } from 'components/layout'

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