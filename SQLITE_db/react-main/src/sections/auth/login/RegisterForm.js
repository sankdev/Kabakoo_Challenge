import React,{useState} from 'react';

import {  Stack, IconButton, InputAdornment, TextField, Checkbox ,Container}
 from '@mui/material';

import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import {  useNavigate ,Link} from 'react-router-dom';
import { setLoading,setError,setUser,postUser } from '../../../redux/slices/testUserSlice';
import Iconify from '../../../components/iconify'


const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

const Registerform = () => {
    
 
  // const [formData,setFormData]=useState(initialAuth)
  const [nom,setNom]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState()
  const [email,setEmail]=useState()

  const [showPassword, setShowPassword] = useState(false);
   const dispatch=useDispatch()
   const navigate=useNavigate()
  
   const handleEmailChange=(e)=> {
    setEmail(e.target.value);
  }
  const handleNomChange=(e)=> {
    setNom(e.target.value);
  }  
  const handleRoleChange=(e)=> {
    setRole(e.target.value);
  } 
   const handlePasswordChange=(e)=> {
    setPassword(e.target.value);
  }
    // const handleChange=(e)=>{
    //   setFormData({...formData , [e.target.name]:[e.target.value]})
    //  }

     const handleRegister = async (event) => {
      event.preventDefault();
  
      dispatch(setLoading());
  
      try {
        const response = await fetch('http://localhost:3001/app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({nom,password,role,email}),
        });
  
        const data = await response.json();
       console.log(response)
        
          dispatch(postUser(data));
          navigate('/login')
        
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
  

  return (
    
    <> 
    <Container maxWidth="sm">
    <StyledContent>
       <h2> Registration</h2>
      <Stack spacing={3}>
      <TextField name="nom" label="Nom et Prenom"
        value={nom}
        onChange={handleNomChange}
        />
        <TextField name="email" label="Email address"
        value={email}
        onChange={handleEmailChange}
        />
      
        <TextField name="role" label="role"
        value= { role}
        onChange={handleRoleChange}
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
     
     
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 4 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" to='/login'>
          Avez vous  deja un Compte? Clique Ici
        </Link>
      </Stack>
    
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegister}>
        Register
      </LoadingButton>
      </StyledContent>
      </Container>
    </>
  )


}

export default Registerform
