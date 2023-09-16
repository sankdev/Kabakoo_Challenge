import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Minimal UI </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
};

// import { Button } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useState } from 'react';
// import { v4 as uuid } from 'uuid';
// import * as XLSX from 'xlsx';
// import axios from 'axios';

// const EtudImportExcel = () => {
//   const [data, setData] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState([]);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryData = e.target.result;
//       const workbook = XLSX.read(binaryData, { type: 'binary' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       const headers = sheetData[0];
//       const rows = sheetData.slice(1);
//       const rowData = rows.map((row) => {
//         const rowObject = { id: uuid() };
//         headers.forEach((header, index) => {
//           rowObject[header] = row[index];
//         });
//         return rowObject;
//       });
//       setData(rowData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleRowDelete = async (id) => {
//     try {
//       await axios.delete(`/api/rows/${id}`); // replace with your API endpoint
//       setData(data.filter((row) => row.id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditClick = () => {
//     setEditMode(true);
//     setUpdatedData(data);
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await Promise.all(updatedData.map(row => axios.put(`/api/rows/${row.id}`, row))); // replace with your API endpoint
//       setEditMode(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columns = data[0] ? Object.keys(data[0]).map((key) => ({ field: key, headerName: key })) : [];
//   columns.push({
//     field: 'actions',
//     headerName: 'Actions',
//     sortable: false,
//     filterable: false,
//     renderCell: (params) => (
//       <Button variant="contained
