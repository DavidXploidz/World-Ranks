import {HashRouter, Routes, Route} from 'react-router-dom'
import Layout from './layouts/Layout'
import App from './App'
import Country from './views/Country'

export default function AppRouter() {
  return (
    <HashRouter>
        <Routes>
          <Route element={ <Layout /> }>
            <Route path='/' element={ <App /> } index />
            <Route path='/country/:id' element={ <Country /> } />
          </Route>
        </Routes>
    </HashRouter>
  )
}