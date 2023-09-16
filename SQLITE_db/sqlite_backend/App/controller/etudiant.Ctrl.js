//const db = require("../../models");
const db=require('../db/conection')
const tuto=require('../model/etudiant.model')
const excel=require('exceljs')
//const Tutorial = tuto.tutorials;
const path=require('path')
const readXlsxFile = require("read-excel-file/node");

//const Tutorial = require('../model/tutorial.model');
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
          codeControl:row[0],
          matricules:row[1],
          matriculeBac:row[2],
          nom: row[3],
          prenom: row[4],
          sexe:row[5],
          nationalite:row[6],
          codeNationalite:row[7],

          dateNaissance:row[8],
          nomMere:row[9],
          prenomMere:row[10],
          nomPere:row[11],
          prenomPere:row[12],
          matriculeDef:row[13],
          sessiomDef:row[14],
          centreExamenDef:row[15],
          sessionBac:row[16],
          mentionBac:row[17],
          serieBac:row[18],
          placeNum:row[19],
          status:row[20],
          moyenneBac:row[21],
          lieuNaissance:row[22],
          scolariteLyc:row[23],
          centreExamenBac:row[24],
          inscriptibilite:row[25],
          academie:row[26],
          lycee:row[27]


        };
        data.push(datas);
      });
      tuto.bulkCreate(data)
        .then(() => {
          res.status(200).send({
            message: "importation  avec succes !: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "importation impossible dans la base!",
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

const getTutorials = (req, res) => {
  tuto.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
const downloadFile = async(req, res) => {
 // const download = (req, res) => {
    tuto.findAll().then((objs) => {
      let data = [];
      objs.forEach((obj) => {
        data.push({
          //id: obj.id,
          codeControl:obj.codeControl,
          matricules:obj.matricules,
          matriculeBac:obj.matriculeBac,
          nom:obj.nom,
          prenom: obj.prenom,
          sexe:obj.sexe,
          nationalite:obj.nationalite,
          codeNationalite:obj.codeNationalite,

          dateNaissance:obj.dateNaissance,
          nomMere:obj.nomMere,
          prenomMere:obj.prenomMere,
          nomPere:obj.nomPere,
          prenomPere:obj.prenomPere,
          matriculeDef:obj.matriculeDef,
          sessiomDef:obj.sessiomDef,
          centreDef:obj.centreDef,
          sessionBac:obj.sessionBac,
          mentionBac:obj.mentionBac,
          serieBac:obj.serieBac,
          placeNum:obj.placeNum,
          status:obj.status,
          moyenneBac:obj.moyenneBac,
          lieuNaissance:obj.lieuNaissance,
          scolariteLyc:obj.scolariteLyc,
          centreBac:obj.centreBac,
          inscriptibilite:obj.inscriptibilite,
          academie:obj.academie,
          lycee:obj.lycee

        });
      });
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("data");
      worksheet.columns = [
       // { header: "Id", key: "id", width: 5 },
       { header: "Code Control", key: "codeControl", width: 30 },
       { header: "Matricules etudiant", key: "matricules", width: 30 },
        { header: "Matricule Bac", key: "matriculeBac", width: 30 },,
        ,
        { header: "Nom", key: "nom", width: 30 },
        { header: "Prenom", key: "prenom", width: 30 },
        { header: "Sexe", key: "sexe", width: 30 },
        { header: "Nationalite", key: "nationalite", width: 30 },
        { header: "Code Nationalite", key: "codeNationalite", width: 30 },

        { header: "Date Naissance", key: "dateNaissance", width: 30 },
        { header: "Nom Mere", key: "nomMere", width: 30 },
        { header: "Prenom Mere", key: "prenomMere", width: 30 },
        { header: "Nom Pere", key: "nomPere", width: 30 },
        { header: "Prenom Pere", key: "prenomPere", width: 30 },
        { header: "Matricule Def", key: "matriculeDef", width: 30 },
        { header: "Session Def", key:"sessionDef", width: 30 },
        { header: "Centre Def ", key:"centreExamenDef", width: 30 },
        { header: "Session Bac", key:"sessionBac", width: 30 },
        { header: "Mention Bac", key:"mentionBac", width: 30 },
        { header: "Serie Bac", key:"serieBac", width: 30 },
        { header: "Place Numero", key: "placeNum", width: 30 },
        { header: "Status", key: "status", width: 30 },
        { header: "Moyenne Bac", key: "moyenneBac", width: 30 },
        { header: "Lieu Naissance", key:"lieuNaissance", width: 30 },
        { header: "Scolarite Lycee", key:"scolariteLyc", width: 30 },
        { header: "Centre Bac", key:"centreExamenBac", width: 30 },
        { header: "Inscriptibilite", key: "inscriptibilite", width: 30 },
        { header: "Academie", key:"academie", width: 30 },
        { header: "Lycee", key: "lycee", width: 30 },

       

          
          
      ];
      // Add Array Rows
      worksheet.addRows(data);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Etudiant.xlsx"
      );
      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    });
  }
  const etudPost = async (req, res) => {
       try {
        const { codeControl, matricules, data } = req.body;
      console.log(codeControl,matricules,data)
        if (!data || !codeControl || !matricules) {
          throw new Error("Invalid input.");
        }
    
        const createdRows = [];
    
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
    
          const etudiant = {
            codeControl: codeControl[i],
            matricules: matricules[i],
           
            matriculeBac: row[0],
            nom: row[1],
            prenom: row[2],
            sexe: row[3],
            nationalite: row[4],
            codeNationalite: row[5],
            dateNaissance: row[6],
            nomMere: row[7],
            prenomMere: row[8],
            nomPere: row[9],
            prenomPere: row[10],
            matriculeDef: row[11],
            sessionDef: row[12],
            centreDef: row[13],
            sessionBac: row[14],
            mentionBac: row[15],
            serieBac: row[16],
            placeNum: row[17],
            status: row[18],
            moyenneBac: row[19],
            lieuNaissance: row[20],
            scolariteLyc: row[21],
            centreBac: row[22],
            inscriptibilite: row[23],
            academie: row[24],
            lycee: row[25],
            
          };
    
          const createdRow = await tuto.create(etudiant);
          createdRows.push(createdRow);
        }
    
        res.status(201).send({
          message: "Data successfully uploaded!",
          rowsCreated: createdRows.length,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while uploading the data.");
      }
    };
   
  
  
    const UpdateEtud=async(req,res)=>{
      const id=req.params.id
      const {codeControl,matricules,matriculeBac,
        nom, prenom,sexe,nationalite,codeNationalite, dateNaissance, nomMere,prenomMere,nomPere,
        prenomPere,matriculeDef,sessiomDef,centreExamenDef,sessionBac,mentionBac,
        serieBac,placeNum,status,moyenneBac,lieuNaissance,scolariteLyc,centreExamenBac,inscriptibilite,academie,lycee}=req.body 
       await tuto.update({
        codeControl,matricules,
        matriculeBac,nom, prenom,sexe,nationalite,codeNationalite,dateNaissance, nomMere,prenomMere,nomPere,
      prenomPere,matriculeDef,sessiomDef,centreExamenDef,sessionBac,mentionBac,
      serieBac,placeNum,status,moyenneBac,lieuNaissance,scolariteLyc,centreExamenBac,inscriptibilite,academie,lycee
    
        },{
          where:{
            id:id
          }
        }).then(upd=>res.status(201).json({
          error:false,
          data:upd,
          message:" Etudiant a ete modifie"
        })).catch(error=>res.json({
          error:true,
        error:error
        }))
       
    
    }
    
  //  const Update=async(req,res)=>{

  //   try {
  //     const etud= await tuto.findByPk(req.params.id)
  //        await etud.update(req.body)
  //        res.status(200).send(etud)

  //   } catch (error) {
  //     res.status(400).send(error);
  //   }

  //  }

   const deleteEtudiant = async (req, res) => {
    const id=req.params.id
    try {
      const deleted = await tuto.destroy({where :{id:id}});
      if (!deleted) {
        return res.status(404).send({ error: 'Etudiant Introuvable' });
      }
      res.status(201).send({ message: 'Etudiant Supprimer avec Succes'});
    } catch (error) {
      
      res.send({ message: error });
    }
  }

module.exports = {
  upload,
  getTutorials,
  downloadFile,
  etudPost,UpdateEtud,deleteEtudiant
};
