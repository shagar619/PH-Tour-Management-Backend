import { Server } from "http";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

let server: Server;

const app = express();

const startServer = async () => {

     try {

          await mongoose.connect("mongodb+srv://ToDo_App:ToDo_App@cluster0.hj90b.mongodb.net/PH-tour-management?retryWrites=true&w=majority&appName=Cluster0")

          console.log("Connected to DB!!");

          server =  app.listen(5000, () => {
               console.log(`Server is listening to port 5000!`);
          })
     } catch(error) {
          console.log(error);
     }
}

startServer();

app.get("/", (req: Request, res: Response) => {
     res.status(200).json({
          message: "Welcome to Tour Management System Backend!"
     });
});



