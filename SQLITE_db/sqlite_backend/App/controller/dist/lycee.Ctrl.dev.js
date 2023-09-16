"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//const EtudiantFam=require('../model/etudiant.famil.model')
var etudLyce = require('../model/Lycee.model.js');

var readXlsxFile = require('read-excel-file/node');

var JSZip = require('jszip');

var LyceeGet = function LyceeGet(req, res) {
  //const {}=req.body
  etudLyce.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving etudiants."
    });
  });
};

var LyceePost = function LyceePost(req, res) {
  var _req$body = req.body,
      nom = _req$body.nom,
      abbrev = _req$body.abbrev,
      academie = _req$body.academie,
      adresse = _req$body.adresse;
  etudLyce.create({
    nom: nom,
    abbrev: abbrev,
    academie: academie,
    adresse: adresse
  }).then(function (etud) {
    return res.status(201).json({
      error: false,
      data: etud,
      message: " Lycée crée"
    });
  })["catch"](function (error) {
    return res.json(_defineProperty({
      error: true,
      data: []
    }, "error", error));
  });
};

var UpdateLycee = function UpdateLycee(req, res) {
  var id;
  return regeneratorRuntime.async(function UpdateLycee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id; //const {nom,abbrev,academie,adresse}=req.body 

          _context.next = 3;
          return regeneratorRuntime.awrap(etudLyce.update({
            nom: req.body.nom,
            abbrev: req.body.abbrev,
            academie: req.body.academie,
            adresse: req.body.adresse
          }, {
            where: {
              id: id
            }
          }).then(function (upd) {
            return res.status(201).json({
              error: false,
              data: upd,
              message: "  modification effectué!"
            });
          })["catch"](function (error) {
            return res.json(_defineProperty({
              error: true
            }, "error", error));
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; // const UpdateLycee = async (req, res) => {
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


var upload = function upload(req, res) {
  var path;
  return regeneratorRuntime.async(function upload$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!(req.file == undefined)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Please upload an excel file!"));

        case 3:
          path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
          readXlsxFile(path).then(function (rows) {
            // skip header
            rows.shift();
            var data = [];
            rows.forEach(function (row) {
              var datas = {
                nom: row[0],
                abbrev: row[1],
                academie: row[2],
                adresse: row[3]
              };
              data.push(datas);
            });
            etudLyce.bulkCreate(data).then(function () {
              res.status(200).send({
                message: "Fichier Importer: " + req.file.originalname
              });
            })["catch"](function (error) {
              res.status(500).send({
                message: " importation impossible !",
                error: error.message
              });
            });
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send({
            message: "IMPOSSIBLE DE CHARGER !: " + req.file.originalname
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var downloadFile = function downloadFile(req, res) {
  return regeneratorRuntime.async(function downloadFile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // const download = (req, res) => {
          tuto.findAll().then(function (objs) {
            var tutorials = [];
            objs.forEach(function (obj) {
              tutorials.push({
                //id: obj.id,
                nom: obj.nom,
                abbrev: obj.abbrev,
                academie: obj.academie,
                adresse: obj.adresse
              });
            });
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet("Tutorials");
            worksheet.columns = [// { header: "Id", key: "id", width: 5 },
            {
              header: "Nom Lycée",
              key: "nomLycee",
              width: 30
            }, {
              header: "Abbreviation Lycée",
              key: "abbrev",
              width: 30
            }, {
              header: "Academie ",
              key: "academie",
              width: 30
            }, {
              header: "Adresse",
              key: "adresse",
              width: 30
            }]; // Add Array Rows

            worksheet.addRows(tutorials);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=" + "Lycee.xlsx");
            return workbook.xlsx.write(res).then(function () {
              res.status(200).end();
            });
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var deleteLycee = function deleteLycee(req, res) {
  var id, deleted;
  return regeneratorRuntime.async(function deleteLycee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(etudLyce.destroy({
            where: {
              id: id
            }
          }));

        case 4:
          deleted = _context4.sent;

          if (deleted) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).send({
            error: 'Lycée Introuvable'
          }));

        case 7:
          res.status(201).send({
            message: 'Lycée Suprimer success'
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.send({
            message: _context4.t0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  UpdateLycee: UpdateLycee,
  LyceePost: LyceePost,
  upload: upload,
  downloadFile: downloadFile,
  deleteLycee: deleteLycee,
  LyceeGet: LyceeGet
}; // jszip
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