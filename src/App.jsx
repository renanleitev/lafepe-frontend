import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import EstoquesTable from './pages/Estoque/EstoquesTable';
import Footer from './components/Footer/Footer';
import store, { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <EstoquesTable />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
