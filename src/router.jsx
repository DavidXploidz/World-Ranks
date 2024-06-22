import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layouts/Layout'
import App from './App'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={ <Layout /> }>
            <Route path='/' element={ <App /> } index />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}