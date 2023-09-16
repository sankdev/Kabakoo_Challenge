import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Dialog,DialogTitle, DialogContent,DialogActions, Box, Grid,TextField,Button,Table, TableFooter,AppBar,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, styled, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

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
   
  });

  const StickyHeader = styled(AppBar)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
  }));
  // const CustomTableHeaderCell = ({ children, ...props }) => (
  //   <TableCell {...props}>
  //     {children}
  //   </TableCell>
  // );

const Academie = () => {

    const classes = useStyles();
    const [nom, setNom] = useState('');
    const [abbrev, setAbbrev] = useState('');
    const [academie, setAcademie] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ data, setData]=useState([])
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [editingId, setEditingId] = useState(-1);
    const [editedFields, setEditedFields] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFieldChange = (e, fieldName) => {
      setEditedFields({ ...editedFields, [fieldName]: e.target.value });
    };

    // const handleEdit = (id) => {
    //   const rowToEdit = data.find(row => row.id === id);
    //   setEditingId(id);
    //   setEditedFields({
    //     nom: rowToEdit.nom,
    //     abbrev: rowToEdit.abbrev,
    //     academie: rowToEdit.academie,
    //     adresse: rowToEdit.adresse
    //   });
    // };

    const handleDelete = (id) => {
      fetch(`http://localhost:3001/app/deletelycee/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((dat) => {
          setData(data.filter((etudiant) => etudiant.id !== id));
        })
        .catch((error) => console.log(error));
    };


    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post('http://localhost:3001/app/importlycee', formData)
        .then(response => {
          console.log(response);
          alert('Fichier importé avec succès');
        })
        .catch(error => {
          console.log(error);
          alert('Une erreur s\'est produite lors de l\'importation du fichier');
        });
        console.log('file',file)
    };
     // la pagination
     const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 3));
      setPage(0);
    };
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get('http://localhost:3001/app/getlycee');
          setData(result.data);
        };
        fetchData();
      }, []);
  
      const fetchData = async () => {
        const result = await axios.get('http://localhost:3001/app/getlycee');
        setData(result.data);
      };
    
      const handleClickOpen = () => {
        setOpen(true);
        fetchData();
      };
    
      const handleClose = () => {
        setDialogOpen(false);
       setEditingId(null);
       setEditedFields({});
      };
      const handleEditClick = (id) => {
        const academieToEdit = data.find((academie) => academie.id === id);
        setEditedFields(academieToEdit);
        setEditingId(id);
        setDialogOpen(true);
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedFields((prevFields) => ({
          ...prevFields,
          [name]: value,
        }));
      };

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      const data = {
         nom,
         abbrev,
         adresse,
         academie
      };
  
      axios.post('http://localhost:3001/app/postlycee', data)
        .then(response => {
          console.log(response);
          alert('Données enregistrées avec succès');
          setNom('');
          setAbbrev('');
          setAcademie('');
          setAdresse('');
        })
        .catch(error => {
          console.log(error);
          alert('Une erreur s\'est produite lors de l\'enregistrement des données');
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const inputData = {
          nom: setNom,
          abbrev: setAbbrev,
          academie: setAcademie,
          adresse: setAdresse
        };
      
        inputData[name](value);
      };
      // handleSave 
      const handleSave = () => {
        fetch(`http://localhost:3001/app/updatelycee/${editingId}`, {
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
     
      

  return (
    <div>
    <Box>
    <input type="file" accept=".xlsx" onChange={handleFileInputChange} />
    
    <Box component="form" className={classes.root} onSubmit={handleFormSubmit} sx={{ mt: 5 }}>
    <Typography variant="subtitle2" style={{ padding: '10px', margin: '10px', alignContent: 'center',
     color: 'green', fontSize: "40px" }}> Ajout des Lycee</Typography>
      <TextField id="nom" name="nom" label="Nom" value={nom} onChange={handleInputChange}  />
      <TextField id="abbrev" name="abbrev" label="Abbreviation Lycee" value={abbrev} onChange={handleInputChange}  />
      <TextField id="academie" name="academie" label="academie" value={academie} onChange={handleInputChange}  />
      <TextField id="adresse" name="adresse" label="Adresse" value={adresse} onChange={handleInputChange}  />
      <Box style={{ margin:'10px',padding: '10px'}}>
    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
      Enregistrer
    </Button>
    </Box>
    </Box>
    <Grid container spacing={1}>
    <Grid item >
    
       
          <Box
           
          sx={{ width: '100%' }}
          >
            
            <StickyHeader>
              <Typography
                variant="subtitle2"
                style={{
                  padding: '5px',
                  margin: '10px',
                  alignContent: 'center',
                  color: 'green',
                  fontSize: '40px',
                }}
              >
                Liste des Lycee
              </Typography>
            </StickyHeader>
            <Box sx={{ width: '100%' }}>
              <TableContainer component={Paper} style={{ zIndex: '100' }}>
                <Table sx={{ minWidth: 650 }} aria-label="Academie Table">
                  <TableHead sx={{ position: 'sticky' }}>
                    <TableRow>
                      <CustomTableHeaderCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                        Nom Lycee
                      </CustomTableHeaderCell>
                      <CustomTableHeaderCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                        abbreviation
                      </CustomTableHeaderCell>
                      <CustomTableHeaderCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                        Academie
                      </CustomTableHeaderCell>
                      <CustomTableHeaderCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                        Adresse
                      </CustomTableHeaderCell>
                      <CustomTableHeaderCell sx={{ fontWeight: 'bold', fontSize: 14 }}>
                      Actions
                    </CustomTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row,index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{row.nom}</TableCell>
                        <TableCell
                        >{row.abbrev}</TableCell>
                        <TableCell>{row.academie}</TableCell>
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
                    value={editedFields.nom || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Abbreviation"
                    name="abbrev"
                    value={editedFields.abbrev || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Academie"
                    name="academie"
                    value={editedFields.academie || ''}
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
                  <Button onClick={handleClose}>Annuler</Button>
                  <Button onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
              </Dialog>
              

              

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={4}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
                <Table/>
              </TableContainer>
            
          </Box>

        
        </Box>
      
    
  </Grid>
</Grid>
  </Box>
  </div>
  
  )
}

export default Academie
