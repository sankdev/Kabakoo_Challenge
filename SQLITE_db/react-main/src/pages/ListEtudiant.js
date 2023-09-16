// import React, { useState, useEffect } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
// import { TablePagination } from "@mui/material";


// function EtudiantList() {
//   const [etudiants, setEtudiants] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [editingId, setEditingId] = useState(-1);
//   const [editedFields, setEditedFields] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const filteredEtudiants = etudiants.filter(
//     (etudiant) =>
//       etudiant.codeControl.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       etudiant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       etudiant.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       etudiant.academie.toLowerCase().includes(searchQuery.toLowerCase())
//   );
  
//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const startIndex = page * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   // const currentEtudiants = etudiants.slice(startIndex, endIndex).map((etudiant) => {
//   //   if (etudiant._id === editingId) {
//   //     return { ...etudiant, ...editedFields };
//   //   }
//   //   return etudiant;
//   // });
//   const currentEtudiants = filteredEtudiants
//     .slice(startIndex, endIndex)
//     .map((etudiant) => {
//       if (etudiant._id === editingId) {
//         return { ...etudiant, ...editedFields };
//       }
//       return etudiant;
//     });
//   const handleEdit = (id) => {
//     setEditingId(id);
//     setEditedFields({ ...editedFields, [id]: '' });
  
//   };
//   console.log('id',editedFields)
//   const handleFieldChange = (e, fieldName) => {
//     setEditedFields({ ...editedFields, [fieldName]: e.target.value });
//   };
//   // const updateEtudiant = (id, fields) => {
//   //   fetch(`http://localhost:3001/app/updateetud/${id}`, {
//   //     method: "PUT",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(fields),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       setEditingId(null);
//   //       setEditedFields({});
//   //     })
//   //     .catch((error) => console.log(error));
//   // };
//   const handleSave = () => {
//     fetch(`http://localhost:3001/app/updateetud/${editingId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(editedFields)
//     })
//       .then(response => response.json())
//       .then(data => {
//         setEtudiants(etudiants.map(etudiant => {
//           if (etudiant.id === editingId) {
//             return { ...etudiant, ...editedFields };
//           }
//           return etudiant;
//         }));
//         setEditingId(null);
//         setEditedFields({});
//       })
//       .catch(error => console.error(error));
//   };
//   useEffect(() => {
//     fetch("http://localhost:3001/app/etudiant")
//       .then((response) => response.json())
//       .then((data) => setEtudiants(data));
//   }, []);
//   // delete 
//   const handleDelete = (id) => {
//     fetch(`http://localhost:3001/app/deleteetudiant/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setEtudiants(etudiants.filter((etudiant) => etudiant.id !== id));
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <>
//     <input type="text" placeholder="Search" onChange={handleSearch} />
//     <TableContainer component={Paper}>
//       <Table aria-label="etudiants">
//         <TableHead>
//           <TableRow>
//             <TableCell>Code Control</TableCell>
//             <TableCell>Matricules</TableCell>
//             <TableCell>Matricule Bac</TableCell>
//             <TableCell>Nom</TableCell>
//             <TableCell>Prénom</TableCell>
//             <TableCell>Sexe</TableCell>
//             <TableCell>Nationalité</TableCell>
//             <TableCell>Date de naissance</TableCell>
//             <TableCell>Nom de la mère</TableCell>
//             <TableCell>Prénom de la mère</TableCell>
//             <TableCell>Nom du père</TableCell>
//             <TableCell>Prénom du père</TableCell>
//             <TableCell>Matricule Def</TableCell>
//             <TableCell>Session Def</TableCell>
//             <TableCell>Centre Def</TableCell>
//             <TableCell>Session Bac</TableCell>
//             <TableCell>Mention Bac</TableCell>
//             <TableCell>Série Bac</TableCell>
//             <TableCell>Place Num</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Moyenne Bac</TableCell>
//             <TableCell>Lieu de naissance</TableCell>
//             <TableCell>Scolarité Lycée</TableCell>
//             <TableCell>Centre Bac</TableCell>
//             <TableCell>Inscriptibilité</TableCell>
//             <TableCell>Académie</TableCell>
//             <TableCell>Lycee</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {currentEtudiants.map((etudiant, index) => (
//           <TableRow key={index}>
//           <TableCell>
//   {editingId === etudiant.id ? (
//     <input type="text" value={editedFields.codeControl ?? etudiant?.codeControl} onChange={(e) => handleFieldChange(e,"codeControl")} />
//   ) : etudiant?.codeControl}
// </TableCell>

//             <TableCell>{ editingId === etudiant.id ? ( <input type="text" value={editedFields.matricules || etudiant.matricules} onChange={(e)=>handleFieldChange(e,'matricules')} /> ):etudiant.matricules}</TableCell>
//             <TableCell>{etudiant.matriculeBac}</TableCell>
//             <TableCell>
//               {editingId === etudiant.id ?
//                 <input value={editedFields.nom || etudiant.nom} onChange={(e) => handleFieldChange(e, 'nom')} />
//                 : etudiant.nom
//               }
//             </TableCell>
//             <TableCell>
//               {editingId === etudiant.id ?
//                 <input value={editedFields.prenom || etudiant.prenom} onChange={(e) => handleFieldChange(e, 'prenom')} />
//                 : etudiant.prenom
//               }
//             </TableCell>
//             <TableCell>  {editingId === etudiant.id ?
//               <input value={editedFields.sexe || etudiant.sexe} onChange={(e) => handleFieldChange(e, 'sexe')} />
//               : etudiant.sexe
//             }
//             </TableCell>
//             <TableCell> 
//             {editingId === etudiant.id ?
//               <input value={editedFields.nationalite || etudiant.nationalite} onChange={(e) => handleFieldChange(e, 'nationalite')} />
//               : etudiant.nationalite
//             }
            
//             </TableCell>
//             <TableCell>
//             {editingId === etudiant.id ?
//               <input value={editedFields.dateNaissance || etudiant.dateNaissance} onChange={(e) => handleFieldChange(e, 'dateNaissance')} />
//               : etudiant.dateNaissance
//             }
//            </TableCell>
//               <TableCell>   {editingId === etudiant.id ?
//                 <input value={editedFields.nomMere || etudiant.nomMere} onChange={(e) => handleFieldChange(e, 'nomMere')} />
//                 : etudiant.nomMere
//               }
//               </TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.prenomMere || etudiant.prenomMere} onChange={(e) => handleFieldChange(e, 'prenomMere')} />
//                 : etudiant.prenomMere
//               }
//             </TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.nomPere || etudiant.nomPere} onChange={(e) => handleFieldChange(e, 'nomPere')} />
//                 : etudiant.nomPere
//               }</TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.prenomPere || etudiant.prenomPere} onChange={(e) => handleFieldChange(e, 'prenomPere')} />
//                 : etudiant.prenomPere
//               }</TableCell>
//               <TableCell>   {editingId === etudiant.id ?
//                 <input value={editedFields.matriculeDef || etudiant.matriculeDef} onChange={(e) => handleFieldChange(e, 'matriculeDef')} />
//                 : etudiant.matriculeDef
//               }
//             </TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.sessionDef || etudiant.sessionDef} onChange={(e) => handleFieldChange(e, 'sessionDef')} />
//                 : etudiant.sessionDef
//               }
//               </TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.centreDef || etudiant.centreDef} onChange={(e) => handleFieldChange(e, 'centredef')} />
//                 : etudiant.centreDef
//               } 
//               </TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.sessionBac || etudiant.sessionBac} onChange={(e) => handleFieldChange(e, 'sessionBac')} />
//                 : etudiant.sessionBac
//               }</TableCell>
//               <TableCell>  {editingId === etudiant.id ?
//                 <input value={editedFields.mentionBac || etudiant.mentionBac} onChange={(e) => handleFieldChange(e, 'mentionBac')} />
//                 : etudiant.mentionBac
//               }
//               </TableCell>
//               <TableCell> {editingId === etudiant.id ?
//                 <input value={editedFields.serieBac || etudiant.serieBac} onChange={(e) => handleFieldChange(e, 'serieBac')} />
//                 : etudiant.serieBac
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.placeNum || etudiant.placeNum} onChange={(e) => handleFieldChange(e, 'placeNum')} />
//                 : etudiant.placeNum
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.status || etudiant.status} onChange={(e) => handleFieldChange(e, 'status')} />
//                 : etudiant.status
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.moyenneBac || etudiant.moyenneBac} onChange={(e) => handleFieldChange(e, 'moyenneBac')} />
//                 : etudiant.moyenneBac
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.lieuNaissance || etudiant.lieuNaissance} onChange={(e) => handleFieldChange(e, 'lieuNaissance')} />
//                 : etudiant.lieuNaissance
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.scolariteLyc || etudiant.scolariteLyc} onChange={(e) => handleFieldChange(e, 'scolariteLyc')} />
//                 : etudiant.scolariteLyc
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.centreBac || etudiant.centreBac} onChange={(e) => handleFieldChange(e, 'centreBac')} />
//                 : etudiant.centreBac
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.inscriptibilite || etudiant.inscriptibilite} onChange={(e) => handleFieldChange(e, 'inscriptibilite')} />
//                 : etudiant.inscriptibilite
//               }
//               </TableCell>
//               <TableCell>{editingId === etudiant.id ?
//                 <input value={editedFields.academie || etudiant.academie} onChange={(e) => handleFieldChange(e, 'academie')} />
//                 : etudiant.academie
//               }</TableCell>
//               <TableCell> {editingId === etudiant.id ?
//                 <input value={editedFields.lycee || etudiant.lycee} onChange={(e) => handleFieldChange(e, 'lycee')} />
//                 : etudiant.lycee
//               }
//               </TableCell>
//             <TableCell>
//               {editingId === etudiant.id ?
//                 <>
//                   <button onClick={handleSave}>Save</button>
//                   <button onClick={() => setEditingId(null)}>Cancel</button>
//                 </>
//                 :
//                 <button onClick={() => handleEdit(etudiant.id)}>Edit</button>
//               }
//             </TableCell>
//             <TableCell>
//             <button onClick={() => handleDelete(etudiant.id)}>Delete</button>
//           </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     <TablePagination
//       rowsPerPageOptions={[5, 10, 25]}
//       component="div"
//       count={etudiants.length}
//       rowsPerPage={rowsPerPage}
//       page={page}
//       onPageChange={handleChangePage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//   </TableContainer>
//   </>
// );
// }
// export default EtudiantList