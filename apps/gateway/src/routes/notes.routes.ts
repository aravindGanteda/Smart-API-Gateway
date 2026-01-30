import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import * as notesProxy from "../proxy/notes.proxy.ts";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", notesProxy.listNotes);
router.get("/:id", notesProxy.getNote);
router.post("/", notesProxy.createNote);
router.put("/:id", notesProxy.updateNote);
router.delete("/:id", notesProxy.deleteNote);

export const notesRoutes: Router = router;
