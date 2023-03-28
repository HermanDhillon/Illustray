const { pgPool } = require('../config/database');

module.exports = {

    create: async (username, email, hash) => {
        try{
            if(username && email && hash){
                let result = await pgPool.query('INSERT INTO users (username, email, hash) VALUES ($1, $2, $3)', [username, email, hash]);
                return result;
            }else{
                console.error('Username, Email, and Hash are all required.');
            }
        } catch (err) {
            console.log(err);
        };
    },

    findByUsername: async (username) => {
        try{
            if(username){
                let result = await pgPool.query('SELECT * from users WHERE username=$1', [username]);
                return result.rows[0]; // returns a single object
            }else{
                console.error('Username is a required input');
            }
        } catch (err) {
            console.log(err);
        };
    },

    findByEmail: async (email) => {
        try{
            if(email){
                let result = await pgPool.query('SELECT * from users WHERE email=$1', [email]);
                return result.rows[0]; // returns a single object
            }else{
                console.error('Email is a required input.');
            }
        } catch (err) {
            console.log(err);
        };
    },

    findById: async (Id) => {
        try{
            if(Id){
                let result = await pgPool.query('SELECT * from users WHERE id=$1', [Id]);
                return result.rows[0];// returns a single object
            }else{
                console.error('Id is a requied input.');
            }
        } catch (err) {
            console.log(err);
        };
    },

    findMany: async () => {
        try{
            let result = await pgPool.query('SELECT * from users ORDER BY username ASC');
            return result.rows; // returns a list of objects
        } catch (err) {
            console.log(err);
        };
    },

};
