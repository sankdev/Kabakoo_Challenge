const Acad=require('../model/academie.model')
const readXlsxFile = require('read-excel-file/node');
const academieGet=(req,res)=>{

    //const {}=req.body
    Acad.findAll()
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


const  academiePost=(req,res)=>{
const {nom,code,ville,adresse}=req.body 
  Acad.create({
    nom,code,ville,adresse
  }).then(etud=> res.status(201).json({
    error:false,
    data:etud,
    message:" academie ajoutée avec succes"

  })).catch(error=>res.json({
    error:true,
    data:[],
    error:error

  }))
}

const UpdateAcad=async(req,res)=>{
  const id=req.params.id
  const {nom,code,ville,adresse}=req.body 
   await Acad.update({
      
    nom,code,ville,adresse

    },{
      where:{
        id:id
      }
    }).then(upd=>res.status(201).json({
      error:false,
      data:upd,
      message:" academie  a ete modifie"
    })).catch(error=>res.json({
      error:true,
    error:error
    }))
   

}
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
    code: row[1],
    ville: row[2], 
    adresse: row[3] 
  };
  data.push(datas);
});
      Acad.bulkCreate(data)
        .then(() => {
          res.status(200).send({
            message: "Importé  avec succes: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Impossible d Importer!",
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
     Acad.findAll().then((objs) => {
       let tutorials = [];
       objs.forEach((obj) => {
         tutorials.push({
           //id: obj.id,
          
           nom:obj.nom,
           code:obj.code,
           ville: obj.ville,
           adresse:obj.adresse
 
         });
       });
       let workbook = new excel.Workbook();
       let worksheet = workbook.addWorksheet("Tutorials");
       worksheet.columns = [
        // { header: "Id", key: "id", width: 5 },
         { header: "Nom Academie", key: "nom", width: 30 },
         { header: "Code Academie", key: "code", width: 30 },
         { header: "Ville Academie", key: "ville", width: 30 },
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
         "attachment; filename=" + "Academie.xlsx"
       );
       return workbook.xlsx.write(res).then(function () {
         res.status(200).end();
       });
     });
   }
   const deleteAcad = async (req, res) => {
    const id=req.params.id
    try {
      const deleted = await Acad.destroy({where :{id:id}});
      if (!deleted) {
        return res.status(404).send({ error: 'Lycée Introuvable' });
      }
      res.status(201).send({ message: 'Lycée Suprimer avec succes'});
    } catch (error) {
      
      res.send({ message: 'Lycée Supprimer  avec succes ' });
    }
  }

module.exports={UpdateAcad, academieGet,academiePost,upload,downloadFile,deleteAcad}