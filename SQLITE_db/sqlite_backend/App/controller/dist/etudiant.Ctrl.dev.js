"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//const db = require("../../models");
var db = require('../db/conection');

var tuto = require('../model/etudiant.model');

var excel = require('exceljs'); //const Tutorial = tuto.tutorials;


var path = require('path');

var readXlsxFile = require("read-excel-file/node"); //const Tutorial = require('../model/tutorial.model');


var upload = function upload(req, res) {
  var _path;

  return regeneratorRuntime.async(function upload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(req.file == undefined)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Please upload an excel file!"));

        case 3:
          _path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
          readXlsxFile(_path).then(function (rows) {
            // skip header
            rows.shift();
            var data = [];
            rows.forEach(function (row) {
              var datas = {
                codeControl: row[0],
                matricules: row[1],
                matriculeBac: row[2],
                nom: row[3],
                prenom: row[4],
                sexe: row[5],
                nationalite: row[6],
                codeNationalite: row[7],
                dateNaissance: row[8],
                nomMere: row[9],
                prenomMere: row[10],
                nomPere: row[11],
                prenomPere: row[12],
                matriculeDef: row[13],
                sessiomDef: row[14],
                centreExamenDef: row[15],
                sessionBac: row[16],
                mentionBac: row[17],
                serieBac: row[18],
                placeNum: row[19],
                status: row[20],
                moyenneBac: row[21],
                lieuNaissance: row[22],
                scolariteLyc: row[23],
                centreExamenBac: row[24],
                inscriptibilite: row[25],
                academie: row[26],
                lycee: row[27]
              };
              data.push(datas);
            });
            tuto.bulkCreate(data).then(function () {
              res.status(200).send({
                message: "importation  avec succes !: " + req.file.originalname
              });
            })["catch"](function (error) {
              res.status(500).send({
                message: "importation impossible dans la base!",
                error: error.message
              });
            });
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            message: "IMPOSSIBLE DE CHARGER !: " + req.file.originalname
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getTutorials = function getTutorials(req, res) {
  tuto.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

var downloadFile = function downloadFile(req, res) {
  return regeneratorRuntime.async(function downloadFile$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // const download = (req, res) => {
          tuto.findAll().then(function (objs) {
            var data = [];
            objs.forEach(function (obj) {
              data.push({
                //id: obj.id,
                codeControl: obj.codeControl,
                matricules: obj.matricules,
                matriculeBac: obj.matriculeBac,
                nom: obj.nom,
                prenom: obj.prenom,
                sexe: obj.sexe,
                nationalite: obj.nationalite,
                codeNationalite: obj.codeNationalite,
                dateNaissance: obj.dateNaissance,
                nomMere: obj.nomMere,
                prenomMere: obj.prenomMere,
                nomPere: obj.nomPere,
                prenomPere: obj.prenomPere,
                matriculeDef: obj.matriculeDef,
                sessiomDef: obj.sessiomDef,
                centreDef: obj.centreDef,
                sessionBac: obj.sessionBac,
                mentionBac: obj.mentionBac,
                serieBac: obj.serieBac,
                placeNum: obj.placeNum,
                status: obj.status,
                moyenneBac: obj.moyenneBac,
                lieuNaissance: obj.lieuNaissance,
                scolariteLyc: obj.scolariteLyc,
                centreBac: obj.centreBac,
                inscriptibilite: obj.inscriptibilite,
                academie: obj.academie,
                lycee: obj.lycee
              });
            });
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet("data");
            worksheet.columns = [// { header: "Id", key: "id", width: 5 },
            {
              header: "Code Control",
              key: "codeControl",
              width: 30
            }, {
              header: "Matricules etudiant",
              key: "matricules",
              width: 30
            }, {
              header: "Matricule Bac",
              key: "matriculeBac",
              width: 30
            },,, {
              header: "Nom",
              key: "nom",
              width: 30
            }, {
              header: "Prenom",
              key: "prenom",
              width: 30
            }, {
              header: "Sexe",
              key: "sexe",
              width: 30
            }, {
              header: "Nationalite",
              key: "nationalite",
              width: 30
            }, {
              header: "Code Nationalite",
              key: "codeNationalite",
              width: 30
            }, {
              header: "Date Naissance",
              key: "dateNaissance",
              width: 30
            }, {
              header: "Nom Mere",
              key: "nomMere",
              width: 30
            }, {
              header: "Prenom Mere",
              key: "prenomMere",
              width: 30
            }, {
              header: "Nom Pere",
              key: "nomPere",
              width: 30
            }, {
              header: "Prenom Pere",
              key: "prenomPere",
              width: 30
            }, {
              header: "Matricule Def",
              key: "matriculeDef",
              width: 30
            }, {
              header: "Session Def",
              key: "sessionDef",
              width: 30
            }, {
              header: "Centre Def ",
              key: "centreExamenDef",
              width: 30
            }, {
              header: "Session Bac",
              key: "sessionBac",
              width: 30
            }, {
              header: "Mention Bac",
              key: "mentionBac",
              width: 30
            }, {
              header: "Serie Bac",
              key: "serieBac",
              width: 30
            }, {
              header: "Place Numero",
              key: "placeNum",
              width: 30
            }, {
              header: "Status",
              key: "status",
              width: 30
            }, {
              header: "Moyenne Bac",
              key: "moyenneBac",
              width: 30
            }, {
              header: "Lieu Naissance",
              key: "lieuNaissance",
              width: 30
            }, {
              header: "Scolarite Lycee",
              key: "scolariteLyc",
              width: 30
            }, {
              header: "Centre Bac",
              key: "centreExamenBac",
              width: 30
            }, {
              header: "Inscriptibilite",
              key: "inscriptibilite",
              width: 30
            }, {
              header: "Academie",
              key: "academie",
              width: 30
            }, {
              header: "Lycee",
              key: "lycee",
              width: 30
            }]; // Add Array Rows

            worksheet.addRows(data);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=" + "Etudiant.xlsx");
            return workbook.xlsx.write(res).then(function () {
              res.status(200).end();
            });
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var etudPost = function etudPost(req, res) {
  var _req$body, codeControl, matricules, data, createdRows, i, row, etudiant, createdRow;

  return regeneratorRuntime.async(function etudPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, codeControl = _req$body.codeControl, matricules = _req$body.matricules, data = _req$body.data;
          console.log(codeControl, matricules, data);

          if (!(!data || !codeControl || !matricules)) {
            _context3.next = 5;
            break;
          }

          throw new Error("Invalid input.");

        case 5:
          createdRows = [];
          i = 0;

        case 7:
          if (!(i < data.length)) {
            _context3.next = 17;
            break;
          }

          row = data[i];
          etudiant = {
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
            lycee: row[25]
          };
          _context3.next = 12;
          return regeneratorRuntime.awrap(tuto.create(etudiant));

        case 12:
          createdRow = _context3.sent;
          createdRows.push(createdRow);

        case 14:
          i++;
          _context3.next = 7;
          break;

        case 17:
          res.status(201).send({
            message: "Data successfully uploaded!",
            rowsCreated: createdRows.length
          });
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send("An error occurred while uploading the data.");

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

var UpdateEtud = function UpdateEtud(req, res) {
  var id, _req$body2, codeControl, matricules, matriculeBac, nom, prenom, sexe, nationalite, codeNationalite, dateNaissance, nomMere, prenomMere, nomPere, prenomPere, matriculeDef, sessiomDef, centreExamenDef, sessionBac, mentionBac, serieBac, placeNum, status, moyenneBac, lieuNaissance, scolariteLyc, centreExamenBac, inscriptibilite, academie, lycee;

  return regeneratorRuntime.async(function UpdateEtud$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, codeControl = _req$body2.codeControl, matricules = _req$body2.matricules, matriculeBac = _req$body2.matriculeBac, nom = _req$body2.nom, prenom = _req$body2.prenom, sexe = _req$body2.sexe, nationalite = _req$body2.nationalite, codeNationalite = _req$body2.codeNationalite, dateNaissance = _req$body2.dateNaissance, nomMere = _req$body2.nomMere, prenomMere = _req$body2.prenomMere, nomPere = _req$body2.nomPere, prenomPere = _req$body2.prenomPere, matriculeDef = _req$body2.matriculeDef, sessiomDef = _req$body2.sessiomDef, centreExamenDef = _req$body2.centreExamenDef, sessionBac = _req$body2.sessionBac, mentionBac = _req$body2.mentionBac, serieBac = _req$body2.serieBac, placeNum = _req$body2.placeNum, status = _req$body2.status, moyenneBac = _req$body2.moyenneBac, lieuNaissance = _req$body2.lieuNaissance, scolariteLyc = _req$body2.scolariteLyc, centreExamenBac = _req$body2.centreExamenBac, inscriptibilite = _req$body2.inscriptibilite, academie = _req$body2.academie, lycee = _req$body2.lycee;
          _context4.next = 4;
          return regeneratorRuntime.awrap(tuto.update({
            codeControl: codeControl,
            matricules: matricules,
            matriculeBac: matriculeBac,
            nom: nom,
            prenom: prenom,
            sexe: sexe,
            nationalite: nationalite,
            codeNationalite: codeNationalite,
            dateNaissance: dateNaissance,
            nomMere: nomMere,
            prenomMere: prenomMere,
            nomPere: nomPere,
            prenomPere: prenomPere,
            matriculeDef: matriculeDef,
            sessiomDef: sessiomDef,
            centreExamenDef: centreExamenDef,
            sessionBac: sessionBac,
            mentionBac: mentionBac,
            serieBac: serieBac,
            placeNum: placeNum,
            status: status,
            moyenneBac: moyenneBac,
            lieuNaissance: lieuNaissance,
            scolariteLyc: scolariteLyc,
            centreExamenBac: centreExamenBac,
            inscriptibilite: inscriptibilite,
            academie: academie,
            lycee: lycee
          }, {
            where: {
              id: id
            }
          }).then(function (upd) {
            return res.status(201).json({
              error: false,
              data: upd,
              message: " Etudiant a ete modifie"
            });
          })["catch"](function (error) {
            return res.json(_defineProperty({
              error: true
            }, "error", error));
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //  const Update=async(req,res)=>{
//   try {
//     const etud= await tuto.findByPk(req.params.id)
//        await etud.update(req.body)
//        res.status(200).send(etud)
//   } catch (error) {
//     res.status(400).send(error);
//   }
//  }


var deleteEtudiant = function deleteEtudiant(req, res) {
  var id, deleted;
  return regeneratorRuntime.async(function deleteEtudiant$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(tuto.destroy({
            where: {
              id: id
            }
          }));

        case 4:
          deleted = _context5.sent;

          if (deleted) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).send({
            error: 'Etudiant Introuvable'
          }));

        case 7:
          res.status(201).send({
            message: 'Etudiant Supprimer avec Succes'
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          res.send({
            message: _context5.t0
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  upload: upload,
  getTutorials: getTutorials,
  downloadFile: downloadFile,
  etudPost: etudPost,
  UpdateEtud: UpdateEtud,
  deleteEtudiant: deleteEtudiant
};