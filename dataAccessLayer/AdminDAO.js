const ObjectID = require("mongodb").ObjectID;
var _POSTMONITORDB;
var _POSTCOLLECTION;
var _USERCOLLECTION;
var _APPROVALCOLLECTION;
require('dotenv').config();
class AdminDAO {

    /**
     * 
     * @param {*} connection 
     * @description connection Object is needed to create a connection with the database and makiing use of it in the entire class methods
     */
    static async injectDB(connection) {
        if (_POSTMONITORDB) {
            return;
        }
        try {
            _POSTMONITORDB = await connection.db(process.env.DATABASE);
            _POSTCOLLECTION = await _POSTMONITORDB.collection("posts");
            _USERCOLLECTION = await _POSTMONITORDB.collection('users');
            _APPROVALCOLLECTION = await _POSTMONITORDB.collection("approvals");
        } catch (error) {
            console.error(`Unable to estalish the connection to the POSTMONITOR DB ${error}`);
            throw error
        }
    }
    
    static async createPost(postObject){
        try {
            let postResponse = await _POSTCOLLECTION.insertOne(postObject);
            if(!postResponse){
                return null;
            }
            return postResponse;
        } catch (error) {
            console.error("Error while creating the post ", error);
            throw error;
        }

    }

    static async getPostsById (user_id){
        try {
            let allPosts= await _POSTCOLLECTION.find({po_id:user_id}).toArray();
        if(!allPosts){
            return null
        }
        return allPosts; 
        } catch (error) {
            console.log("Error while getting the posts by id",error);
            return null;
        }
       
    }

    static async insertApproval (approvalObject){
        try {
            let insertResponse = await _APPROVALCOLLECTION.insertOne(approvalObject);
            if(!insertResponse){
                return null;
            }
            return insertResponse;
        } catch (error) {
            console.log("Error while inserting the approval",error);
            return null;
        }
    }

}

module.exports = AdminDAO