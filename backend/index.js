import express from 'express';
import db from './config/Database.js';
import userRoutes from './routes/userRoutes.js';
const app = express();

try {
    await db.authenticate();
    console.log("database conneted");
} catch (error) {
    console.log(error);   
}
app.use(userRoutes)
app.listen(5000,()=>console.log("server runnig"))