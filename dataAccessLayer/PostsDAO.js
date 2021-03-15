const ObjectID = require("mongodb").ObjectID;
var _POSTMONITORDB;
var _POSTCOLLECTION;
require('dotenv').config();
class UsersDAO {

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
        let allPosts= await _POSTCOLLECTION.find({po_id:user_id}).toArray();
        if(!allPosts){
            return null
        }
        return allPosts;
    }

}

module.exports = UsersDAO