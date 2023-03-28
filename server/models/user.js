const {pgPool} = require('../config/database');

class User{
    constructor(username=null, email=null, hash=null){
        this.username = username;
        this.email = email;
        this.hash = hash;
    }

    async createUser(){
        try{
            if(this.username && this.email && this.hash){
                let result = await pgPool.query('INSERT INTO users (username, email, hash) VALUES ($1, $2, $3)', [this.username, this.email, this.hash]);
                return result;
            }else{
                console.error('an input cannot be null');
            }
        } catch (err) {
            console.log(err);
        };
    }

    async findUserByUsername(){
        try{
            if(this.username){
                let result = await pgPool.query('SELECT * from users WHERE username=$1', [this.username]);
                return result.rows[0]; // returns a single object
            }else{
                console.error('Username cannot be null.');
            }
        } catch (err) {
            console.log(err);
        };
    }

    async findUserByEmail(){
        try{
            if(this.email){
                let result = await pgPool.query('SELECT * from users WHERE email=$1', [this.email]);
                return result.rows[0]; // returns a single object
            }else{
                console.error('Email cannont be null.');
            }
        } catch (err) {
            console.log(err);
        };
    }

    async findUserById(Id){ // Expects Id Argument
        try{
            if(Id){
                let result = await pgPool.query('SELECT * from users WHERE id=$1', [Id]);
                return result.rows[0];// returns a single object
            }else{
                console.error('Id is a necessary input.');
            }
        } catch (err) {
            console.log(err);
        };
    }

    async getAllUsers(){
        try{
            let result = await pgPool.query('SELECT * from users ORDER BY username ASC');
            return result.rows; // returns a list of objects
        } catch (err) {
            console.log(err);
        };
    }

}

module.exports = {User};
