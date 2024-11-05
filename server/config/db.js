// config/db.js
//This file manages the connection to MongoDB, using Mongoose for easier interaction.
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const connectionString = process.env.DB_STRING
const connectToDB = async () => {
    try 
    {
        await mongoose.connect(connectionString, 
        {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
    } 
    catch (error) 
    {
        console.error(error);
    }
}
export default connectToDB;