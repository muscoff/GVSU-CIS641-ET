import MyProvider from './MyProvider';
import AppRouter from './AppRouter';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <MyProvider>
      <AppRouter />
      <Toaster 
        position='top-right'
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
    </MyProvider>
  );
}

export default App;
