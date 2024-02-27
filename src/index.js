// require('dotenv').config({path: "./env"});

import dotenv from 'dotenv';
import connectDb from "./db/index.js";
import { app } from './app.js';

dotenv.config({path: "./env"})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server listening at ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MONGO db connection failed: " + err);
})




// import express from "express";
// const app = express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on('error', (err) => {
//             console.error("Error: ", err);
//             throw err;
//         });
//         app.listen(process.env.PORT , () => {
//             console.log(`App listening on ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("Error: ", error);
//         throw error;
//     }
// })()
