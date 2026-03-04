import express from  'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import authRouter from './router/userRoute.js';
config();

const app = express();

app.use(cors({
	origin: [process.env.FRONTEND_URL],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// Importing all routes here
app.use("/api/v1/auth", authRouter)


// Error middleware must be LAST
app.use(errorMiddleware); // Yhn  middleware call krte time () nhi lagate hai warna error dega

export default app;