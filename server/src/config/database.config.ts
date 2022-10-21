import Database from 'better-sqlite3';

function initDatabase() {

     const db = new Database('./zen.sqlite', { verbose: console.log });

     const createUsersTable = `CREATE TABLE IF NOT EXISTS users ( 
          id UUIDV4 NOT NULL, 
          firstname VARCHAR(255) NOT NULL, 
          lastname VARCHAR(255) NOT NULL, 
          email VARCHAR(255) NOT NULL,
          phonenumber VARCHAR(255), 
          gender VARCHAR(255), 
          groups VARCHAR(255), 
          type VARCHAR(255),
          id_doc_type VARCHAR(255),
          id_doc_number VARCHAR(255),
          id_doc_path VARCHAR(255),
          avatar VARCHAR(255), 
          token VARCHAR(255), 
          isverified NUMBER, 
          password VARCHAR(30) NOT NULL,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL
     )`

     const createPostsTable = `CREATE TABLE IF NOT EXISTS notes ( 
          id INTEGER PRIMARY KEY,  
          content VARCHAR(500) NOT NULL, 
          avatar VARCHAR(255), 
          author_name VARCHAR(255) NOT NULL,
          parent VARCHAR(255) NOT NULL,
          author_id UUIDV4 NOT NULL, 
          flagged VARCHAR(10),
          category VARCHAR(255) NOT NULL,
          createdAt DATETIME NOT NULL,
          updatedAt DATETIME NOT NULL
     )`

     const createGroupsTable = `CREATE TABLE IF NOT EXISTS groups ( 
          id INT AUTO_INCREMENT NOT NULL, 
          user_id VARCHAR(255) NOT NULL, 
          group_name VARCHAR(500) NOT NULL, 
          createdAt DATETIME NOT NULL,
          PRIMARY KEY (id)
     )`

     const createChatsTable = `CREATE TABLE IF NOT EXISTS chats(
          id INTEGER PRIMARY KEY,
          sender_id varchar(255) NOT NULL,
          recipient_id VARCHAR(255) NOT NULL, 
          content varchar(1000) NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
     )`

     db.exec(createUsersTable);
     db.exec(createPostsTable);
     db.exec(createGroupsTable);
     db.exec(createChatsTable);
}

export default initDatabase