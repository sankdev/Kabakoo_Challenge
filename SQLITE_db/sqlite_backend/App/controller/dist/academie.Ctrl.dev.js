"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Acad = require('../model/academie.model');

var readXlsxFile = require('read-excel-file/node');

var academieGet = function academieGet(req, res) {
  //const {}=req.body
  Acad.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving etudiants."
    });
  });
};

var academiePost = function academiePost(req, res) {
  var _req$body = req.body,
      nom = _req$body.nom,
      code = _req$body.code,
      ville = _req$body.ville,
      adresse = _req$body.adresse;
  Acad.create({
    nom: nom,
    code: code,
    ville: ville,
    adresse: adresse
  }).then(function (etud) {
    return res.status(201).json({
      error: false,
      data: etud,
      message: " academie ajoutée avec succes"
    });
  })["catch"](function (error) {
    return res.json(_defineProperty({
      error: true,
      data: []
    }, "error", error));
  });
};

var UpdateAcad = function UpdateAcad(req, res) {
  var id, _req$body2, nom, code, ville, adresse;

  return regeneratorRuntime.async(function UpdateAcad$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, nom = _req$body2.nom, code = _req$body2.code, ville = _req$body2.ville, adresse = _req$body2.adresse;
          _context.next = 4;
          return regeneratorRuntime.awrap(Acad.update({
            nom: nom,
            code: code,
            ville: ville,
            adresse: adresse
          }, {
            where: {
              id: id
            }
          }).then(function (upd) {
            return res.status(201).json({
              error: false,
              data: upd,
              message: " academie  a ete modifie"
            });
          })["catch"](function (error) {
            return res.json(_defineProperty({
              error: true
            }, "error", error));
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

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
                code: row[1],
                ville: row[2],
                adresse: row[3]
              };
              data.push(datas);
            });
            Acad.bulkCreate(data).then(function () {
              res.status(200).send({
                message: "Importé  avec succes: " + req.file.originalname
              });
            })["catch"](function (error) {
              res.status(500).send({
                message: "Impossible d Importer!",
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
          Acad.findAll().then(function (objs) {
            var tutorials = [];
            objs.forEach(function (obj) {
              tutorials.push({
                //id: obj.id,
                nom: obj.nom,
                code: obj.code,
                ville: obj.ville,
                adresse: obj.adresse
              });
            });
            var workbook = new excel.Workbook();
            var worksheet = workbook.addWorksheet("Tutorials");
            worksheet.columns = [// { header: "Id", key: "id", width: 5 },
            {
              header: "Nom Academie",
              key: "nom",
              width: 30
            }, {
              header: "Code Academie",
              key: "code",
              width: 30
            }, {
              header: "Ville Academie",
              key: "ville",
              width: 30
            }, {
              header: "Adresse",
              key: "adresse",
              width: 30
            }]; // Add Array Rows

            worksheet.addRows(tutorials);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=" + "Academie.xlsx");
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

var deleteAcad = function deleteAcad(req, res) {
  var id, deleted;
  return regeneratorRuntime.async(function deleteAcad$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Acad.destroy({
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
            message: 'Lycée Suprimer avec succes'
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.send({
            message: 'Lycée Supprimer  avec succes '
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  UpdateAcad: UpdateAcad,
  academieGet: academieGet,
  academiePost: academiePost,
  upload: upload,
  downloadFile: downloadFile,
  deleteAcad: deleteAcad
};