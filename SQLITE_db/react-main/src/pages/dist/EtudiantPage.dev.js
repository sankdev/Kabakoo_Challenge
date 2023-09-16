// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// const EtudImportExcel = () => {
//   const initialData = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
//   ];
//   const [data, setData] = useState(initialData);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newData, setNewData] = useState({ name: '', email: '' });
//   const [editingId, setEditingId] = useState(null);
//   const handleAddModalOpen = () => setShowAddModal(true);
//   const handleAddModalClose = () => setShowAddModal(false);
//   const handleEditModalOpen = () => setShowEditModal(true);
//   const handleEditModalClose = () => setShowEditModal(false);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewData((prevData) => ({ ...prevData, [name]: value }));
//   };
//   const handleAdd = () => {
//     setData([...data, { ...newData, id: Date.now() }]);
//     setNewData({ name: '', email: '' });
//     handleAddModalClose();
//   };
//   const handleEdit = () => {
//     setData(
//       data.map((d) =>
//         d.id === editingId ? { ...d, ...newData } : d
//       )
//     );
//     setEditingId(null);
//     setNewData({ name: '', email: '' });
//     handleEditModalClose();
//   };
//   const handleDelete = (id) => {
//     setData(data.filter((d) => d.id !== id));
//   };
//   const handleEditClick = (id) => {
//     const { name, email } = data.find((d) => d.id === id);
//     setEditingId(id);
//     setNewData({ name, email });
//     handleEditModalOpen();
//   };
//   return (
//     <>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d) => (
//             <tr key={d.id}>
//               <td>{d.name}</td>
//               <td>{d.email}</td>
//               <td>
//                 <Button variant="primary" onClick={() => handleEditClick(d.id)}>
//                   Edit
//                 </Button>{' '}
//                 <Button variant="danger" onClick={() => handleDelete(d.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Button variant="success" onClick={handleAddModalOpen}>
//         Add
//       </Button>
//       <Modal show={showAddModal} onHide={handleAddModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Data</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formBasicName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={newData.name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group
//         controlId="formBasicEmail"
//         >
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             name="email"
//             value={newData.email}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleAddModalClose}>
//         Cancel
//       </Button>
//       <Button variant="primary" onClick={handleAdd}>
//         Add
//       </Button>
//     </Modal.Footer>
//   </Modal>
//   <Modal show={showEditModal} onHide={handleEditModalClose}>
//     <Modal.Header closeButton>
//       <Modal.Title>Edit Data</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <Form>
//         <Form.Group controlId="formBasicName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter name"
//             name="name"
//             value={newData.name}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             name="email"
//             value={newData.email}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//       </Form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button variant="secondary" onClick={handleEditModalClose}>
//         Cancel
//       </Button>
//       <Button variant="primary" onClick={handleEdit}>
//         Save Changes
//       </Button>
//     </Modal.Footer>
//   </Modal>
// </>
// );
// }
//  export default EtudImportExcel;
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
// import *as XLSX from "xlsx";
// function EtudImportExcel() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [deleteRowData, setDeleteRowData] = useState([]);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editRowData, setEditRowData] = useState([]);
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryData = e.target.result;
//       const workbook = XLSX.read(binaryData, { type: "binary" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       setData(sheetData);
//       setFilteredData(sheetData.slice(1));
//     };
//     reader.readAsBinaryString(file);
//   };
//   const handleSearch = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);
//     const filteredData = data.slice(1).filter((row) =>
//       row.some((cell) => cell.toString().includes(searchTerm))
//     );
//     setFilteredData(filteredData);
//   };
//   const handleRowClick = (row) => {
//     setIsDeleteDialogOpen(true);
//     setDeleteRowData(row);
//   };
//   const handleDeleteDialogClose = () => {
//     setIsDeleteDialogOpen(false);
//   };
//   const handleDelete = (row) => {
//     const newData = data.filter((r) => r !== row);
//     setData(newData);
//     setFilteredData(newData.slice(1));
//     handleDeleteDialogClose();
//   };
//   const handleEditDialogOpen = (row) => {
//     setIsEditDialogOpen(true);
//     setEditRowData(row);
//   };
//   const handleEditDialogClose = () => {
//     setIsEditDialogOpen(false);
//   };
//   const handleEdit = (editedRow) => {
//     const newData = [...data];
//     newData.shift();
//     newData.unshift([data[0][0], ...editedRow]);
//     setData(newData);
//     setFilteredData(newData.slice(1));
//     handleEditDialogClose();
// };
//   const rowsToDisplay = searchTerm ? filteredData : data.slice(1);
//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <TextField
//         label="Rechercher"
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {data[0]?.map((cell, index) => (
//                 <TableCell key={index}>{cell}</TableCell>
//               ))}
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               rowsToDisplay.map((row, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   {row.map((cell, cellIndex) => (
//                     <TableCell key={cellIndex}>{cell}</TableCell>
//                   ))}
//                   <TableCell>
//                     <IconButton
//                       aria-label="Modifier"
//                       onClick={() => handleEditDialogOpen(row)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       aria-label="Supprimer"
//                       onClick={() => handleRowClick(row)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
//         <DialogTitle>
//           Êtes-vous sûr de vouloir supprimer cette ligne ?
//         </DialogTitle>
//         <DialogContent>
//           {deleteRowData.map((cell, index) => (
//             <div key={index}>
//               {data[0][index]}: {cell}
//             </div>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteDialogClose}>Annuler</Button>
//           <Button onClick={() => handleDelete(deleteRowData)}>Supprimer</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
//         <DialogTitle>Modifier la ligne</DialogTitle>
//         <DialogContent>
//           {editRowData.map((cell, index) => (
//             <TextField
//               key={index}
//               label={data[0][index]}
//               value={cell}
//               onChange={(event) => {
//                 const editedRow = [...editRowData];
//                 editedRow[index] = event.target.value;
//                 setEditRowData(editedRow);
//               }}
//               fullWidth
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose}>Annuler</Button>
//           <Button onClick={() => handleEdit(editRowData)}>Enregistrer</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//     );}    
//           export default EtudImportExcel;
"use strict";