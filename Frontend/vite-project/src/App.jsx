import React from 'react'
import {Route , Routes} from 'react-router-dom'
import PublicRoute from './route/PublicRoute'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductItems from './pages/ProductItems'
import NotFound from './component/NotFound'
const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound/>}/>
      <Route element={<PublicRoute/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product" element={<ProductPage/>}/>

        <Route path="product-detail/:id"  element={<ProductItems/>}/>
      </Route>
    </Routes>
  )
}

export default App