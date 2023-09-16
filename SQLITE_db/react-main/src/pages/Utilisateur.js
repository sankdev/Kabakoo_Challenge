// import { useState ,useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Avatar,Button,Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogContent, Container } from '@mui/material';

// //  import GetProfileUser from './GetProfileUser';
// import UserProfile from './UserProfile';
// import { fetchUsers, updateUser, selectUsers, selectLoading, selectError, fetchUserDetails } from '../redux/slices/etudiantSlice';
// import GetProfileUser from './GetProfileUser';






// const UpdateUserForm = () => {
//   //  const [id, setId] = useState('');
//   // const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [nom, setNom] = useState('');
//   // const [role, setRole] = useState('');
//   // const [active, setActive] = useState('');
//   // const [user, setUser] = useState([]);
//   // const[Loading,setLoading]=useState()
//   const [openDialog, setOpenDialog] = useState(false);

//   const dispatch=useDispatch()
//   useEffect(() => {
//     dispatch(fetchUsers());
//     // dispatch(fetchUserDetails())
//   }, [dispatch]);
//   const users = useSelector((state)=>state.etud.users);
//   // const utilisateur=useSelector((state)=>state.list)
//   console.log("listesUsers",users)
//   // console.log("utilisateur",utilisateur)


//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   // const { id: userId  } = useParams();
//   // console.log('UserId',id)
//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const response = await fetch(`http://localhost:3001/app/all-user`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       const data = await response.json();
//   //       console.log("UserData",data)
//   //       setUser(data.allUser);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchUsers();
//   // }, []);
  
 
//   // const handleUpdateUser = async () => {
//   //   try {
//   //     const response = await fetch(`http://localhost:3001/app/updateuser/${userId}`, {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify({ nom, email, password }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       // Mettre à jour l'état ou effectuer d'autres actions en cas de réussite
//   //       console.log(data);
//   //     } else {
//   //       // Gérer les erreurs en cas d'échec
//   //       console.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   // // await updateUser(id, email, password, nom, role, active);
 
//   // };

//   return (
//     <>
  
//     <div>
//     <Container> <GetProfileUser/></Container>
    
//     <TableContainer>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Name</TableCell>
//           <TableCell>Email</TableCell>
//           <TableCell>Role</TableCell>
//           <TableCell>Status</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
        
//       {Array.isArray(users) && users.map((item, ids) => (
//         <TableRow key={ids}>
//           <TableCell>{item?.nom}</TableCell>
//           <TableCell>{item?.email}</TableCell>
//           <TableCell>{item.role }</TableCell>
//           <TableCell>{item?.active ? "Active":"Inactive" }</TableCell>
//         </TableRow>
//       ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
//   </div>
  
//   <Button variant="contained" onClick={handleOpenDialog}>
//         Ouvrir le formulaire de mise à jour
//       </Button>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogContent>
//           <UserProfile />
//         </DialogContent>
//       </Dialog>
      
//     </>
//   );

// };

// export default UpdateUserForm;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Avatar,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Container,
} from '@mui/material';

import GetProfileUser from './GetProfileUser';
import UserProfile from './UserProfile';
import { fetchUsers, updateRoleUser } from '../redux/slices/etudiantSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  table: {
    marginBottom: theme.spacing(2),
  },
  updateUserButton: {
    marginTop: theme.spacing(2),
  },
}));

const UpdateUserForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const token=localStorage.getItem("token")

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const users = useSelector((state)=>state.etud.users);
  console.log("listesUsers",users)


  const handleUpdateRole = () => {
    if (selectedUser && newRole) {
      dispatch(updateRoleUser({ id:selectedUser.id, role: newRole , token}));
      // Réinitialisez les valeurs sélectionnées après la mise à jour réussie si nécessaire
      setSelectedUser(null);
      setNewRole('');
    }
  };
  const handleBlockUser = async (userId) => {
    if (userId) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`http://localhost:3001/app/block/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the selected user's status to 'Inactive'
        setSelectedUser((prevUser) => ({ ...prevUser, active: false }));
        setIsBlocked(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    if (userId) {
      // Make API request to unblock user
      const token = localStorage.getItem('token');
      try {
        await fetch(`http://localhost:3001/app/unblock/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the selected user's status to 'Active'
        setSelectedUser((prevUser) => ({ ...prevUser, active: true }));
        setIsBlocked(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container className={classes.container}>
        <GetProfileUser />
      </Container>
      <Typography sx={{ textAlign: 'center', color: 'blue', fontSize: '28px', alignItems: 'center' }}>
  LISTES DES USERS
</Typography>

      <TableContainer className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.nom}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>  <div>
                  
                  <Button variant="outlined" onClick={() => handleBlockUser(item.id)}>
                    Debloquer
                  </Button>
                  <Button variant="outlined" onClick={() => handleUnblockUser(item.id)}>
                    Bloquer
                  </Button>
                </div></TableCell>

                  <TableCell>
                  {selectedUser === item ? (
                    <div>
                      <Typography variant="h5">Modifier le rôle de {item.nom}</Typography>
                      <TextField
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Nouveau rôle"
                      />
                      <Button variant="outlined" onClick={handleUpdateRole}>
                        Mettre à jour le rôle
                      </Button>
                      <Button variant="outlined" onClick={() => setSelectedUser(null)}>
                      Close
                    </Button>
                     
                    </div>
                    
                  ) : (
                    <Button variant="outlined" onClick={() => setSelectedUser(item)}>
                      Modifier le rôle
                    </Button>
                    
                  )}
                </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body2" component="div" style={{color:'red'}}>
                    Aucun utilisateur trouvé.
                    Seuls Les Administrateurs Peuvent Consulter
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
     
      <Button variant="contained" onClick={handleOpenDialog} className={classes.updateUserButton}>
        UPDATE USER
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <UserProfile />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUserForm;
