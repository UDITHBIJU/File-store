import  express  from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";

const app  = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use('/api/files', fileRoutes);

app.get("/", (req, res) => {
  res.send("test");
});
 
export default app;
 