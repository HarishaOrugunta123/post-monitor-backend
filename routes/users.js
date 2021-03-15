const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const UsersDAO = require("../dataAccessLayer/UsersDAO");
const { ObjectID } = require("mongodb");


router.get('/getUserByID/:id',async (req,res)=>{

    let user_id= req.params.id;
    user_id = ObjectID(user_id);
    let userDetails = await UsersDAO.getUserDetailsById(user_id);
    if(userDetails){
        res.status(200).send(userDetails)
    }else{
        res.status(404).send({message:` Requested User  ${user_id} Details are not found in the database. Please check by passing the correct user details. `})
    }
})
router.post('/createUser', [
    check("firstname", "Please enter a valid name").isString().isLength({ min: 4, max: 24 }),
    check("lastname", "Please enter a valid name").isString().isLength({ min: 4, max: 24 }),
    check("username", "Please enter a valid name").isString().isLength({ min: 4, max: 24 }),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
    check("mobile", "Please enter a valid mobile number").isMobilePhone().isLength({ min: 10, max: 13 })
  ], 
  async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try{
    const {firstname, lastname, username, email, mobile, password, is_actve, post_count, is_verified, role} = req.body;
    const createUserObject = {
        firstname,
        lastname,
        username,
        email,
        mobile,
        password,
        is_actve,
        post_count,
        is_verified,
        role
    }
    let newCreatedUser = await UsersDAO.saveUserDetails(createUserObject);
    if(newCreatedUser){
        res.status(200).send(newCreatedUser)
    }
}
catch(err){
    console.log(err)
    res.status(404).send({message:`New UserDetails are not inserted into database`})
    }
})

router.patch('/updateUserDetails', async (req, res)=>{
    let { id, username, mobile, isActive} = req.body;
    let query = {
        filter: { _id: ObjectID(id) },
        update: {
          $set: {
            username: username,
            mobile: mobile,
            isActive: isActive
          }
        }
      };
      const updateUserDetails = await UsersDAO.updateWorker(query);
      if(updateUserDetails){
          res.status(200).send({message: `User Deatils Updated successfully`})
      }else{
          res.status(404).send({message: `Unable to update a user details`})
      }

})
router.delete('/deleteUser', async (req, res) => {
    let query = {role:{$type: 'string'}};
    const DeleteUser = await UsersDAO.deleteUser(query);
    if(DeleteUser){
        res.status(200).send({message: `Deleted`});
    }else{
        res.status(404).send({message: `Unable to Delete`});
    }

})




module.exports = router;


