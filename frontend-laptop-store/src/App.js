import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import Cart from './pages/Cart.js';
import Profile from './pages/Profile.js';
import History from './pages/History.js';
import Invoice from './pages/Invoice.js';
import Detail from './pages/Detail.js';
import Admin from './pages/Admin';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';
function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signin' element={user ? <Navigate to='/' /> : <SignIn />} />
        <Route exact path='/signup' element={user ? <Navigate to='/' /> : <SignUp />} />
        <Route exact path='/cart/:id' element={<Cart />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/history' element={<History />} />
        <Route exact path='/invoice/:id' element={<Invoice />} />
        <Route exact path='/item/:id' element={<Detail />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/admin/create-product' element={<CreateProduct />} />
        <Route exact path='/admin/update-product/:id' element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
