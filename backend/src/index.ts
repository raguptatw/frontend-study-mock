import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

let autoId = 1;

type Note = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const notes: Note[] = [
  {
    id: autoId++,
    title: "First Note",
    description: "This is the first note",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

app.get("/api/v1/notes", (req: Request, res: Response) => {
  res.status(200).json({
    items: notes,
  });
});

app.post("/api/v1/notes", (req: Request, res: Response) => {
  const note: Note = {
    id: autoId++,
    title: req.body.title,
    description: req.body.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  notes.push(note);

  res.status(201).json(note);
});

app.put("/api/v1/notes/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.title = req.body.title;
  note.description = req.body.description;
  note.updatedAt = new Date();

  res.status(200).json(note);
});

app.delete("/api/v1/notes/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  notes.splice(noteIndex, 1);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running at at http://localhost:${port}`);
});
