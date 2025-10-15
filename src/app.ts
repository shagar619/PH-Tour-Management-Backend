import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
     res.send({ 
          success: true, 
          message: `Sever is Live ⚡!` 
     });
});


app.use(globalErrorHandler);

app.use(notFound);


export default app;