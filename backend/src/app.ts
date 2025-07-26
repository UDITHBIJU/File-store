import  express  from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import cookieParser from "cookie-parser";

const app  = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL ,
		credentials: true, 
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Cookie"
		],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use('/api/files', fileRoutes);

app.get("/", (req, res) => {
  res.send("test");
});
 
export default app;
  