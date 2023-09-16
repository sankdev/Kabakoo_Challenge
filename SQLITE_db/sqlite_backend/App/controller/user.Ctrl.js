const { generateToken } = require('../../config/jwtToken');
const db=require('../db/conection');
const login = require('../model/user.model.js');
const asyncHandler=require("express-async-handler")
// const {validatSqliteId, validateSqliteId} =require("../../config/dist/validateDbId")
const crypto =require("crypto")
const bcrypt =require('bcryptjs');
const UserModel = require('../model/user.model.js'); 
const { Op } = require('sequelize');
const { error } = require('console');

//  const loginCtr= asyncHandler( async(req,res)=>{
//     const {email,password}=req.body
//    // const {_id}=req.param.id
//     try {
//         const emailExist= await login.findOne({where:{ email}})
//          if (!emailExist) return  res.status(400).send('email n existe pas')
      
//         const validPass=await bcrypt.compare(password,emailExist.password)
      
//         if (!validPass){
//             return res.status(400).send('le mot de passe est invalide')
//         } else {
//           res.status(200).send({
//             token:generateToken(emailExist?.id),
//             role:emailExist?.role,
//             nom:emailExist?.nom
//           })
//         }
       
       
          
//     } catch (error) {
//         res.send(error)
//     } 

// })

// // exports.getAdminDashboard = async (req, res) => {
// //     // Check if the user has the admin role
// //     const user = await login.findByPk(req.userId);
// //     if (user.role !== 'admin') {
// //       return res.status(401).json({ error: 'Unauthorized' });
// //     }
//     // Admin-only functionality
//     // ...
//   // };
// const register=async(req,res)=>{
//   const {email}=req.body
//      const findUser=  await login.findOne({where:{email}})
//      if(!findUser){
//       const salt= await bcrypt.genSalt(10)
//       const hashedPassword= await bcrypt.hash(req.body.password,salt)
   
//       const Login =new login({
//        nom:req.body.nom,
//        email:req.body.email,
//        password:hashedPassword,
//        role:req.body.role,
//        active:req.body.active
//       })
//        try {
//            const saveLoging= await  Login.save()
//            res.send(saveLoging)
//        } catch (error) {
//            res.status(400).send( error)
//        }
   
//      }
  
    
// }
// const getUser=async(req,res)=>{
//     try{
//         const {id}=req.params
//         const user= await login.findByPk({where:{id}})
//         res.status(200).send(user)
//     } catch(error){
//         res.status(400).json({error})
//     }
   
// }

// const updateUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const user = await login.findOne({ where: { id:id } });
//       if (!user) {
//         return res.status(404).send('User not found');
//       } else {
//         user.nom = req.body.nom;
//         user.email = req.body.email;
//         user.role = req.body.role;
//         user.active = req.body.active;
//         await user.save();
//         res.status(200).send(user);
//       }
     
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };
//   const modifierUser = async (req, res) => {
//     const { id } = req.params;
//     const { email, password } = req.body;
//     try {
//       const user = await login.findByPk({ where: { id } });
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
//       // Check if the provided email is already in use by another user
//       if (email && email !== user.email) {
//         const emailExist = await login.findOne({ where: { email } });
//         if (emailExist) {
//           return res.status(400).send('Email deja Utilise!');
//         }
//       }
//       // Check if the provided password is valid
//       if (password) {
//         const validPass = await bcrypt.compare(password, user.password);
//         if (!validPass) {
//           return res.status(400).send('Invalid password');
//         }
//       }
//       // Update user details
//       user.nom = req.body.nom;
//       user.email = email || user.email;
//       user.role = req.body.role;
//       user.active = req.body.active;
//       await user.save();
//       res.status(200).send(user);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };
  
//   const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const user = await login.findOne({ where: { id } });
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
//       await user.destroy();
//       res.status(200).send('User deleted successfully');
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };

const loginCtr= asyncHandler( async(req,res)=>{
  const {email,password}=req.body
  try {
    const findUser= await login.findOne({where:{email}})
    if (!findUser || !findUser.active) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  if(findUser&& (await findUser.isPasswordMatched(password))){
      res.status(200).json({status:true,message:"Logged in avec success",
  token:generateToken(findUser?.id), 
  id:findUser?.id,
  role:findUser?.role,
 nom:findUser?.nom

}); 
  }
  } catch (error) {
    throw new Error(" Invalid credentials");
     console.log(error)
  }
  

})


const register= asyncHandler(async(req,res)=>{
  const email=req.body.email;
  console.log(req.body)
  // find the user avec email
  const findUser= await login.findOne({where:{email}})
 if(!findUser){
const createUser=await login.create(req.body)
res.status(200).json({
  status:true, 
  message:"User cree avec succes",
 user: createUser 
}) 
 } else { throw new Error("user existe deja")}
  res.status(200).json(email)

  
}) 
const getAllUser=asyncHandler(async (req,res)=>{
  try {
      const allUser= await UserModel.findAll()
      res.status(200).json({status:true,
      message:" listes des Utilisateurs avec succes",
  allUser}) 
  } catch (error) {
      throw new Error(error)
  }
})


const getUser=asyncHandler(async (req,res)=>{
  try {
    const { id } = req.user;
   // validateSqliteId(id);

    // Retrieve user from the database using the validated ID
    const user = await login.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
 
}) 

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { nom, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    console.log('Valeurs avant modification :', user.nom, user.email, user.password);

    user.nom = nom; // Mise à jour du nom de l'utilisateur
    user.email = email; // Mise à jour de l'adresse e-mail de l'utilisateur

    if (password) {
      // Vérifiez si un nouveau mot de passe est fourni
      user.password = password; // Mise à jour du mot de passe de l'utilisateur
      console.log('passwordhased', user.password);
    }

    console.log('Valeurs après modification :', user.nom, user.email, user.password);

    await user.save(); // Enregistrer les changements dans la base de données

    res.status(200).json({
      status: true,
      message: 'Profile updated!',
      user: user,
    });
  } catch (error) {
    console.log(error); 
    // Gérer les erreurs appropriées
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});


// const updateUser = asyncHandler(async (req, res) => {
//   const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir de req.user
//   const { nom, email, password } = req.body;

//   try {
//     const user = await UserModel.findByPk(userId); // Utiliser findByPk avec l'ID de l'utilisateur
//     if (!user) {
//       return res.status(404).json({ status: false, message: 'User not found' });
//     }
//     console.log('Valeurs avant modification :', user.nom, user.email, user.password);
//     user.nom = nom; // Mise à jour du nom de l'utilisateur
//     user.email = email;
//     user.password = password; // Mise à jour de l'adresse e-mail de l'utilisateur
//     console.log('Valeurs après modification :', user.nom, user.email, user.password);
//     if (password) {
//       // Vérifiez si un nouveau mot de passe est fourni
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       user.password = hashedPassword; // Mise à jour du mot de passe de l'utilisateur
//     }

//     await user.save(); // Enregistrer les changements dans la base de données

//     res.status(200).json({
//       status: true,
//       message: 'Profile updated!',
//       user: user,
//     });
//   } catch (error) {
//     console.log(error);
//     // Gérer les erreurs appropriées
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// });


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};
const blockUser=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  // validateMongodbId(id)
  try {
    await UserModel.update({ active:true }, { where: {id } });
    res.status(200).json({ status: true, message: "User blocked successfully" });
  } catch (error) {
    // throw new Error(error);
    console.log(error)
  }
}) ;
const unblockUser=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  // validateMongodbId(id)
  try {
    await UserModel.update({ active:false }, { where: {id } });
    res.status(200).json({ status: true, message: "User unblocked successfully" });
  } catch (error) {
    // throw new Error(error);
    console.log(error)
  }
}) 
// update password

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;

  try {
    const user = await UserModel.findByPk(id);
    if (!password) {
      throw new Error("Please provide a password");
    }
    if (user && (await user.isPasswordMatched(password))) {
      throw new Error("Please choose a different password than the current one");
    } else {
      user.password = password;
      await user.save();
      res.status(200).json({ status: true, message: "Password modified successfully" });
    }
  } catch (error) {
    console.log(error);
  } 
});
const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ where: {  email } });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetlink = `http://localhost:3001/app/reset-password/${token}`;
    res.status(200).json(resetlink);
  } catch (error) {
    throw new Error(error);
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await UserModel.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpire: {
        [Op.gt]: new Date() // Use a valid date object for comparison
      },
    },
  });
  if (!user) throw new Error("Token expired. Please try again.");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();
  res.status(200).json({
    status: true,
    message: "Password reset successfully",
  });
  } catch (error) {
    console.log(error)
  }
  
});


// Contrôleur pour la modification du rôle d'un utilisateur par un administrateur principal
const modifyUserRole = asyncHandler(async (req, res) => {
   const { id } = req.params;
  const { role } = req.body;

  try {
    const adminUser = req.user; // Utilisateur administrateur authentifié

    if (adminUser.role !== 'admin') {
      return res.status(401).json({ status: false, message: "Vous n'êtes pas un administrateur" });
    }

    const userToUpdate = await UserModel.findOne({ where: { id } });

    if (!userToUpdate) {
      return res.status(404).json({ status: false, message: "Utilisateur non trouvé" });
    }

    if (role === 'admin' || role === 'user') {
      userToUpdate.role = role;
      await userToUpdate.save();

      res.status(200).json({ status: true, message: "Rôle de l'utilisateur mis à jour avec succès" });
    } else {
      return res.status(400).json({ status: false, message: "Le rôle spécifié est invalide" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Erreur interne du serveur" });
  }
});





module.exports={loginCtr,register,getUser,updateUser, deleteUser,
  getAllUser,
  blockUser,unblockUser,updatePassword,forgetPasswordToken,resetPassword,modifyUserRole}