"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.etudApi = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var etudApi = {
  etudiant: function etudiant(matricule, matriculeBac, nom, prenom, sexe, nationalite, codeNationalite, dateNaissance, nomMere, prenomMere, nomPere, prenomPere, matriculeDef, sessionDef, centreExamenDef, sessionBac, mentionBac, serieBac, placeNum, status, moyenneBac, lieuNaissance, scolariteLyc, centreExamenBac, inscriptibilite, academie, lycee) {
    var response;
    return regeneratorRuntime.async(function etudiant$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:3001/app/postetud', {
              matricule: matricule,
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
              sessionDef: sessionDef,
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
            }));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
exports.etudApi = etudApi;