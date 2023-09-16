import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography ,Avatar} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { fetchUserDetails } from '../redux/slices/getUserSlice';


const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '200px',
    height: '200px',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  nom: {
    fontSize: '28px',
    fontWeight: 'bold',
    color:'blue'
  },
  email: {
    fontSize: '20px',
    color:'blue'
  },
  role: {
    fontSize: '20px',
    color:'green'
  },
}));


const GetProfileUser = () => {

    const dispatch=useDispatch()
    useEffect(() => {
      
      dispatch(fetchUserDetails())
    }, [dispatch]);

    const utilisateur=useSelector((state)=>state.list.userDetails)
    console.log("getUSerUtilisateur",utilisateur)
    const classes = useStyles();

  return (
    <div>
    

    <Grid>
    {utilisateur.length > 0 ? (
      utilisateur.map((item, ids) => (
        <div key={ids}>
        
        <Typography variant="body2" component="div" className={classes.nom}>
        Nom : {item.nom}
      </Typography>
      <Typography className={classes.email}>Email: {item.email}</Typography>
      <Typography className={classes.role}>Role: {item.role}</Typography>
      
        </div>
      ))
    ) : (
      <Typography>Aucun utilisateur trouvé.</Typography>
    )}
  </Grid>
  

    
    </div>
  )
}

export default GetProfileUser
