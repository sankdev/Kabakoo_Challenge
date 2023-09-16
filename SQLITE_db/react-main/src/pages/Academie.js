import React, { useState,useEffect } from 'react';
import axios from 'axios';

import {Dialog, DialogTitle,DialogContent,DialogActions, Box, Grid,TextField,Button,Table, AppBar,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, styled, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Utilisateur from './Utilisateur';
// const { updateUser } = Utilisateur;



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
// const StickyHeader = styled(TableHead)(({ theme }) => ({
//   position: 'sticky',
//   top: '0px',
//   zIndex: theme.zIndex.drawer + 1,
//   backgroundColor: 'white',
// // }));

// 
const CustomTableHeaderCell = styled(TableCell)({
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'uppercase',
  });
  const CustomTableCell = styled(TableCell)({
    borderBottom: 'none',
    fontSize: '1rem',
    width: '150px', // Largeur des autres colonnes
    height: '1rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '&.codeControl': {
      width: '20%',
    },
    '&.matricule': {
      width: '20%',
    },
  });

  const StickyHeader = styled(AppBar)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
  }));

const Academie = () => {

    const classes = useStyles();
    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');
    const [ville, setVille] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ data, setData]=useState([])
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [editingId, setEditingId] = useState(-1);
    const [editedFields, setEditedFields] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const ITEMS_PER_PAGE = 3;
    const handleChangePage = (event, value) => {
      setPage(value);
    };
  
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;  

    const handleEditClick = (id) => {
      setEditingId(id);
      setEditedFields(data.find((row) => row.id === id));
      setDialogOpen(true);
      // console.log('academie',data)
      // console.log('editAcad',setEditedFields)
    };
    const handleClose = () => {
      setEditingId(null);
      setEditedFields({});
      setDialogOpen(false);
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    };

    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post('http://localhost:3001/app/importacad', formData)
        .then(response => {
          console.log(response);
          alert('Fichier importé avec succès');
        })
        .catch(error => {
          console.log(error);
          alert('Une erreur s\'est produite lors de l\'importation du fichier');
        });
    };
  
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('http://localhost:3001/app/getacad');
          setData(result.data);
        };
        fetchData();
      }, []);
  
      // const fetchData = async () => {
      //   const result = await axios.get('http://localhost:3001/app/getacad');
      //   setData(result.data);
      // };
    
      // const handleClickOpen = () => {
      //   setOpen(true);
      //   fetchData();
      // };
    
      // const handleClose = () => {
      //   setOpen(false);
      // };
      const handleFieldChange = (e, fieldName) => {
        setEditedFields({ ...editedFields, [fieldName]: e.target.value });
      };

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const data = {
         nom,
         code,
         ville,
         adresse
      };
  
      axios.post('http://localhost:3001/app/posteacad', data)
        .then(response => {
          console.log(response);
          alert('Données enregistrées avec succès');
          setNom('');
          setCode('');
          setVille('');
          setAdresse('');
        })
        .catch(error => {
          console.log(error);
          alert('Une erreur s\'est produite lors de l\'enregistrement des données');
        });
    };
    // update academie 
    const handleSave = () => {
      fetch(`http://localhost:3001/app/updateacad/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedFields)
      })
        .then(response => response.json())
        .then(dat => {
          setData(data.map(academie => {
            if (academie.id === editingId) {
              return { ...academie, ...editedFields };
            }
            return academie;
          }));
          setEditingId(null);
          setEditedFields({});
          setDialogOpen(false);
        })
        .catch(error => console.error(error));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const inputData = {
          nom: setNom,
          code: setCode,
          ville: setVille,
          adresse: setAdresse
        };
      
        inputData[name](value);
      };
      
      // const handleEdit = (id) => {
      //   setEditingId(id);
      //   setEditedFields({ ...editedFields, [id]: '' });
      // };
      // delete 
      const handleDelete = (id) => {
        fetch(`http://localhost:3001/app/deleteacad/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((dat) => {
            setData(data.filter((etudiant) => etudiant.id !== id));
          })
          .catch((error) => console.log(error));
      };

  return (
    <div>
    <Box>
    <input type="file" accept=".xlsx" onChange={handleFileInputChange} />

    
    
    <Box component="form" className={classes.root} onSubmit={handleFormSubmit} sx={{ mt: 5 }}>
    <Typography variant="subtitle2" style={{ padding: '10px', margin: '10px', alignContent: 'center', color: 'green', fontSize: "40px" }}> Ajout des Academies</Typography>
      <TextField id="nom" name="nom" label="Nom" value={nom} onChange={handleInputChange}  />
      <TextField id="code" name="code" label="Code Academie" value={code} onChange={handleInputChange}  />
      <TextField id="ville" name="ville" label="Ville" value={ville} onChange={handleInputChange}  />
      <TextField id="adresse" name="adresse" label="Adresse" value={adresse} onChange={handleInputChange}  />
      <Box style={{ margin:'10px',padding: '10px'}}>
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Enregistrer
      </Button>
      </Box>
    </Box>
    
    
  </Box>
  <Grid container spacing={1}>
      <Grid item style={{ padding: '5px', margin: '5px' }}>
        <Box sx={{ width: '100%' }}>
          <StickyHeader>
            <Typography variant="subtitle2" style={{ padding: '5px', margin: '10px', alignContent: 'center', color: 'green', fontSize: "40px" }}> Liste des Academies </Typography>
          </StickyHeader>
          <Box sx={{ width: '100%' }}>
          <TableContainer component={Paper} style={{ zIndex: '100' }}>
          <Table sx={{ minWidth: 650 }} aria-label="Academie Table">
            <TableHead sx={{ position: 'sticky' }}>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: 14 }}>
                  Nom Lycee
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>Abbreviation</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>Academie</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>Adresse</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {data.slice(startIndex, endIndex).map((row,index) => (
                    <TableRow key={index } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.nom}</TableCell>
                    <TableCell
                    >{row.code}</TableCell>
                    <TableCell>{row.ville}</TableCell>
                    <TableCell>{row.adresse}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(row.id)}
                      >
                        Modifier
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(row.id)}
                      >
                        Supprimer 
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                    </TableBody>
                    </Table>
                    
                    <Dialog open={dialogOpen} onClose={handleClose}>
                      <DialogTitle>Modifier l'académie</DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Nom Lycee"
                          name="nom"
                          value={editedFields.nom|| ''}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Abbreviation"
                          name="code"
                          value={editedFields.code || ''}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Ville"
                          name="ville"
                          value={editedFields.ville || ''}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Adresse"
                          name="adresse"
                          value={editedFields.adresse || ''}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Annuler
                        </Button>
                        <Button onClick={handleSave} color="primary">
                          Enregistrer
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableContainer>
                
              </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination count={Math.ceil(data.length / ITEMS_PER_PAGE)} page={page} onChange={handleChangePage} />
            </Box>
          </Box>
        
      </Grid>
      
    </Grid>

  </div>
  
  )
}

export default Academie
