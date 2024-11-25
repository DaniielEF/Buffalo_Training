
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import AppRoutes from './routes/AppRoutes.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)
