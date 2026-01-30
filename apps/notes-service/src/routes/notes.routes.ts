import { Router } from "express";
import { NotesController } from "../controllers/notes.controller.ts";

const router: Router = Router();

router.post("/", (req, res, next) =>
  NotesController.create(req, res).catch(next)
);
router.get("/", (req, res, next) =>
  NotesController.list(req, res).catch(next)
);
router.get("/:id", (req, res, next) =>
  NotesController.getOne(req, res).catch(next)
);
router.put("/:id", (req, res, next) =>
  NotesController.update(req, res).catch(next)
);
router.delete("/:id", (req, res, next) =>
  NotesController.delete(req, res).catch(next)
);

export const notesRoutes: Router = router;
