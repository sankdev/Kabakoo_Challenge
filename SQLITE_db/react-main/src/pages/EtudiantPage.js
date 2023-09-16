
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,DialogContentText,
  DialogActions,
  Typography,MenuItem,Box
} from "@mui/material";
import Popper from "@material-ui/core/Popper";
import { Popover } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import *as XLSX from "xlsx";
import FileDownload from 'js-file-download'
import axios from "axios";



const useStyles = makeStyles({
  tableRow: {
    backgroundColor: '#f5f5f5',
    height: '5px',
    width:'10px',
    margin:'2px',
    padding:'3px',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  tableCell: {
    padding: '2px',
    margin:'2px',
    borderBottom: '1px solid #ddd',
    color: '#333',
    fontSize: '1.2rem',
    background: '#fff',
    border: '1px solid #ccc',
    
  },
  error: {
    color: 'red',
    
  }
  
});

// const CustomButtonGroup = styled(ButtonGroup)({
//   backgroundColor: '#f2f2f2',
//   borderRadius: '8px',
//   '& .MuiButton-root': {
//     color: 'black',
//     fontWeight: 600,
//   },
//   '& .MuiButton-root:hover': {
//     backgroundColor: '#e0e0e0',
//   },
// });
const CustomTableCell = styled(TableCell)({
  borderBottom: 'none',
  fontSize: '1rem',
  width: '100px', // Largeur des autres colonnes
  height: '5px',
  margin:'3px',
  padding:'5px',
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
const CustomInput = styled(Input)({
  border: '2px solid #ccc',
  borderRadius: '4px',
  padding: '10px 15px',
  fontSize: '16px',
 
  '&:focus': {
    border: '2px solid blue',
    outline: 'none',
  },
});
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '&.Mui-focused': {
      backgroundColor: '#f2f2f2',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #ccc',
  },
});
const CustomTableHeaderCell = styled(TableCell)({
  backgroundColor: 'green',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  textTransform: 'uppercase',
});
const CustomTableContainer = styled(TableContainer)({
  width: '100%',

});
function EtudImportExcel() {

  const classes = useStyles();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [matricules, setMatricules] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElc, setAnchorElc] = useState(null);
  const [inputValue,setInputValue]=useState("")
  const [codeControl,setCodeControl]=useState('')
  const [caracteresManquants, setCaracteresManquants] = useState([]);
  const [open,setOpen]=useState(false)
  const [verifMatricule, setVerifMatricule] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [sessionSuffix, setSessionSuffix] = useState('');
  const [academiePrefix, setAcademiePrefix] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [sex, setSex] = useState('');
  const [Sexe, setSexe] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState([]);
const [errors, setErrors] = useState([]);
  const [generatedMatricule, setGeneratedMatricule] = useState('');
  const [codeSequentiel,setCodeSequentiel]=useState('')
  const [sessions, setSessions] = useState([]);
  const [CodeAcademie, setCodeAcademie] = useState([]);
  const [CodeNationalite, setCodeNationalite] = useState([]);
  const [rowsWithErrors, setRowsWithErrors] = useState([]);
  const [rowsWithMatriculeErrors, setRowsWithMatriculeErrors] = useState([]);
  const [editRowIndex,setEditRowIndex]=useState(null)
  
  const rowsPerPage = 6; 
  
  const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
// const rowsToDisplay = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : data.slice(1).slice(indexOfFirstRow, indexOfLastRow);

// Mettre à jour les données filtrées lorsque le terme de recherche change


useEffect(() => {
  const filteredData = data.filter((row) => {
    const searchTermStr = String(searchTerm);
    if (typeof searchTermStr === 'string') {
      const name = row[1]?.toLowerCase() || ''; // Vérifie si row[1] existe
      const firstName = row[2]?.toLowerCase() || ''; // Vérifie si row[2] existe
      const nationality = row[4]?.toLowerCase() || ''; // Vérifie si row[4] existe
      const otherField = row[17]?.toLowerCase() || ''; // Vérifie si row[17] existe
  
      return (
        name.includes(searchTermStr.toLowerCase()) ||
        firstName.includes(searchTermStr.toLowerCase()) ||
        nationality.includes(searchTermStr.toLowerCase()) ||
        otherField.includes(searchTermStr.toLowerCase())
      );
    }
    return false;
  });
  

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const newRowsToDisplay = searchTerm
    ? filteredData.slice(indexOfFirstRow, indexOfLastRow)
    : data.slice(1).slice(indexOfFirstRow, indexOfLastRow);

  setRowsToDisplay(newRowsToDisplay);
}, [data, searchTerm, currentPage, rowsPerPage]);


  const handleClick1 = (event) => {
    if (event && event.currentTarget) {
      setAnchorElc(event.currentTarget);
      setOpen(true);
    }
  };
  const handleClose = () => {
   setOpen(false)
   
  };
  const handleCloseP = () => {
    
    setShowPopup(false)
   };
 
  const handleClickOpen = () => {
    
    setShowPopup(true)
  };

 

  const handleGenerateClick = () => {
    const matricule = generateNouveauMatricul({
      sessionSuffix,
      academiePrefix,
      nationalite,
      sex,
      codeSequentiel,
    });
    setGeneratedMatricule(matricule);
    handlePopupClose();
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopupOpen(true);
  };
 
  const handlePopupClose = () => {
    setAnchorEl(null);
    setPopupOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Extraire l'en-tête de la première feuille de calcul du fichier Excel
      const headers = sheetData[0] || [];
  
      // Vérifier si les en-têtes de la feuille de calcul correspondent à l'en-tête global
      const globalHeaders = data[0] || [];
      const sameHeaders = headers.every((header, index) => header === globalHeaders[index]);
  
      // Ajouter l'en-tête global si nécessaire
      if (!sameHeaders) {
        data.splice(0, 0, headers);
      }
  
      // Fusionner les données du fichier Excel avec les données globales
      const mergedData = [...sheetData.slice(1), ...data.slice(1)];
  
      // Mettre à jour le tableau de données avec les données fusionnées
      setData([data[0], ...mergedData]);
      setFilteredData(mergedData.slice(1));
      setMatricules(generateMatricules());
    };
    reader.readAsBinaryString(file);
  };
  
  
  
  

  const handleSearch = (event) => {
    const value = event.target.value;
    if (typeof value === 'string') {
      setSearchTerm(value);
    }
    setCurrentPage(1); // Réinitialiser la page courante
  
    // Pas besoin de recalculer les variables indexOfFirstRow et indexOfLastRow ici
    // Elles seront recalculées automatiquement dans useEffect
  };
  

  const handleRowClick = (row) => {
    setIsDeleteDialogOpen(true);
    setDeleteRowData(row);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = (row) => {
    const newData = data.filter((r) => r !== row);
    setData(newData);
    setFilteredData(newData.slice(1));
    handleDeleteDialogClose();
  };

  const handleEditDialogOpen = (row, rowIndex) => {
    setEditRowData(row);
    setEditRowIndex(rowIndex);
    setIsEditDialogOpen(true);
  };
  
  

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleEdit = (newRowData, rowIndex,indexOfFirstRow) => {
    // Créer une copie de data
    const newData = [...data];
  
    // Remplacer la ligne modifiée par la nouvelle version
    newData[indexOfFirstRow + rowIndex+1] = newRowData;
  
    // Mettre à jour l'état de data
    setData(newData);

 

  // Fermer le dialogue de modification
  handleEditDialogClose();
    console.log('rowdata',newRowData)
    console.log('index',rowIndex)

    // Fermer le dialogue de modification
    
  };
  
  
  
  
  const dowloadExcel = async () => {
   
    await axios({
      url: "http://localhost:3001/app/download",
      method: "get",
      responseType: "blob",
    }).then((res) => {
      console.log(res.data)
      FileDownload(res.data, "etudiant.xlsx");
      }
     
    )
  
  };
  
 
  const handleVerifyMatriculeClick = () => {
    if (matricules.includes(inputValue)) {
      setPopupMessage(`Matricule ${inputValue} valid`);
    } else {
      setPopupMessage(`Matricule ${inputValue} invalid`);
    }
  };
  // generation de Matricule et code controle
  const generateMatricules = () => {
      
      const newMatricules = data.slice(1).map((row, index) => {
        const academiePrefix = typeof row[24] === 'string' ? row[24].substring(0, 2) : '';
        const sessionSuffix = typeof row[14] === 'string' ? row[14].substring(row[14].length - 2) : '';
        const nationalite = typeof row[5] === 'string' ? row[5].substring(0, 1) : '';
        const sex = typeof row[3] === 'string' ? row[3].substring(0, 1) : '';

      const matriculeNumber = (index + 1).toString().padStart(5, '0');
      const matricule = sessionSuffix + academiePrefix + nationalite + sex+ matriculeNumber;
  
      return matricule;
    });
    setMatricules(newMatricules);
    console.log('matricules',matricules)
    return newMatricules;
};
  // generation de code control
   const generateControlCode=()=>{
    const newMatricules = data.slice(1).map((row, index) => {
      
      const academiePrefix = typeof row[24] === 'string' ? row[24].substring(0, 2) : '';
      const sessionSuffix = typeof row[14] === 'string' ? row[14].substring(row[14].length - 2) : '';
      const nationalite = typeof row[5] === 'string' ? row[5].substring(0, 1) : '';
      const sex = typeof row[3] === 'string' ? row[3].substring(0, 1) : '';
  
      const matriculeNumber = (index + 1).toString().padStart(5, '0');
      const digitSum = matriculeNumber.split('').reduce((sum, digit) => sum + parseInt(digit,10), 0);
      const charCode = Math.floor((digitSum / 10) * 25) + 65;
      const char = String.fromCharCode(charCode);
      // console.log('charcode',charCode)
      const matricule = sessionSuffix + academiePrefix + nationalite + sex+ matriculeNumber + char;
  
      return matricule;
    });
    setCodeControl(newMatricules);
    // console.log('code control',codeControl)
    return newMatricules;
   }

  // code controle verification matricule
  const handleVerification = () => {
    const existingMatricules = generateControlCode();
    let matriculeValide = false;
    let missingChars = '';
    let invalidLastChar = '';
    let validLastChar = '';
    for (let i = 0; i < existingMatricules.length; i += 1) {
      if (existingMatricules[i] === inputValue) {
        matriculeValide = true;
        break;
      } else if (!matriculeValide && existingMatricules[i].startsWith(verifMatricule)) {
        // Calculate the missing characters for the current matricule and the verification matricule
        const firstMatricule = existingMatricules[i];
        const secondMatricule = verifMatricule;
        missingChars = '';
        for (let j = 0; j < firstMatricule.length; j += 1) {
          if (firstMatricule.toString().charAt(j) !== secondMatricule.toString().charAt(j)) {
            missingChars += firstMatricule.charAt(j);
          } else {
            missingChars += '-';
          }
        }
        invalidLastChar = inputValue.charAt(inputValue.length - 1);
        validLastChar = firstMatricule.charAt(firstMatricule.length - 1);
        // setCaracteresManquants(missingChars)
        break;
      }
    }
  
    if (matriculeValide) {
      setPopupMessage(`Matricule ${inputValue} VALIDE !`);
    } else {
      setPopupMessage(`Matricule ${inputValue} INVALIDE.  '${invalidLastChar}' Saisie, mais  '${validLastChar}' Attendu , .`);
    }
    
    setVerifMatricule(inputValue);
    setCaracteresManquants(missingChars)
   
    handleClick1();
  };
  
  useEffect(() => {
    const existingMatricules = generateControlCode();
    if (verifMatricule && inputValue.startsWith(verifMatricule)) {
      const firstMatricule = existingMatricules.find((m) => m.startsWith(verifMatricule))?? '';
      let newMissingChars = '';
      for (let j = 0; j < firstMatricule.length; j += 1) {
        if (firstMatricule.toString().charAt(j) !== inputValue.toString().charAt(j)) {
          newMissingChars += firstMatricule.charAt(j);
        } else {
          newMissingChars += '-';
        }
      }
      setCaracteresManquants(newMissingChars);
    } else {
      setCaracteresManquants('');
    }
  }, [inputValue, verifMatricule,caracteresManquants]);
  // generer un nouveau matricule par la saisie des entrees
  const generateNouveauMatricul = () => {
    const matriculeNumber = (data.length - 1).toString().padStart(5, '0');
    const digitSum = matriculeNumber
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    const charCode = Math.floor((digitSum / 10) * 25) + 65;
    const char = String.fromCharCode(charCode);
  
    const sessionSuffixLastTwoChars = sessionSuffix?.slice(-2) || '';
    const academiePrefixFirstChar = academiePrefix?.charAt(0) || '';
    const nationaliteFirstChar = nationalite?.charAt(0) || '';
    const sexFirstChar = sex?.charAt(0) || '';
    const sequentialCode = codeSequentiel?.padStart(5, '0') || '';
    const sequentialCharCode = (parseInt(sequentialCode, 10) % 26) + 65;
  const sequentialChar = String.fromCharCode(sequentialCharCode);

    const matricule =
      sessionSuffixLastTwoChars +
      academiePrefixFirstChar +
      nationaliteFirstChar +
      sexFirstChar +
      sequentialCode +
      sequentialChar
      
 
    setGeneratedMatricule(matricule);
    return matricule;
  };
  // generation d'un nouveau matricule recuperation des donnee pour la liste deroulante
  useEffect(() => {
    axios.get("http://localhost:3001/app/etudiant")
      .then((response) => {
        for (let i = 0; i < response.data.length; i+=1) {
          setSessions((prevSessions) => [...prevSessions, response.data[i].sessionBac]);
          setCodeAcademie((prevAcademie) => [...prevAcademie, response.data[i].academie]);
          setCodeNationalite((prevCodeNationalite)=> [...prevCodeNationalite ,response.data[i].codeNationalite]);
        setSexe((prevSexe)=>[...prevSexe,response.data[i].sexe]);
        }
        
        console.log('nouveau matricule',response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // import des donnees de la table 
 // detection erreurs
 const detectErrors = () => {
  const newErrors = [];

  data.slice(1).forEach((row, index) => {
    const academiePrefix = typeof row[24] === 'string' ? row[24].substring(0, 2) : '';
    const sessionSuffix = typeof row[14] === 'string' ? row[14].substring(row[14].length - 2) : '';
    const nationalite = typeof row[5] === 'string' ? row[5].substring(0, 1) : '';
    const sex = typeof row[3] === 'string' ? row[3].substring(0, 1) : '';

    if (academiePrefix.length !== 2) {
      newErrors.push(`Académie prefixe invalide pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }

    if (sessionSuffix.length !== 2) {
      newErrors.push(`Session suffixe invalide pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }

    if (!['F', 'M'].includes(sex)) {
      newErrors.push(`Sexe invalide pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }

    if (nationalite !== "1" && nationalite !== "2") {
      newErrors.push(`Nationalité invalide pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }
    

    const matriculeNumber = (index + 1).toString().padStart(5, '0');
    const digitSum = matriculeNumber.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    const charCode = Math.floor((digitSum / 10) * 25) + 65;
    const char = String.fromCharCode(charCode);
    const expectedControlCode = `${matriculeNumber}${char}`;

    if (!generateMatricules().includes(`${sessionSuffix}${academiePrefix}${nationalite}${sex}${matriculeNumber}`)) {
      newErrors.push(`Erreur de génération de matricule pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }

    if (!generateControlCode().includes(`${sessionSuffix}${academiePrefix}${nationalite}${sex}${expectedControlCode}`)) {
      newErrors.push(`Erreur de génération de code de contrôle pour la ligne ${index + 1}`);
      setRowsWithErrors(rows => [...rows, index]);
    }
  });

  setErrors(newErrors);
};


const matriculesErrors = rowsWithErrors.map(index => codeControl[index]);
console.log('matriculesErrors', matriculesErrors);
console.log('matriculesErr',rowsWithErrors)

useEffect(() => {
  const matriculeErrors = rowsWithErrors.map(index => codeControl[index]);
  const allRowsWithMatriculeErrors = [];
  for (let i = 0; i < Math.ceil(data.slice(1).length / rowsPerPage); i+=1) {
    const indexOfLastRow = (i + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const rowsToDisplay = data.slice(1).slice(indexOfFirstRow, indexOfLastRow);
    const rowsWithMatriculeErrors = rowsToDisplay.filter((row, index) => {
      const matricule = generateControlCode()[indexOfFirstRow + index];
      const hasMatriculeError = matriculeErrors.includes(matricule);
      if (hasMatriculeError) {
        allRowsWithMatriculeErrors.push(row);
      }
      return hasMatriculeError;
    });
  }
  setRowsWithMatriculeErrors(allRowsWithMatriculeErrors);
  // Map matricules errors to rows with matricule errors
  
}, [rowsWithErrors, currentPage]);



console.log('rowsWithMatriculeErrors', rowsWithMatriculeErrors);

// exportation d'errors 
// const matriculesError = rowsWithMatriculeErrors.map(row => generateControlCode()[data.indexOf(row)]);
// console.log('matriculesError', matriculesError);



// Fonction d'exportation appelée lorsque le bouton est cliqué
function exporterMatriculesEnErreur() {
  const matriculesErrors = rowsWithErrors.map(index => codeControl[index]);
  console.log('exportMatricule',matriculesErrors)
const wb = XLSX.utils.book_new();

// Ajouter une feuille de calcul au classeur
const ws = XLSX.utils.json_to_sheet(rowsWithMatriculeErrors.map((row, index) => ({
  rowNumber: index + 1,
  ...row,
 
   matriculeErrors: matriculesErrors[indexOfFirstRow + index]
   
})));

// Ajouter des en-têtes de colonnes
const globalHeaders = data[0] || [];
XLSX.utils.sheet_add_aoa(ws, [globalHeaders]);


// Ajouter les données à la feuille de calcul
XLSX.utils.sheet_add_json(ws, rowsWithMatriculeErrors.map((row, index) => ({
  rowNumber: index + 1,
  ...row,
   matriculeErrors: matriculesErrors[indexOfFirstRow + index]
})), {skipHeader: true, origin: 'A2'});
console.log('excelMatricu',matriculesErrors[indexOfFirstRow + indexOfLastRow])
// Ajouter la feuille de calcul au classeur
XLSX.utils.book_append_sheet(wb, ws, 'Erreurs de matricule');

// Enregistrer le classeur dans un fichier Excel
XLSX.writeFile(wb, 'Erreurs de matricule.xlsx');
}
  // import fichier  etudiant 
  // const handleFileInputChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const EtudiantFileUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   try {
  //     const response = await fetch('http://localhost:3001/app/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log('File uploaded successfully');
  //     } else {
  //       console.error('Failed to upload file');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const containerStyle = { backgroundColor: '#F5F5F5', padding: 5 };

  const buttonGroup1 = (
    <Grid container spacing={1} sm="auto" sx="">
      <Grid item>
      <Button variant="outlined" color="primary" >
      Importer Fichier
    </Button>
      </Grid>
      <Grid item>
      <Button variant="outlined" onClick={(e)=>detectErrors(e)} color="primary">
         Erreurs
      </Button>
    </Grid>
      <Grid item>
        <Button variant="outlined" onClick={()=>dowloadExcel()} color="secondary">
          Exporter Fichier
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={()=>generateMatricules()}  color="secondary">
          Generer Matricule
        </Button>
      </Grid>
      <Grid item>
      <div>
      <Button variant="outlined" onClick={handleClickOpen}>
         nouveau matricule
      </Button>
      <Dialog  open={showPopup} onClose={handleCloseP} >
        <DialogTitle  sx={{color:"green", background:"pink"}}>Générer un nouveau matricule</DialogTitle>
        <DialogContent sx={{color:"green", background:"pink"}} >
          <TextField
            select
            label=" Session Bac"
            value={sessionSuffix}
            onChange={(e) => setSessionSuffix(e.target.value)}
            fullWidth
            sx={{ background:"white"}}
          >
          {sessions?.map((session,index) => (
            <MenuItem key={index} value={session}>
              {session}
            </MenuItem>
          ))}
          </TextField>
          <TextField
            select
            label="Code Académie"
            value={academiePrefix}
            onChange={(e) => setAcademiePrefix(e.target.value)}
            fullWidth
            sx={{ background:"white"}}
          >
          {CodeAcademie?.map((academie,index) => (
            <MenuItem key={index} value={academie}>
              {academie}
            </MenuItem>
          ))}
          </TextField>
          <TextField
            select
            label=" Code Nationalité"
            value={nationalite}
            onChange={(e) => setNationalite(e.target.value)}
            fullWidth
            sx={{ background:"white"}}
          >
          {CodeNationalite?.map((nationalite,index) => (
            <MenuItem key={index} value={nationalite}>
              {nationalite}
              </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            label="Sexe"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            fullWidth
            sx={{ background:"white"}}
          >
          {Sexe?.map((sex,index) => (
            <MenuItem key={index} value={sex}>
              {sex}
              </MenuItem>
              ))}
          </TextField>
          <TextField
            label="codeSequentiel"
            value={codeSequentiel}
            onChange={(e) => setCodeSequentiel(e.target.value)}
            fullWidth
            sx={{ background:"white"}}
          />
          {generatedMatricule !=null && (
            <Typography>Matricule généré : {generatedMatricule}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseP}>Annuler</Button>
          <Button onClick={handleGenerateClick} color="primary">
            Générer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={()=>handleSave(data)} color="secondary">
          Save In DataBase
        </Button>
      </Grid>
      
    </Grid>
  );
  
  const buttonGroup2 = (
    <Grid container spacing={1}>
      <Grid item>
        <Button variant="outlined" onClick={()=>generateControlCode()} color="warning">
          Generer code Controle
        </Button>
      </Grid>
      <Grid item>
      <>
      <Button variant="outlined" color="info" onClick={handleButtonClick}>Vérifier matricule</Button>
      <Popper open={popupOpen} anchorEl={anchorEl} placement="bottom-end">
        <Paper style={{ padding: "1rem" ,color:"green", background:"pink"}}  >
          <Typography>Vérification du matricule</Typography>
          <TextField
            label="Entrez le matricule"
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
            style={{ margin: "0.5rem" ,background:"white"}}
          />
          <Button onClick={handleVerifyMatriculeClick } variant="contained" color="primary" style={{ margin: "0.5rem" }}>
            Vérifier
          </Button>
          <Typography>{popupMessage}</Typography>
          <Button onClick={handlePopupClose} style={{ margin: "0.5rem" }}>
            Fermer
          </Button>
        </Paper>
      </Popper>
    </>
      </Grid>
      <Grid item>
      <Button variant="outlined" color="primary" onClick={()=>exporterMatriculesEnErreur(rowsWithErrors, codeControl)}  >
        Export Errors
      </Button>
    </Grid>
    
  <Grid item>
  <div >
  <Button variant="outlined" color="primary" onClick={handleClick1}>
    Vérifier un matricule
  </Button>
  <Popover 
    open={open}
    anchorEl={anchorElc}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Box sx={{ p: 2, minWidth: '600px', maxWidth: '800px' ,color:"green", background:"pink"}}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Vérification de matricule
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Entrez le matricule à vérifier :
      </Typography>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 1 ,background:"white"}}
      />
      <Button variant="contained" color="primary" onClick={handleVerification} sx={{ mr: 1 }}>
        Vérifier
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClose}>
        Fermer
      </Button>
      {popupMessage && (
        <Typography variant="body1" sx={{ mt: 2 ,fontzise:18}}>
          {popupMessage}
        </Typography>
      )}
      {caracteresManquants && caracteresManquants.length > 0 && (
        <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
          Caractères manquants : {caracteresManquants}
        </Typography>
      )}
      {verifMatricule && caracteresManquants && caracteresManquants.length > 0 && (
        <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
          Dernier caractère manquant pour {verifMatricule} :{' '}
          {caracteresManquants.charAt(caracteresManquants.lastIndexOf('-') + 1)}
        </Typography>
      )}
    </Box>
  </Popover>
</div>

  
</Grid>
<Grid item>
    <Button variant="outlined" color="primary">
    Authentifier Code Controle
    </Button>
  </Grid>
    </Grid>
  );
 
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  
    // Recalculer les variables indexOfFirstRow et indexOfLastRow ici
    const indexOfLastRow = newPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  
    const newRowsToDisplay = data.slice(1).slice(indexOfFirstRow, indexOfLastRow);
    setRowsToDisplay(newRowsToDisplay);
  };
  const handleSave = async () => {
   
    try {
      const response = await fetch('http://localhost:3001/app/postetud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({codeControl,matricules,data}) 
       
      });
      console.log(codeControl,matricules,data)
      const result = await response.text();
      console.log(response)
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  
   
 
  

console.log("errors",errors)
 

  return (
    <div>
     
      <Grid container spacing={1} justifyContent="left"  sx={{ border: '1px solid #ccc', padding: 1,margin:1 }}>
      <Grid item>
      <div style={containerStyle}>{buttonGroup1}</div>

    </Grid>
    <Grid item>
    <div style={containerStyle}>{buttonGroup2}
   
    </div>
   
  </Grid>
  
      </Grid>
    <Grid container spacing={1} justifyContent="left">
     
        <Grid sx={{ border: '1px solid #ccc', padding: 2,margin:2 }}>
          <CustomInput type="file" onChange={handleFileUpload} />
       <CustomTextField label="Rechercher"
        value={searchTerm}
        onChange={handleSearch} variant="outlined" />
        </Grid>
        
      </Grid>
      
  
      
      <CustomTableContainer component={Paper} style={{ overflow: 'auto' }} sx={{ border: '1px solid #ccc', padding: 1,margin:1 }} >
        <Table>
          <TableHead>
            <TableRow className={classes.tableRow}>
           
            <CustomTableHeaderCell>Code Control</CustomTableHeaderCell>
            <CustomTableHeaderCell>Matricule</CustomTableHeaderCell>
            
              {data[0]?.map((cell, index) => (
                <CustomTableHeaderCell  key={index}>{cell}</CustomTableHeaderCell>
              ))}
              
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rowsToDisplay.map((row, rowIndex) => {
                 const isError = errors.includes(indexOfFirstRow + rowIndex)

                return (
                  <TableRow className={`${classes.tableRow} ${isError ? classes.error : ''}`} key={rowIndex}>
                    <TableCell style={{padding:'5px',margin:"3px"}} className={`${classes.tableCell} codeControl  ${matriculesErrors.includes(codeControl[indexOfFirstRow + rowIndex]) ? classes.error : ''}`}>{codeControl[indexOfFirstRow + rowIndex]}</TableCell>
                    <TableCell style={{padding:'5px',margin:"3px"}} className={`${classes.tableCell} matricule  ${matriculesErrors.includes(matricules[indexOfFirstRow + rowIndex]) ? classes.error : ''}`}>{matricules[indexOfFirstRow + rowIndex]}</TableCell>
                    {row.map((cell, cellIndex) => (
                      <TableCell style={{padding:'5px',margin:"3px"}} className={classes.tableCell} key={cellIndex}> {typeof cell === 'string' ? cell : 'N/A'}</TableCell>
                    ))}
                  <CustomTableCell>
                    <IconButton
                      aria-label="Modifier"
                      onClick={() => handleEditDialogOpen(row,rowIndex)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Supprimer"
                      onClick={() => handleRowClick(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CustomTableCell>
                </TableRow>
                    
                    )})}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <Pagination
      count={Math.ceil(searchTerm ? filteredData.length / rowsPerPage : data.slice(1).length / rowsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
    />
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette ligne ?
        </DialogTitle>
        <DialogContent>
          {deleteRowData.map((cell, index) => (
            <div key={index}>
              {data[0][index]}: {cell}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Annuler</Button>
          <Button onClick={() => handleDelete(deleteRowData)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Modifier la ligne</DialogTitle>
        <DialogContent>
        {data[ indexOfFirstRow + editRowIndex  ]?.map((cell, index) => (
          <CustomTextField
            key={index}
            label={data[0][index]}
            value={editRowData[index ] || ''}
            onChange={(event) => {
              const editedRow = [...editRowData];
              editedRow[index] = event.target.value;
              setEditRowData(editedRow);
            }}
            fullWidth
          />
        ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Annuler</Button>
          <Button onClick={() => handleEdit(editRowData, editRowIndex,indexOfFirstRow)}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
    )}    
     export default EtudImportExcel;
                        

    