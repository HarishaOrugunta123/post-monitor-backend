const ObjectID = require("mongodb").ObjectID;
var _POSTMONITORDB;
var _USERCOLLECTION;
require('dotenv').config();
class UsersDAO {

    /**
     * 
     * @param { String } connection 
     * @description connection Object is needed to create a connection with the database and makiing use of it in the entire class methods
     */
    static async injectDB(connection) {
        if (_POSTMONITORDB) {
            return;
        }
        try {
            _POSTMONITORDB = await connection.db(process.env.DATABASE);
            _USERCOLLECTION = await _POSTMONITORDB.collection("users");
        } catch (error) {
            console.error(`Unable to estalish the connection to the POSTMONITOR DB ${error}`);
            throw error
        }
    }


    static async getUserDetailsById (user_id){
        try {
            console.log("getUserDetails Function is hitted ")
            let userDetails = await _USERCOLLECTION.findOne({_id:user_id});
            if(userDetails){
                return userDetails;
            }else{
                return null;
            }

        } catch (error) {
            console.log("Error @ getUserDetailsById",error);
            throw error;
        }
    }
     static async saveUserDetails(createUserObject) {
        try{
            console.log("createUsersDetails fuction hitted")
            let user = await _USERCOLLECTION.insertOne(createUserObject);
            if (!user) return { error: "Error while saving the data" }
            return user;
        }catch (error) {
            return { error: error }
        }
    }
    static async updateWorker(updateQuery){
        try {
            const updateResponse = await _USERSCOLLECTION.updateOne(updateQuery.filter, updateQuery.update);
            return updateResponse
        } catch (error) {
            console.error(`Unable to update worker details: ${error}`)
            return { error: error }
        }

       }
       static async deleteUser(query){
           try{
               const deleteUser = await _USERSCOLLECTION.deleteOne(query);
           }catch{
               console.log(`Unable to delete the user : ${error}`)
               return {error: error}
           }
           
       }
       
     }




module.exports = UsersDAO