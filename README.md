# POST Monitor Application Backend

### Stpes to Run the code on local envronment

#### 1.clone the repository from <https://github.com/HarishaOrugunta123/post-monitor-backend.git>

#### 2.paste the configuration file(.env) in the root folder.

#### 3.Install all the dependencides (npm moduels)

#### 4.Run the index.js file.

### Project Structure
    - USERS
        - Create user
        - Update user
        - Delete user
        - Read user
    - POSTS
        - Create post
        - Update post
        - Delete post
        - Read posts
    - ADMIN
        - Create post on user behalf
        - Delete post on user behalf

    - Along with this all the transactions that we are doing here are logged in to multiple locations. Normal Transactions are logged into combined logs and Mongodb Logs Collection. Error transactions are logged into error log. Information transactions are logged into info.log.

    - DB
        - For this backend application , I have used Mongodb Atlas  (Database as a service). Atlas configuration is shared in the .env file.
        - DB Structur
            - Post_Monitor Database
                - Collections
                    - Users
                    - Logs
                    - Posts 
                    - Approvals


Users Sample Data (Mock Data)

{
    "_id":{"$oid":"604c729db82bf10d299b8e71"},
    "firstname":"harisha","lastname":"Orugunta",
    "username":"harisha",
    "email":"Harisha.abcd@gmail.com",
    "mobile":{"$numberLong":"96768897342"},
    "password":"123456sdfgyhuxcvbnfdsfhhjds",
    "is_active":true,
    "post_count":{"$numberInt":"20"},
    "is_verified":true,
    "role":"USER"
}

While Hitting the API from POSTMan  (firstname,username,email,mobile,password,role) are the mandatory fields


