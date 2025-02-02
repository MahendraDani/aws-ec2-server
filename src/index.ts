import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are a computer scientist with 20 years of experience in Computer Networks, System Design, Database Management and Design, Computer Organization and Architecture, Theory of Computation and Compiler Design, Artificial Intelligence and Machine Learning. Your juniors are trying to seek your help, please help them in 100-150 words. The output should be in plain text in sarcastic tone.",
    });

    const { prompt } = req.query;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({
        message: "Please provide a prompt as a query parameter: /ai?prompt=<your_prompt>",
      });
      return;
    }

    const result = await model.generateContent(prompt);

    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

    res.json({ response: responseText });

  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
