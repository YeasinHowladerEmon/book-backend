import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHanlder';
import router from './app/routes';

const app: Application = express();

app.use(cors())
app.use(cookieParser())


//parse
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//application
app.use("/api/v1/", router)

// token save req.user



// global error hanlder

app.use(globalErrorHandler)


export default app;