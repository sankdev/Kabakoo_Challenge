// import { Button ,TextField} from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useState } from 'react';
// import { v4 as uuid } from 'uuid';
// import * as XLSX from 'xlsx'


// const EtudImportExcel = () => {
//   const [data, setData] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState([]);
//   const [editRowId, setEditRowId] = useState(null);
//   const [editRowValues, setEditRowValues] = useState({});

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
//       const rowData = rows.map((row, index) => {
//         const rowObject = { id: index };
//         headers.forEach((header, index) => {
//           rowObject[header] = row[index];
//         });
//         return rowObject;
//       });
      

//     setData(rowData);

//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleRowDelete = (id) => {
//     setData(data.filter((row) => row.id !== id));
//   };

//   // const handleEditClick = () => {

//   //  setEditMode(true);
//   // setEditRowId(data[0]?.id);
//   // setUpdatedData(data);
//   // };

//   // const handleUpdateClick = () => {
//   //   // save updatedData to the database
//   //   // ...
//   //   setData(updatedData);
//   //   setEditMode(false);
    
//   // };
//   const handleRowUpdate = () => {
//     // find the index of the row being edited in the updatedData array
//     const rowIndex = updatedData.findIndex((row) => row.id === editRowId);
//     if (rowIndex !==-1) {
//       // update the row in the updatedData array
//       const updatedRow = { ...updatedData[rowIndex] };
//       // TODO: update the row fields as needed
//       const newUpdatedData = [...updatedData];
//       newUpdatedData[rowIndex] = updatedRow;
//       setUpdatedData(newUpdatedData);
//       setEditRowId(null);
//     }
//   };
  
//   const handleEditCellChange = (params) => {
//   const { id, field, value } = params;
//   setData((prevData) =>
//     prevData.map((row) => {
//       if (row.id === id) {
//         return { ...row, [field]: value };
//       }
//       return row;
//     })
//   );
// };



//   const columns = data[0] ? Object.keys(data[0]).map((key) => ({ field: key, headerName: key })) : [];
// columns.push({
//   field: 'edit',
//     headerName: 'Edit',
//     width: 100,
//     renderCell: (params) => {
//       const { id } = params.row;
//       return (
//         <Button key={`edit-${id}`} variant="contained" color="primary" onClick={() => handleEditRow(id,params.row)}>
//           Edit
//         </Button>
//       )}
// });
// columns.push({
//   field: 'actions',
//   headerName: 'Actions',
//   sortable: false,
//   filterable: false,
//   renderCell: (params) => (
//     editRowId !== params.row?.id ? (
//       <Button variant="contained" color="error" onClick={() => handleRowDelete(params.row.id)}>Delete</Button>
//     ) : null
//   ),
// });

// const handleSaveEdit = () => {
//   const updatedRowData = data.map((row) => {
//     if (row.id === editRowId) {
//       return {
//         ...row,
//         ...editRowValues,
//       };
//     }
//     return row;
//   });
//   setData(updatedRowData);
//   setEditRowId(null);
//   setEditRowValues({});
// };



// const handleEditClick = (params) => {
// setEditRowId(params.id);
// setEditRowValues(params.row);
// };

// const handleCancelEdit = () => {
// setEditRowId(null);
// setEditRowValues({});
// };

// const rows = data.map((row) => ({
//   ...row,
//   actions: editRowId === row.id ? (
//     <div key={`actions-${row.id}`}>
//       <Button onClick={handleSaveEdit}>Save</Button>
//       <Button onClick={handleCancelEdit}>Cancel</Button>
//     </div>
//   ) : (
//     <div key={`actions-${row.id}`}>
//       <Button onClick={() => handleEditClick({ id: row.id, row })}>Edit</Button>
//     </div>
//   ),
// }));




// const handleEditRow = (id,updatedRowData) => {
//   // Open a dialog or form to edit the row data
//   const row = data.find((row) => row.id === id);
//   // Open a dialog or form to edit the row data, and pass the row data as props
//   // When editing is done, update the row data in the `data` state
//   setData((prevData) =>
//     prevData.map((row) => {
//       if (row.id === id) {
//         return updatedRowData;
//       }
//       return row;
//     })
//   );
// };

// const handleEditRowChange = (event) => {
//   const { name, value } = event.target;
//   setEditRowValues((prevValues) => ({
//     ...prevValues,
//     [name]: value,
//   }));
// };
// // const columnsWithEditButton = columns.concat({
// //   field: 'edit',
// //   headerName: 'Edit',
// //   width: 100,
// //   renderCell: (params) => {
// //     const { id } = params.row;
// //     return (
// //       <Button key={`edit-${id}`} variant="contained" color="primary" onClick={() => handleEditRow(id,params.row)}>
// //         Edit
// //       </Button>
// //     );
// //   },
// // });
//  const editRowInputs = columns.map((column) => (
//       <TextField
//         key={column.field}
//         label={column.headerName}
//         name={column.field}
//         value={editRowValues[column.field] || ''}
//         onChange={handleEditRowChange}
//       />
//     ));

// return (
 
//   <>
//   <Button variant="contained" component="label">
//     Upload File
//     <input type="file" hidden onChange={handleFileSelect} />
//   </Button>
//   <DataGrid rows={rows} columns={columns} />
//   {editRowId && <div>{editRowInputs}</div>}
// </>
// );

       
// };

// export default EtudImportExcel;
// 
// import React, { useState } from "react";
// import { useTable, useSortBy, usePagination } from "react-table";
// import *as XLSX from "xlsx";
// import Dropzone from "react-dropzone";

// const EtudImportExcel = ({ columns, data }) => {
//   const [nonUpdatedData, setNonUpdatedData] = useState(data);
//   const [updatedData, setUpdatedData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: nonUpdatedData,
//       initialState: { pageIndex: 0 },
//     },
//     useSortBy,
//     usePagination
//   );

//   const handleDrop = (acceptedFiles) => {
//     const fileReader = new FileReader();
//     fileReader.readAsBinaryString(acceptedFiles[0]);

//     fileReader.onload = (event) => {
//       const { result } = event.target;
//       const workBook = XLSX.read(result, { type: "binary" });
//       const sheetName = workBook.SheetNames[0];
//       const sheet = workBook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet);

//       setNonUpdatedData(data);
//       setUpdatedData([]);
//     };
//   };

//   const handleUpdateRow = (rowData) => {
//     const mergedData = [
//       ...nonUpdatedData.slice(0, editingIndex),
//       rowData,
//       ...nonUpdatedData.slice(editingIndex + 1),
//       ...updatedData,
//     ];
//     setNonUpdatedData(mergedData);
//     setEditingIndex(null);
//   };

//   const handleCancelEditing = () => {
//     setEditingIndex(null);
//   };
//  console.log(headerGroups)
//  console.log(page)
//   return (
//     <div>
//       <Dropzone onDrop={handleDrop}>
//         {({ getRootProps, getInputProps }) => (
//           <section>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Import Excel file </p>
//             </div>
//           </section>
//         )}
//       </Dropzone>

//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, index) => {
//             prepareRow(row);
//             const isRowInEditMode = editingIndex === index;
//             return (
//               <React.Fragment key={index}>
//                 {isRowInEditMode ? (
//                   <tr>
//                     {row.cells.map((cell, cellIndex) => (
//                       <td key={cellIndex}>
//                         <input
//                           value={cell.value}
//                           onChange={(event) => {
//                             const newValue = event.target.value;
//                             const updatedRow = { ...row.original };
//                             updatedRow[cell.column.id] = newValue;
//                             handleUpdateRow(updatedRow);
//                           }}
//                         />
//                       </td>
//                     ))}
//                     <td>
//                       <button onClick={() => handleUpdateRow(row.original)}>
//                         Save
//                         </button>
//                         <button onClick={() => handleCancelEditing()}>
//                         Cancel
//                         </button>
//                         </td>
//                         </tr>
//                         ) : (
//                         <tr {...row.getRowProps()}>
//                         {row.cells.map((cell, cellIndex) => (
//                         <td {...cell.getCellProps()}>
//                         {cell.render("Cell")}
//                         </td>
//                         ))}
//                         <td>
//                         <button onClick={() => setEditingIndex(index)}>
//                         Edit
//                         </button>
//                         </td>
//                         </tr>
//                         )}
//                         </React.Fragment>
//                         );
//                         })}
//                         </tbody>
//                         </table>
//                         <div>
//                         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//                         {"<<"}
//                         </button>
//                         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//                         {"<"}
//                         </button>
//                         <button onClick={() => nextPage()} disabled={!canNextPage}>
//                         {">"}
//                         </button>
//                         <button
//                         onClick={() => gotoPage(pageCount - 1)}
//                         disabled={!canNextPage}
//                         >
//                         {">>"}
//                         </button>
//                         <span>
//                         Page{" "}
//                         <strong>
//                         {pageIndex + 1} of {pageOptions.length}
//                         </strong>{" "}
//                         </span>
//                         <span>
//                         | Go to page:{" "}
//                         <input
//                         type="number"
//                         defaultValue={pageIndex + 1}
//                         onChange={(event) => {
//                         const pageNumber = event.target.value ? Number(event.target.value) - 1 : 0;
//                         gotoPage(pageNumber);
//                         }}
//                         style={{ width: "50px" }}
//                         />
//                         </span>
//                         </div>
//                         </div>
//                         );
//                         };
                        
//                         export default EtudImportExcel;
                        // un autre component
//                         import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';

// const EtudImportExcel = () => {
//   const [file, setFile] = useState(null);
//   const [updatedData, setUpdatedData] = useState([]);
//   const [nonUpdatedData, setNonUpdatedData] = useState([]);

//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [rowData, setRowData] = useState({});
//   const [tempData, setTempData] = useState([]);

//   const handleUpdate = () => {
//     const newTempData = [...tempData];
//     newTempData[editingIndex] = rowData;
//     setTempData(newTempData);
//     setUpdatedData([...updatedData, rowData]);
//     setEditingIndex(-1);
//     setRowData({});
//   };

//   const handleDelete = (index) => {
//     const newTempData = [...tempData];
//     newTempData.splice(index, 1);
//     setTempData(newTempData);
//   };

//   const handleEdit = (index, row, event) => {
//     const newTempData = [...tempData];
//     newTempData[index][row] = event.target.value;
//     setTempData(newTempData);
//     setEditingIndex(index);
//     setRowData(row);
//   };

//   const handleDrop = (acceptedFiles) => {
//     const reader = new FileReader();

//     reader.onabort = () => console.log('file reading was aborted');
//     reader.onerror = () => console.log('file reading has failed');
//     reader.onload = () => {
//       const binaryStr = reader.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const worksheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[worksheetName];
//       const worksheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       setNonUpdatedData(worksheetData.slice(1));
//       setTempData(worksheetData.slice(1));
//     };

//     reader.readAsBinaryString(acceptedFiles[0]);
//     setFile(acceptedFiles[0]);
//   };

//   const handleSave = () => {
//     // Call your API to save the data to the database
//     // axios.post('/api/save-data', { data }).then((response) => {
//     //   console.log(response);
//     // });
//   };

//   const mergedData = [    ...nonUpdatedData.slice(0, editingIndex),    rowData,    ...nonUpdatedData.slice(editingIndex + 1),    ...updatedData,  ];

//   return (
//     <div>
//       <Dropzone onDrop={handleDrop}>
//         {({ getRootProps, getInputProps }) => (
//           <section>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Import Excel file </p>
           
//               </div>
//               </section>
//             )}
//           </Dropzone>
    
//           {file && (
//             <div>
//               <p>File name: {file.name}</p>
//               <p>Number of rows: {data.length}</p>
              
//               <table>
//                 <thead>
//                   <tr>
//                     {Array.isArray(data[0]) && data[0].map((cell, index) => (
//                       <th key={index}>{cell}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mergedData.map((row, index) => {
//                     const isRowEditing = editingIndex === index;
//                     const nonEditableCells = isRowEditing ? [] : row.slice(0, -1);
//                     const editableCell = isRowEditing ? (
//                       <td key={row.length - 1}>
//                         {Object.values(rowData).map((value, index) => (
//                           <div key={index}>{value}</div>
//                         ))}
//                         <button type='button' onClick={handleUpdate}>Save</button>
//                         <button type='button' onClick={() => setEditingIndex(-1)}>Cancel</button>
//                       </td>
//                     ) : (
//                       <td key={row.length - 1}>
//                         <button type='button' onClick={() => handleEdit(index, row)}>Edit</button>
//                       </td>
//                     );
//                     return (
//                       <tr key={index}>
//                         {nonEditableCells.map((cell, cellIndex) => (
//                           <td key={cellIndex}>{cell}</td>
//                         ))}
//                         {editableCell}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
              
//               <button type='button' onClick={handleSave}>Save to database</button>
//             </div>
//           )}
//         </div>
//       );
//     };
    
//     export default EtudImportExcel;
 
// import React, { useState } from 'react';
// import *as XLSX from 'xlsx';
// import Dropzone from 'react-dropzone';

// const EtudImportExcel = () => {
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState([]);
//   const [tempData, setTempData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleDrop = (acceptedFiles) => {
//     const fileReader = new FileReader();
//     fileReader.readAsArrayBuffer(acceptedFiles[0]);

//     fileReader.onload = (event) => {
//       const buffer = event.target.result;
//       const workbook = XLSX.read(buffer, { type: 'buffer' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       setData(data);
//       setTempData(data);
//       setFile(acceptedFiles[0]);
//       setEditingIndex(null);
//       setIsEditing(false);
//     };
//   };

//   const handleInputChange = (event, columnIndex, row) => {
//     const updatedRow = [...row];
//     updatedRow[columnIndex] = event.target.value;

//     const updatedData = [...tempData];
//     updatedData[data.indexOf(row)] = updatedRow;

//     setTempData(updatedData);
//   };

//   const handleEdit = (index, row) => {
//     setEditingIndex(index);
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setTempData(data);
//     setEditingIndex(null);
//     setIsEditing(false);
//   };

//   const handleSaveEdit = () => {
//     setData((prevState) =>
//       prevState.map((row, index) =>
//         index === editingIndex ? tempData[index] : row
//       )
//     );
//     setEditingIndex(null);
//     setIsEditing(false);
//   };
  

//   const handleDelete = (index) => {
//     const updatedData = [...data];
//     updatedData.splice(index, 1);
//     setData(updatedData);
//     setTempData(updatedData);
//   };

//   const handleSave = () => {
//     // TODO: Save data to server or do other processing
//     console.log('Data saved:', data);
//   };

//   const handleShowChanges = () => {
//     const modifiedData = tempData.filter((row, index) => {
//       return JSON.stringify(row) !== JSON.stringify(data[index]);
//     });

//     const unchangedData = data.filter((row, index) => {
//       return JSON.stringify(row) === JSON.stringify(tempData[index]);
//     });

//     console.log('Modified Data:', modifiedData);
//     console.log('Unchanged Data:', unchangedData);
//   };

//   return (
//     <div>
//       <Dropzone onDrop={handleDrop}>
//         {({ getRootProps, getInputProps }) => (
//           <section>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Import Excel file </p>
//             </div>
//           </section>
//         )}
//       </Dropzone>

//       {file && (
//         <div>
//           <p>File name: {file.name}</p>
//           <p>Number of rows: {data.length}</p>

//           <button onClick={handleShowChanges}>Voir les modifications</button>

//           <table>
//             <thead>
//               <tr>
//                 {Array.isArray(data[0]) &&
//                   data[0].map((cell, index) => <th key={index}>{cell}</th>)}
//                 <th>Edit/Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => ( <tr key={index}>
//                 {Array.isArray(row) &&
//                   row.map((cell, index) => (
//                     <td key={index}>
//                       <input
//                         type="text"
//                         name={index}
//                         value={cell}
//                         onChange={(event) =>
//                           handleInputChange(event, index, row)
//                         }
//                         readOnly={!isEditing || editingIndex !== index}
//                       />
//                     </td>
//                   ))}
//                 <td>
//                   {isEditing && editingIndex === index ? (
//                     <div>
//                       <button onClick={() => handleSaveEdit()}>Save</button>
//                       <button onClick={() => handleCancelEdit()}>Cancel</button>
//                     </div>
//                   ) : (
//                     <div>
//                       <button onClick={() => handleEdit(index, row)}>Edit</button>
//                       <button onClick={() => handleDelete(index)}>Delete</button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={() => handleSave()}>Save</button>
//       </div>
//     )}
//   </div>
// );
// };

//  export default EtudImportExcel;
 //  import React, { useState } from 'react';
//  import * as XLSX from 'xlsx';
//  import Dropzone from 'react-dropzone';
//  import axios from 'axios';
 
//  const EtudImportExcel = () => {
//    const [file, setFile] = useState(null);
//    const [data, setData] = useState([]);
//    const [editingIndex, setEditingIndex] = useState(null);
//    const [rowData, setRowData] = useState([]);
//    const [initialData, setInitialData] = useState([]); // Copie du tableau initial
//    const [editedData, setEditedData] = useState(null);
//    const handleDrop = (acceptedFiles) => {
//      const reader = new FileReader();
//      reader.onload = () => {
//        const binaryStr = reader.result;
//        const workBook = XLSX.read(binaryStr, { type: "binary" });
//        const workSheetName = workBook.SheetNames[0];
//        const workSheet = workBook.Sheets[workSheetName];
//        const jsonData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
//        setData(jsonData);
//        setInitialData(jsonData.slice()); // Copie du tableau initial
//      };
//      reader.readAsBinaryString(acceptedFiles[0]);
//      setFile(acceptedFiles[0]);
//    };
 
//    const handleEdit = (index, row) => {
//      setEditingIndex(index);
//      setRowData(row);
//    };
 
//    const handleCancelEdit = () => {
//      setEditingIndex(null);
//      setRowData([]);
//    };
 
//    const handleInputChange = (event) => {
//      const { name, value } = event.target;
//      setRowData((rowData) => ({ ...rowData, [name]: value }));
//    };
 
//    const handleSaveEdit = () => {
//      setData((data) => {
//        const newData = data.slice();
//        newData[editingIndex + 1] = rowData; // Mettre à jour la copie du tableau initial
//        return newData;
//      });
//      setInitialData((initialData) => {
//        const newData = initialData.slice();
//        newData[editingIndex + 1] = rowData; // Mettre à jour la copie du tableau initial
//        return newData;
//      });
//      setEditingIndex(null);
//      setRowData([]);
//    };
 
//    const handleDelete = (index) => {
//      setData((data) => {
//        const newData = data.slice();
//        newData.splice(index + 1, 1); // Supprimer la ligne du tableau initial
//        return newData;
//      });
//      setInitialData((initialData) => {
//        const newData = initialData.slice();
//        newData.splice(index + 1, 1); // Supprimer la ligne du tableau initial
//        return newData;
//      });
//    };
 
//    const handleSave = () => {
//      const workSheet = XLSX.utils.json_to_sheet(initialData);
//      const workBook = XLSX.utils.book_new();
//      XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
//      XLSX.writeFile(workBook, "data.xlsx");
//    };
 
//    return (
//      <div>
//        <Dropzone onDrop={handleDrop}>
//          {({ getRootProps, getInputProps }) => (
//            <section>
//              <div {...getRootProps()}>
//                <input {...getInputProps()} />
//                <p>Import Excel file </p>
//              </div>
//            </section>
//          )}
//        </Dropzone>
 
//        {file && (
//          <div>
//            <p>File name:{data.name}</p>
//            {data && data.length > 0 && (
//              <p>Number of rows: {data.length}</p>
//          )}
         
//            <table>
//            <thead>
//              <tr>
//                {Array.isArray(data[0]) &&
//                  data[0].map((cell, index) => <th key={index}>{cell}</th>)}
//                <th>Edit/Delete</th>
//              </tr>
//            </thead>
//            <tbody>
//              {data.slice(1).map((row, index) => (
//                <tr key={index}>
//                  {Array.isArray(row) &&
//                    row.map((cell, cellIndex) => (
//                      <td key={cellIndex}>
//                        {editingIndex === index ? (
//                          <input
//                            type='text'
//                            name={cellIndex}
//                            value={rowData[cellIndex] || ''}
//                            onChange={handleInputChange}
//                          />
//                        ) : (
//                          cell
//                        )}
//                      </td>
//                    ))}
//                  <td>
//                    {editingIndex === index ? (
//                      <>
//                        <button onClick={() => handleSaveEdit()}>Save</button>
//                        <button onClick={() => handleCancelEdit()}>Cancel</button>
//                      </>
//                    ) : (
//                      <>
//                        <button onClick={() => handleEdit(index, row)}>Edit</button>
//                        <button onClick={() => handleDelete(index)}>Delete</button>
//                      </>
//                    )}
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
   
//          <button onClick={() => handleSave()}>Save data</button>
   
//          {editedData.length > 0 && (
//            <>
//              <h2>Modified Rows:</h2>
//              <table>
//                <thead>
//                  <tr>
//                    {editedData[0].map((cell, index) => (
//                      <th key={index}>{cell}</th>
//                    ))}
//                  </tr>
//                </thead>
//                <tbody>
//                  {editedData.slice(1).map((row, index) => (
//                    <tr key={index}>
//                      {row.map((cell, cellIndex) => (
//                        <td key={cellIndex}>{cell}</td>
//                      ))}
//                    </tr>
//                  ))}
//                </tbody>
//              </table>
//            </>
//          )}
//        </div>
//      )}
//    </div>
//    )}  
//   export default EtudImportExcel;           


//  ici commence un autre tableu
//  import React, { useState } from "react";
//  import { Button } from "react-bootstrap";
//  import { ExcelRenderer } from "react-excel-renderer";
//  import XLSX from "xlsx";
//  import ReactTable from "react-table-6";
//  import 'react-table-6/react-table'
//  import "react-table-6/react-table.css";
 
//  const EtudImportExcel = () => {
//    const [rows, setRows] = useState([]);
//    const [columns, setColumns] = useState([]);
//    const [showTable, setShowTable] = useState(false);
 
//    const handleFileChange = (event) => {
//      const fileObj = event.target.files[0];
//      ExcelRenderer(fileObj, (err, resp) => {
//        if (err) {
//          console.log(err);
//        } else {
//          // Add the 'id' property to each row object
//          const newRows = resp.rows.map((row, index) => ({ id: index, ...row }));
//          setColumns(resp.cols);
//          setRows(newRows);
//          setShowTable(true);
//        }
//      });
//    };
 
//    const handleUpdate = (newData,id) => {
//     const newRows = rows.map((row) => {
//       if (row.id && row.id === newData.id) {
//         return {
//           ...row,
//           ...newData,
//         };
//       }
//       return row;
//     });
//     setRows(newRows);
//   };
  
 
//    const handleDelete = (id) => {
//      const newRows = rows.filter((row) => row.id !== id);
//      setRows(newRows);
//    };
 
//    const columnsTable = columns.map((column, index) => ({
//      Header: typeof column === 'string' ? column : '',
//      accessor: index.toString(),
//    }));
   
//    return (
//      <>
//        <input type="file" onChange={handleFileChange} />
//        {showTable && (
//          <>
//            <ReactTable
//              data={rows}
//              columns={[
//                ...columnsTable,
//                {
//                  Header: "Actions",
//                  Cell: (props) => (
//                    <>
//                      <Button
//                        variant="warning"
//                        size="sm"
//                        onClick={() => handleUpdate(props.original)}
//                      >
//                        Edit
//                      </Button>{" "}
//                      <Button
//                        variant="danger"
//                        size="sm"
//                        onClick={() => handleDelete(props.row.id)}
//                      >
//                        Delete
//                      </Button>
//                    </>
//                  ),
//                },
//              ]}
//              defaultPageSize={10}
//              className="-striped -highlight"
//            />
//          </>
//        )}
//      </>
//    );
//  };
 
//  export default EtudImportExcel;
 
// import React, { useState } from 'react';
// import  readXlsxFile  from 'read-excel-file';
// import MaterialTable from 'material-table';

// function EtudImportExcel() {
//   const [data, setData] = useState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     readXlsxFile(file).then((rows) => {
//       setData(rows.slice(1));
//     });
//   };

//   const handleRowUpdate = (newData, oldData) => {
//     setData((prevData) => {
//       const data = [...prevData];
//       const index = data.indexOf(oldData);
//       data[index] = newData;
//       return data;
//     });
//   };

//   const handleRowDelete = (oldData) => {
//     setData((prevData) => {
//       const data = [...prevData];
//       const index = data.indexOf(oldData);
//       data.splice(index, 1);
//       return data;
//     });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <MaterialTable
//         title="Excel Data"
//         data={data}
//         columns={data[0]?.map((cell, index) => ({
//           title: cell,
//           field: `col${index}`,
//         }))}
//         editable={{
//           onRowUpdate: handleRowUpdate,
//           onRowDelete: handleRowDelete,
//         }}
//       />
//     </div>
//   );
// }

// export default EtudImportExcel;

// DATA Grid Table
// fichier excel
// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { Button, TextField } from '@mui/material';

// function EtudImportExcel() {
//   const [excelData, setExcelData] = useState([]);
//   const [editingRowIndex, setEditingRowIndex] = useState(-1);

//   const handleExcelFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       setExcelData(excelData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleCellChange = (event, rowIndex, cellIndex) => {
//     const { value } = event.target;
//     const newExcelData = excelData.map((row, i) => {
//       if (i === rowIndex) {
//         const newRow = [...row];
//         newRow[cellIndex] = value;
//         return newRow;
//       }
//       return row;
//     });
//     setExcelData(newExcelData);
//   };

//   const handleEditRow = (rowIndex) => {
//     setEditingRowIndex(rowIndex);
//   };

//   const handleSaveRow = (rowIndex) => {
//     setEditingRowIndex(-1);
//   };

//   return (
//     <div>
//       <Button variant="contained" component="label">
//         Importer un fichier Excel
//         <input type="file" hidden onChange={handleExcelFileUpload} />
//       </Button>
//       {excelData.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               {excelData[0].map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {excelData.slice(1).map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((cell, cellIndex) => (
//                   <td key={cellIndex}>
//                     {editingRowIndex === rowIndex ? (
//                       <TextField
//                         value={cell}
//                         onChange={(event) =>
//                           handleCellChange(event, rowIndex, cellIndex)
//                         }
//                       />
//                     ) : (
//                       cell
//                     )}
//                   </td>
//                 ))}
//                 <td>
//                   {editingRowIndex === rowIndex ? (
//                     <Button onClick={() => handleSaveRow(rowIndex)}>
//                       Enregistrer
//                     </Button>
//                   ) : (
//                     <Button onClick={() => handleEditRow(rowIndex)}>
//                       Modifier
//                     </Button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default EtudImportExcel;
// popup 
// <Button variant="contained" onClick={handleCheckMatriculeClick}>
//   Check Matricule
// </Button>
// <Popup open={popupMessage !== ""} onClose={() => setPopupMessage("")}>
//   <Box sx={{ p: 2 }}>{popupMessage}</Box>
// </Popup>
// const handleCheckMatriculeClick = () => {
//   const matriculeToCheck = generateMatriculeToCheck();
//   if (matricules.includes(matriculeToCheck)) {
//     setPopupMessage(`Matricule ${matriculeToCheck} is valid`);
//   } else {
//     setPopupMessage(`Matricule ${matriculeToCheck} is invalid`);
//   }
// };

// <Box sx={{ display: "flex", alignItems: "center" }}>
// <TextField
//   label="Matricule"
//   value={inputMatricule}
//   onChange={(event) => setInputMatricule(event.target.value)}
// />
// <Button variant="outlined" color="info"onClick={handleVerifyMatriculeClick}>
// Verifier Matricule
// </Button>
// <Popover open={popupMessage !== ""} onClose={() => setPopupMessage("")}>
//   <Box sx={{ p: 2 }}>{popupMessage}</Box>
// </Popover>
// </Box>

import React, { useState, useRef } from "react";
import { Button, Popper, TextField } from "@material-ui/core";

const  MatriculeVerifier=(props)=> {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckClick = (props) => {
    const matriculeExists = props.matricules.includes(inputValue);
    alert(`Le matricule ${inputValue} ${matriculeExists ? "existe" : "n'existe pas"}`);
    setInputValue("");
    setOpen(false);
  };

  return (
    <div>
      <Button ref={anchorRef} onClick={handleToggle}>
        Vérifier un matricule
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" disablePortal>
        <div>
          <TextField label="Matricule" value={inputValue} onChange={handleInputChange} />
          <Button onClick={handleCheckClick}>Vérifier</Button>
        </div>
      </Popper>
    </div>
  );
}

export default MatriculeVerifier;
