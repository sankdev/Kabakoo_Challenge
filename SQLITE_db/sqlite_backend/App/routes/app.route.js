const express = require("express");
//const authUser=require('../../middleware/userAuth.js')

const router = express.Router();
const excelController= require('../controller/etudiant.Ctrl.js')
const upload=require('../helpers/tuto.upload.js')
  const loginRout=require ('../controller/user.Ctrl.js')
  const etudacad=require('../controller/academie.Ctrl.js')
  const etudLyc=require('../controller/lycee.Ctrl.js');
const { authMiddleware, isAdmin } = require("../../middleware/userAuth.js");
 // const etudef=require('../controller/etud.Def.Ctrls.js')
 
    router.post("/upload", upload.single('file'), excelController.upload);
    router.get("/etudiant", excelController.getTutorials);
    router.get('/download',excelController.downloadFile)
    router.delete('/deleteetudiant/:id',excelController.deleteEtudiant)
    router.post('/postetud',excelController.etudPost)
    router.put('/updateetud/:id',excelController.UpdateEtud)

    router.get('/downloadlycee',etudLyc.downloadFile)
    router.get('/getlycee',etudLyc.LyceeGet)
    router.delete('/deletelycee/:id',etudLyc.deleteLycee)
    router.post('/postlycee',etudLyc.LyceePost)
    router.put('/updatelycee/:id',etudLyc.UpdateLycee)
    router.post("/importlycee", upload.single('file'), etudLyc.upload);

 
    router.get('/getacad',etudacad.academieGet)
    router.post('/posteacad',etudacad.academiePost)
    router.delete('/deleteacad/:id',etudacad.deleteAcad)
    router.get('/downloadacad',etudacad.downloadFile)
    router.put('/updateacad/:id',etudacad.UpdateAcad)
    router.post("/importacad", upload.single('file'), etudacad.upload);

   // router.put('/updatetudiant/:id',excelController.Update)
    


    router.post('/login',loginRout.loginCtr)
    router.post('/register',loginRout.register) 
    router.get('/getuser/:id', authMiddleware,loginRout.getUser)
   // router.put('/modifier/:id', loginRout.modifierUser)
    router.delete('/deleteuser/:id', authMiddleware, loginRout.deleteUser)
    router.put('/updateuser/:id', authMiddleware,loginRout.updateUser)
    router.get("/all-user", authMiddleware,isAdmin,loginRout.getAllUser)
    router.put("/block/:id",authMiddleware,loginRout.blockUser)
    router.put("/unblock/:id",authMiddleware,loginRout.unblockUser)
    router.put("/update-password/:id",authMiddleware,loginRout.updatePassword)
    router.post("/forgot-password",authMiddleware, loginRout.forgetPasswordToken)
    router.put("/reset-password/:token",authMiddleware, loginRout.resetPassword)
    router.put("/updaterole/:id",authMiddleware,loginRout.modifyUserRole)

    
   
   
   // router.post('/getetud',excelController.etudPost)
    
   // app.use("/api/excel", router); 
 
  module.exports = router;