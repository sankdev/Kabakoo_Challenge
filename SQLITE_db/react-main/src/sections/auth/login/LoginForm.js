import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui


import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../../redux/slices/userSlice'
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
 
  
  const handleEmailChange=(e)=> {
    setEmail(e.target.value);
  }

  const handlePasswordChange=(e) =>{
    setPassword(e.target.value);
  }

  const handleClick = (e) => {
   
    e.preventDefault();

    dispatch(login({ email, password }))
   
    
    
     
    
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"
        value={email}
        onChange={handleEmailChange}
        />

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
        <Link variant="subtitle2" underline="hover" to='/dashboard/app'>
          Forgot password?
        </Link>
      </Stack>
    
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
