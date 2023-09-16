
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';





// ----------------------------------------------------------------------

export default function Router() {
 
  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);
 
  // return routes;
  const routes = (
    <Routes>
      <Route path='/dashboard/*' element={<DashboardLayout />}>
        <Route path='app' element={<DashboardAppPage />} />
        <Route path='user' element={<UserPage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='blog' element={<BlogPage />} />
        <Navigate to='app' replace />
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route element={<SimpleLayout />}>
        <Route path='404' element={<Page404 />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Route>
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
  return routes

}
