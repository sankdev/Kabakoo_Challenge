//const EtudiantFam=require('../model/etudiant.famil.model')
const etudLyce=require('../model/Lycee.model.js')
const readXlsxFile = require('read-excel-file/node');
const JSZip = require('jszip');
const LyceeGet=(req,res)=>{

    //const {}=req.body
    etudLyce.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving etudiants.",
      });
    });

}


const  LyceePost=(req,res)=>{
const {nom,abbrev,academie,adresse}=req.body 
  etudLyce.create({
    nom,abbrev,academie,adresse
  }).then(etud=> res.status(201).json({
    error:false,
    data:etud,
    message:" Lycée crée"

  })).catch(error=>res.json({
    error:true,
    data:[],
    error:error

  }))
}

const UpdateLycee=async(req,res)=>{
  const id=req.params.id
  //const {nom,abbrev,academie,adresse}=req.body 
   await etudLyce.update({
    nom:req.body.nom,
    abbrev:req.body.abbrev,
    academie:req.body.academie,
    adresse:req.body.adresse

    },{
      where:{
        id:id
      }
    }).then(upd=>res.status(201).json({
      error:false,
      data:upd,
      message:"  modification effectué!"
    })).catch(error=>res.json({
      error:true,
    error:error
    }))
   

};
// const UpdateLycee = async (req, res) => {
//   try {
//     const user = await etudLyce.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found.'
//       });
//     }
//     await user.update({
//       nom: req.body.nom,
//       abbrev: req.body.abbrev,
//       academie: req.body.academie,
//       adresse:req.body.adresse
//     });
//     res.status(200).json({
//       message: 'User updated successfully.',
//       data: user
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error updating the user.',
//       error: error
//     });
//   }
// };

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let data = [];
      rows.forEach((row) => {
        let datas = {
          
          nom: row[0], 
          abbrev: row[1],
          academie: row[2], 
          adresse:row[3] 

        };
        data.push(datas); 
      });
      etudLyce.bulkCreate(data)
        .then(() => {
          res.status(200).send({
            message: "Fichier Importer: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: " importation impossible !",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "IMPOSSIBLE DE CHARGER !: " + req.file.originalname,
    });
  } 
};
const downloadFile = async(req, res) => {
  // const download = (req, res) => {
     tuto.findAll().then((objs) => {
       let tutorials = [];
       objs.forEach((obj) => {
         tutorials.push({
           //id: obj.id,
          
           nom:obj.nom,
           abbrev:obj.abbrev,
           academie: obj.academie,
           adresse:obj.adresse
           
          
         
 
         });
       });
       let workbook = new excel.Workbook();
       let worksheet = workbook.addWorksheet("Tutorials");
       worksheet.columns = [
        // { header: "Id", key: "id", width: 5 },
         { header: "Nom Lycée", key: "nomLycee", width: 30 },
         { header: "Abbreviation Lycée", key: "abbrev", width: 30 },
         { header: "Academie ", key: "academie", width: 30 },
         { header: "Adresse", key: "adresse", width: 30 },  
           
       ];
       // Add Array Rows
       worksheet.addRows(tutorials);
       res.setHeader(
         "Content-Type",
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
       );
       res.setHeader(
         "Content-Disposition",
         "attachment; filename=" + "Lycee.xlsx"
       );
       return workbook.xlsx.write(res).then(function () {
         res.status(200).end();
       });
     });
   }
   const deleteLycee = async (req, res) => {
    const id=req.params.id
    try {
      const deleted = await etudLyce.destroy({where :{id:id}});
      if (!deleted) {
        return res.status(404).send({ error: 'Lycée Introuvable' });
      }
      res.status(201).send({ message: 'Lycée Suprimer success'});
    } catch (error) {
      
      res.send({ message: error });
    }
  }

module.exports={UpdateLycee,LyceePost,upload,downloadFile,deleteLycee,LyceeGet}


// jszip
// const upload = async (req, res) => {
//   try {
//     if (req.file == undefined) {
//       return res.status(400).send("Please upload a zip file!");
//     }
//     let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
//     let zip = new JSZip();
//     zip.loadAsync(fs.readFileSync(path)).then((archive) => {
//       let file = archive.file("data.xlsx");
//       if (!file) {
//         throw new Error("File 'data.xlsx' not found in archive.");
//       }
//       file.async("nodebuffer").then((xlsxData) => {
//         readXlsxFile(xlsxData).then((rows) => {
//           // skip header
//           rows.shift();
//           let data = [];
//           rows.forEach((row) => {
//             let datas = {
//               nom: row[0],
//               abbrev: row[1],
//               acad: row[2], 
//               adresse: row[3] 
//             };
//             data.push(datas);
//           });
//           etudLyce.bulkCreate(data)
//             .then(() => {
//               res.status(200).send({
//                 message: "File uploaded successfully: " + req.file.originalname,
//               });
//             })
//             .catch((error) => {
//               res.status(500).send({
//                 message: "Failed to import data!",
//                 error: error.message,
//               });
//             });
//         });
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Failed to upload file: " + req.file.originalname,
//     });
//   } 
// };
