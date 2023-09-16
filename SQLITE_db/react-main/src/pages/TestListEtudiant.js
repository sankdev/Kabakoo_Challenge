import React, { useState, useEffect } from "react";
// import { } from "@material-ui/core";
import {Dialog,DialogTitle, TextField,DialogContent,DialogActions, Container, TablePagination, Typography ,Table, TableBody, TableCell, TableContainer, styled,TableHead, TableRow, Paper,Button, Grid  } from "@mui/material";
import { makeStyles } from '@mui/styles';
import UserProfile from "./UserProfile";


const useStyles = makeStyles({
  tableRow: {
    backgroundColor:  '#f5f5f5',
  fontweight: 'bold',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  tableCell: {
    padding: '12px 8px',
  },})
// mettre la couleur sur entete avec CustomTableHeaderCell
  // const TableCell = styled(TableCell)({
  //   backgroundColor: 'green',
  //   color: 'white',
  //   fontWeight: 'bold',
  //   fontSize: '1rem',
  //   textTransform: 'uppercase',
  //   width:'20px'
    
  // });
  const CustomTableCell = styled(TableCell)({
    borderBottom: 'none',
    fontSize: '1rem',
    width: '150px', // Largeur des autres colonnes
    height: '1rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
   
  });
function EtudiantList() {
  const [etudiants, setEtudiants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(-1);
  const [editedFields, setEditedFields] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data,setData]=useState()
   // const [filteredEtudiants, setFilteredEtudiants] = useState([]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const filteredEtudiants = etudiants.filter(
    (etudiant) =>
      (etudiant.codeControl && etudiant.codeControl.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (etudiant.nom && etudiant.nom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (etudiant.prenom && etudiant.prenom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (etudiant.academie && etudiant.academie.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  console.log('academieData',data)
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  // useEffect(() => {
  //   // Simulating data fetching or filtering
  //   const fetchFilteredData = () => {
  //     // Filter your etudiants array here based on your logic
  //     const filteredData = etudiants.filter(
  //       (etudiant) =>
  //         (etudiant.codeControl && etudiant.codeControl.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //         (etudiant.nom && etudiant.nom.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //         (etudiant.prenom && etudiant.prenom.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //         (etudiant.academie && etudiant.academie.toLowerCase().includes(searchQuery.toLowerCase()))
  //     );
  //     setFilteredEtudiants(filteredData);
  //     setData(filteredData); // Assuming you want to initialize the data state with the filtered data
      
  //   };

  //   fetchFilteredData(); // Call the function to fetch the filtered data when the component mounts
  // }, [])

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // const currentEtudiants = etudiants.slice(startIndex, endIndex).map((etudiant) => {
  //   if (etudiant._id === editingId) {
  //     return { ...etudiant, ...editedFields };
  //   }
  //   return etudiant;
  // });
  const currentEtudiants = filteredEtudiants
    .slice(startIndex, endIndex)
    .map((etudiant) => {
      if (etudiant._id === editingId) {
        return { ...etudiant, ...editedFields };
      }
    
      return etudiant;
      
    });
  // const handleEdit = (id) => {
  //   setEditingId(id);
  //   setEditedFields({ ...editedFields, [id]: '' });
  //   console.log('id',editedFields)
  // };
  const handleClose = () => {
    setDialogOpen(false);
   setEditingId(null);
   setEditedFields({});
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleEditClick = (id) => {
    const currentEtudiants = filteredEtudiants
      .slice(startIndex, endIndex)
      .map((etudiant) => {
        if (etudiant._id === editingId) {
          return { ...etudiant, ...editedFields };
        }
        return etudiant;
      });
    setData(etudiants);
    const editedRow = currentEtudiants.find((row) => row.id === id);
  
    // const editedRow = data && data.find((row) => row.id === id);

    if (editedRow) {
      setEditedFields(editedRow);
      setEditingId(id);
      setDialogOpen(true);
    }
  };
  
  // useEffect(()=>{
  //   currentEtudiants()
  // },[])
  // const handleFieldChange = (e, fieldName) => {
  //   setEditedFields({ ...editedFields, [fieldName]: e.target.value });
  // };
 // import ficher etudiant 
 const handleFileInputChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

const handleFileUpload = async () => {
  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch('http://localhost:3001/app/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('Failed to upload file');
    }
  } catch (error) {
    console.error(error);
  }
};


  const handleSave = () => {
    fetch(`http://localhost:3001/app/updateetud/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedFields)
    })
      .then(response => response.json())
      .then(data => {
        setEtudiants(etudiants.map(etudiant => {
          if (etudiant.id === editingId) {
            return { ...etudiant, ...editedFields };
          }
          return etudiant;
        }));
        setEditingId(null);
        setEditedFields({});
        setDialogOpen(false);
      })
      .catch(error => console.error(error));
  };
  useEffect(() => {
    fetch("http://localhost:3001/app/etudiant")
      .then((response) => response.json())
      .then((data) => setEtudiants(data));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/app/deleteetudiant/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
      })
      .catch((error) => console.log(error));
  };
  const classes = useStyles();
  return (
    <>
    
    <Container>
  
    <Grid  item>  <Typography  variant="subtitle2"
    style={{
      padding: '5px',
      margin: '10px',
      alignContent: 'center',
      color: 'green',
      fontSize: '40px',
    }}> Listes Des Etudiants </Typography></Grid>
    <Grid  container spacing={1}>    
    
    <Grid item >  <div >
    <input type="file" onChange={handleFileInputChange}   style={{padding: '5px',
    margin: '10px',
    flex:'right'}} />
    <Button variant="outlined" color="primary" onClick={handleFileUpload}>
      Importer Fichier
    </Button>
  </div></Grid>
  <Grid item > <input  style={{padding: '5px',
    margin: '10px',
    flex:'right'}} type="text" placeholder="Search" onChange={handleSearch} /></Grid> 
  
  </Grid>
   
    
   
    </Container>
    <TableContainer component={Paper}>
      <Table aria-label="etudiants">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>Code Control</TableCell>
            <TableCell>Matricules</TableCell>
            <TableCell>Matricule Bac</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Sexe</TableCell>
            <TableCell>Nationalité</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell>Nom de la mère</TableCell>
            <TableCell>Prénom de la mère</TableCell>
            <TableCell>Nom du père</TableCell>
            <TableCell>Prénom du père</TableCell>
            <TableCell>Matricule Def</TableCell>
            <TableCell>Session Def</TableCell>
            <TableCell>Centre Def</TableCell>
            <TableCell>Session Bac</TableCell>
            <TableCell>Mention Bac</TableCell>
            <TableCell>Série Bac</TableCell>
            <TableCell>Place Num</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Moyenne Bac</TableCell>
            <TableCell>Lieu de naissance</TableCell>
            <TableCell>Scolarité Lycée</TableCell>
            <TableCell>Centre Bac</TableCell>
            <TableCell>Inscriptibilité</TableCell>
            <TableCell>Académie</TableCell>
            <TableCell>Lycee</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {currentEtudiants.map((etudiant, index) => (
          <TableRow key={index}>
          <TableCell>
  { etudiant.codeControl}
</TableCell>

            <TableCell>{etudiant.matricules}</TableCell>
            <TableCell>{etudiant.matriculeBac} </TableCell>
            <TableCell>
              {etudiant.nom}
            </TableCell>
            <TableCell>
              { etudiant.prenom}
            </TableCell>
            <TableCell>  { etudiant.sexe}
            </TableCell>
            <TableCell> 
            { etudiant.nationalite}
             </TableCell>
            <TableCell>
            { etudiant.dateNaissance}
            
           </TableCell>
              <TableCell>   { etudiant.nomMere}
              </TableCell>
              <TableCell>  { etudiant.prenomMere}
            </TableCell>
              <TableCell>  { etudiant.nomPere
              }</TableCell>
              <TableCell>  {etudiant.prenomPere
              }</TableCell>
              <TableCell>   {etudiant.matriculeDef
              }
            </TableCell>
              <TableCell>  { etudiant.sessionDef
              }
              </TableCell>
              <TableCell>  { etudiant.centreDef
              } 
              </TableCell>
              <TableCell>  {etudiant.sessionBac
              }</TableCell>
              <TableCell>  { etudiant.mentionBac
              }
              </TableCell>
              <TableCell> { etudiant.serieBac
              }
              </TableCell>
              <TableCell>{ etudiant.placeNum
              }
              </TableCell>
              <TableCell>{ etudiant.status
              }
              </TableCell>
              <TableCell>{ etudiant.moyenneBac
              }
              </TableCell>
              <TableCell>{ etudiant.lieuNaissance
              }
              </TableCell>
              <TableCell>{ etudiant.scolariteLyc
              }
              </TableCell>
              <TableCell>{ etudiant.centreBac
              }
              </TableCell>
              <TableCell>{ etudiant.inscriptibilite
              }
              </TableCell>
              <TableCell>{ etudiant.academie
              }</TableCell>
              <TableCell> { etudiant.lycee
              }
              </TableCell>
            <TableCell>
             
                <button onClick={() => handleEditClick(etudiant.id)}>Edit</button>
              
            </TableCell>
            <TableCell>
            <button onClick={() => handleDelete(etudiant.id)}>Delete</button>
          </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Modifier Etudiant </DialogTitle>
      <DialogContent>
        <TextField
          label="CodeControl"
          name="codeControl"
          value={editedFields.codeControl || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Matricule"
          name="matricules"
          value={editedFields.matricules || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="MatriculeBac"
          name="matriculeBac"
          value={editedFields.matriculeBac || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nom"
          name="nom"
          value={editedFields.nom || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
        label="Prenom"
        name="prenom"
        value={editedFields.prenom || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
      label="sexe"
      name="sexe"
      value={editedFields.sexe || ''}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
    label="Nationalite"
    name="nationalite"
    value={editedFields.nationalite || ''}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  <TextField
  label="Date Naissance"
  name="dateNaissance"
  value={editedFields.dateNaissance || ''}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>
<TextField
label="Nom Mere"
name="nomMere"
value={editedFields.nomMere || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Prenom Mere"
name="prenomMere"
value={editedFields.prenomMere || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Nom Pere"
name="nomPere"
value={editedFields.nomPere || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="prenom Pere"
name="prenomPere"
value={editedFields.prenomPere || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Matricule Def"
name="matriculeDef"
value={editedFields.matriculeDef || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Session Def"
name="sessionDef"
value={editedFields.sessionDef || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="CentreDef"
name="centreDef"
value={editedFields.centreDef || ''}
onChange={handleChange}
fullWidth
margin="normal"
/> 
<TextField
label="SessionBac"
name="sessionBac"
value={editedFields.sessionBac || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="MentionBac"
name="mentionBac"
value={editedFields.mentionBac || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>

<TextField
label="place Numero"
name="placeNum"
value={editedFields.placeNum || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Status"
name="status"
value={editedFields.status || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Moyenne Bac"
name="moyenneBac"
value={editedFields.moyenneBac || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Lieu Naissance"
name="lieuNaissance"
value={editedFields.lieuNaissance || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="scolarite Lycee"
name="scolariteLyc"
value={editedFields.scolariteLyc || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="Centre Bac"
name="centreBac"
value={editedFields.centreBac || ''}
onChange={handleChange}
fullWidth
margin="normal"
/>
<TextField
label="inscriptibilite"
name="inscriptibilite"
value={editedFields.inscriptibilite || ''}
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
label="Lycee"
name="academie"
value={editedFields.academie || ''}
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
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={etudiants.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </TableContainer>
  </>
);
}
export default EtudiantList


