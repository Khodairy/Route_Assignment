import { Router } from "express";
import * as BC from "./book.service.js";

const bookRouter = Router();

// ================ Post ================
bookRouter.post("/", BC.createBook);
bookRouter.post("/index", BC.createIndex);
bookRouter.post("/batch", BC.createManyBook);

// ================ Get ================
bookRouter.get("/genre", BC.getBookWithGenre);
bookRouter.get("/skip-limit", BC.getBookWithLimit);
bookRouter.get("/year-integer", BC.getBookWithInteger);
bookRouter.get("/exclude-genres", BC.getBookWith_excludeGenresr);
bookRouter.get("/aggregate1", BC.getBookWithAggregate_1);
bookRouter.get("/aggregate2", BC.getBookWithAggregate_2);
bookRouter.get("/aggregate3", BC.getBookWithAggregate_3);
bookRouter.get("/aggregate4", BC.getBookWithAggregate_4);

bookRouter.get("/:title", BC.getBook);
bookRouter.get("/", BC.getBookWithRangeOfYear);
bookRouter.get("/", BC.getBookWithRangeOfYear);

// ================ Patch ================
bookRouter.patch("/:title", BC.updateBook);

// ================ Delete ================
bookRouter.delete("/before-year", BC.DeleteBookWithYear);

export default bookRouter;
