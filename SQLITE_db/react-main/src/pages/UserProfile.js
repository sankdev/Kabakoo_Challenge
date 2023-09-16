import { useState ,useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../redux/store/AuthContext';
import { fetchUsers, updateUser, selectUsers, selectLoading, selectError } from '../redux/slices/etudiantSlice';



function UserProfile({props}) {
   console.log("handleClose",props)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const dispatch = useDispatch();
  const userId=localStorage.getItem("userId")
  const token=localStorage.getItem("token")

 
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);


  const handleUpdateUser = ( ) => {
   
    dispatch(updateUser({ userId, token, nom, email, password }));
  };


  // const handleUpdateUser = async ({userId,token}) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/app/updateuser/${userId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ nom, email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Mettre à jour l'état ou effectuer d'autres actions en cas de réussite
  //       console.log(data);
  //     } else {
  //       // Gérer les erreurs en cas d'échec
  //       console.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div>
   
    <Container>
    <Typography variant="h2">Modifier l'utilisateur</Typography>
    <TextField
      label="Nom"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Mot de passe"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" onClick={handleUpdateUser}>
      Mettre à jour
    </Button>
  
  </Container>
 
    </div>
  );
}
export default UserProfile