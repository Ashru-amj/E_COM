

import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import { fileURLToPath } from 'url';  // Import fileURLToPath function
import { dirname } from 'path';      // Import dirname function
import connectDB from "./controllers/config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

dotenv.config();

// Get the directory name using dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Use the updated __dirname here
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);

app.use("*", function (req , res){
   res.sendFile(path.join(__dirname , "./client/build/index.html"))
})


const PORT = process.env.PORT; // Fix the variable name to be consistent

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.js'));
});

//mongoDB connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white);
});
