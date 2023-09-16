// routes
import React ,{useEffect} from 'react';
import { Route, Navigate, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Registerform from './sections/auth/login/RegisterForm';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SimpleLayout from './layouts/simple/SimpleLayout';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import PrivateRoute from './privateRoute';
import EtudImportExcel from './pages/EtudiantPage';
import Academie from './pages/Academie';
import Lycee from './pages/Lycee'
import TestListEtudiant from './pages/TestListEtudiant'
import UpdateUserForm from './pages/Utilisateur';
// import { selectUser, setUser } from './redux/slices/testUserSlice';

// ----------------------------------------------------------------------



export default function App() {
  const user = useSelector((state)=>state.test);
  const currentUser=useSelector((state)=>state.user)
  console.log('currentUSer',currentUser)
   console.log('user',user)
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        <Route path='/register' element={<Registerform/>}/>
        <Route path='/login' element={<LoginPage />} />
        {user ? (
          <Route path='dashboard/*' element={<DashboardLayout />}>
            <Route path='app' element={<DashboardAppPage />} />
            <Route path='user' element={<UserPage />} />
           <Route path='listeetudiant' element={<TestListEtudiant/>}/>
            <Route path='etudiant' element={<EtudImportExcel/>}/>
            <Route path='academie' element={<Academie/>}/>
            <Route path='lycee' element={<Lycee/>}/>
            <Route path='utilisateur' element={<UpdateUserForm/>}/>


          </Route>
        ) : (
          <Navigate to='/login' replace />
        )}
        <Route path='404' element={<Page404 />} />
        <Route path='*' element={ user ? <Navigate to='/login' />:<DashboardLayout />} />
      </Routes>
      <SimpleLayout/>
    </ThemeProvider>
  
  );
}
// <Route path='products' element={<ProductsPage />} />
// <Route path='blog' element={<BlogPage />} />