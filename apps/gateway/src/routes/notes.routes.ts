import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { permissionMiddleware } from "../middlewares/permission.middleware.ts";
import * as notesProxy from "../proxy/notes.proxy.ts";

const router: Router = Router();

router.use(authMiddleware);

router.get(
  "/",
  permissionMiddleware("NOTES_READ"),
  notesProxy.listNotes
);
router.post(
  "/",
  permissionMiddleware("NOTES_WRITE"),
  notesProxy.createNote
);
router.put(
  "/:id",
  permissionMiddleware("NOTES_WRITE"),
  notesProxy.updateNote
);
router.delete(
  "/:id",
  permissionMiddleware("NOTES_DELETE"),
  notesProxy.deleteNote
);

export const notesRoutes: Router = router;
