import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from './services/history';
import Footer from './components/Footer/Footer';
import store, { persistor } from './store';
import RoutesController from './routes';
import Header from './components/Header/Header';
import GlobalStyle from './config/GlobalStyle';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter history={history}>
          <Header />
          <RoutesController />
          <GlobalStyle />
          <Footer />
          <ToastContainer autoClose={3000} className="toast-container" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
