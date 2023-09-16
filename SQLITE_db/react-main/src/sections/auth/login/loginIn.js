// import React,{useState,useEffect} from 'react';
// import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import { useDispatch ,useSelector} from 'react-redux';
// import {  json, useNavigate } from 'react-router-dom';
// import { setLoading,setError,setUser ,login,selectUser, selectLoading} from '../../../redux/slices/testUserSlice';
// import Iconify from '../../../components/iconify';

// // import { logout } from '../../../redux/slices/testUserSlice';

// const LoginIn = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const user = useSelector((state)=>state.test);
//   const loading=useSelector(selectLoading)
//   console.log("selectUser",user)
//   console.log("selecLoadingr",loading)

//   const handleEmailChange=(e)=> {
//     setEmail(e.target.value);
//   }

//  const navigate=useNavigate()
//   const handlePasswordChange=(e) =>{
//     setPassword(e.target.value);
//   }
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     dispatch(setLoading(true));
  
//     try {
//       const result = await dispatch(login({ email, password }));
//       if (result.meta.requestStatus === 'fulfilled') {
//         navigate('/dashboard/app');
//       }
//     } catch (error) {
//       dispatch(setError(error.message));
//     }
//   };
  
  
//   // useEffect(() => {
//   //   if (!loading && user) {
//   //     navigate('/dashboard/app');
//   //   }
//   // }, [loading ,user]);
  
//   // Reste de votre code...
  
    
  
//   // useEffect(() => {
//   //   if (user) {
//   //     navigate('/dashboard/app');
//   //   }
//   // }, [user]);
//   // const handleLogin = async (event) => {
//   //   event.preventDefault();

//   //   dispatch(setLoading());

//   //   try {
//   //     const response = await fetch('http://localhost:3001/app/login', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     const data = await response.json();
//   //    console.log(response)
//   //     if (response.ok) {
//   //       localStorage.setItem('token', data.token);
//   //       // localStorage.setItem('userId', data.allUser.id)
//   //       localStorage.setItem('user', JSON.stringify(data.nom));
//   //       localStorage.setItem('user',JSON.stringify(json))
//   //       dispatch(setUser(data.user));

//   //       navigate('/dashboard/app')
//   //     } else {
//   //       dispatch(setError(data.message));
//   //     }
//   //   } catch (error) {
//   //     dispatch(setError(error.message));
//   //   }
//   // };

//   return (
//     <>
//       <Stack spacing={3}>
//         <TextField name="email" label="Email address"
//         value={email}
//         onChange={handleEmailChange}
//         />

//         <TextField
//           name="password"
//           label="Password"
//           value={password}

//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           onChange={handlePasswordChange}
//         />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//         <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover" to='/dashboard/app'>
//           Forgot password?
//         </Link>
//       </Stack>
    
//       <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
//         Login
//       </LoadingButton>
//     </>
//   );
// };
// export default LoginIn
import React, { useState } from 'react';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading, setError, setUser, login, selectLoading } from '../../../redux/slices/testUserSlice';
import Iconify from '../../../components/iconify';


const LoginIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      const result = await dispatch(login({ email, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard/app');
        toast.success('Login successful!');
      }
    } catch (error) {
     dispatch(setError(error.message));
     // console.log('errorLoading',setError)
      toast.error('Login failed. Please try again.', { position: toast.POSITION.BOTTOM_LEFT});
     
    
    
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handlePasswordChange}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" to="/dashboard/app">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>

      <ToastContainer position="top-center" />
    </>
  );
};

export default LoginIn;
