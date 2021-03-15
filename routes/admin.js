const express = require("express");
const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// var crypto = require('crypto');
// var nodemailer = require('nodemailer');
const router = express.Router();
// const auth = require("../middleware/auth");
const PostsDAO = require("../dataAccessLayer/PostsDAO");
const AdminDAO = require("../dataAccessLayer/AdminDAO");
const { ObjectID } = require("mongodb");

const logger = require("../logger/logger").logger;


router.get('/getPosts/:id',async (req,res)=>{

    let user_id= req.params.id;
    user_id = ObjectID(user_id);
    let userDetails = await PostsDAO.getPostsById(user_id);
    if(userDetails){
        logger.info(userDetails)
        res.status(200).send(userDetails)
    }else{
        logger.error(`Error While fetching the User Details at  ${new Date().toJSON()} of ${user_id} in a ${req.url}`)
        res.status(404).send({message:` Requested User  ${user_id} Details are not found in the database. Please check by passing the correct user details. `})
    }
});

router.post('/savePost',[
    check("po_id", "Please send a valid user id filed").isString().isLength({ min: 24 }),
    check("content","Please send a valid content").isLength(2).isString(),
    check("admin_id", "Please send a valid admin id filed").isString().isLength({ min: 24 }),
],async (req,res)=>{  

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
    try {
            let postDetails= req.body;
            let postObject={
                po_id:ObjectID(postDetails.po_id),
                content:postDetails.content,
                date_posted: new Date().toJSON(),
                last_edited: new Date().toJSON(),
                show_post: false,
                is_admin_approved: true,
                is_super_admin_approved:false,
                admin_id:ObjectID(postDetails.admin_id)
            }

            let approvalObject={
                po_id:ObjectID(postDetails.po_id),
                content:postDetails.content,
                date_posted: new Date().toJSON(),
                last_edited: new Date().toJSON(),
                type:"CREATE",
                admin_id:ObjectID(postDetails.admin_id)
            }

            let postResult= await PostsDAO.createPost(postObject);
            // console.log("Post Result",postResult.insertedCount,postResult.insertedId);
            if(!postResult){
                logger.error(`Error While saving the post at  ${new Date().toJSON()} of ${postDetails.po_id} in a ${req.url}`)
                res.status(400).send({
                    message:"Error while saving the post details"
                })
                return ;
            }
            approvalObject.post_id= postResult.insertedId
            let approvalInsertResponse= await AdminDAO.insertApproval(approvalObject);
            if(!approvalInsertResponse){
                logger.error(`Error While saving the post at  ${new Date().toJSON()} of ${postDetails.po_id} in a ${req.url}`)
                res.status(400).send({
                    message:"Error while saving the post details"
                })
                return ;
            }
            logger.info(postResult)
            res.status(200).send({message:"Post has successfully saved & sent for approval", details: postResult})
    } catch (error) {
        logger.error(`Error while saving the post ${error} @ ${new Date().toJSON()}`)
        res.status(400).send({
            message:"Error while saving the post details"
        })
    }
})








module.exports = router;


