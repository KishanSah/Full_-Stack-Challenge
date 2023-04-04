import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, {ConnectOptions} from "mongoose";
import ScanResults from "./result.model";

// Connect to the MongoDB database
const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/result",{autoIndex: true, family:4} as ConnectOptions);

    console.log("Database Connected!");
};
console.log("working");
connectDB();
// Create a new Express application
const app = express();

// Use middleware for parsing request bodies and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Define the API endpoints
app.get("/results", async (req: Request, res: Response) => {

    try {
        const results = await ScanResults.find().maxTimeMS(30000);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.get("/results/:id", async (req: Request, res: Response) => {
    try {
        const result = await ScanResults.findById(req.params.id).maxTimeMS(30000);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send("Result not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post("/results", async (req: Request, res: Response) => {
    try {
        const result = new ScanResults(req.body);
        await result.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const result = await ScanResults.findById(req.params.id).maxTimeMS(30000);
        if (result) {
            result.status = req.body.status || result.status;
            result.repository = req.body.repository || result.repository;
            result.findings = req.body.findings || result.findings;
            result.queuedAt = req.body.queuedAt || result.queuedAt;
            result.scanningAt = req.body.scanningAt || result.scanningAt;
            result.finishedAt = req.body.finishedAt || result.finishedAt;
            await result.save();
            res.json(result);
        } else {
            res.status(404).send("Result not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const result  = await ScanResults.findByIdAndDelete(req.params.id).maxTimeMS(30000);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send("Result not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});