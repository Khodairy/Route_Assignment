import { Router } from "express";
import * as NS from "./notes.service.js";
import { auth } from "../../middleware/auth.js";

const notesRouter = Router();

notesRouter.post("/", auth, NS.singleNote); // 1
notesRouter.put("/replace/:noteId", auth, NS.replaceNote); // 3
notesRouter.patch("/all", auth, NS.updateAllNotes); // 4

notesRouter.get("/paginate-sort", auth, NS.retriveNotes); // 6
notesRouter.get("/note-by-content", auth, NS.retriveNotes_byContent); // 8
notesRouter.get("/note-with-user", auth, NS.retriveNotes_withUser); // 9
notesRouter.get("/aggregate", auth, NS.retriveNotes_withAggregate); // 10

notesRouter.get("/:noteId", auth, NS.retriveNote_ById); // 7
notesRouter.patch("/:noteId", auth, NS.updateNote); // 2
notesRouter.delete("/:noteId", auth, NS.deletingNote); // 5
notesRouter.delete("/", auth, NS.deleting_AllNotes); // 11
export default notesRouter;
