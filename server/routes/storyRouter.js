import { Router } from "express";
import { getStories, createStory, updateStory, deleteStory, likeStory, getOwnStories } from "../controllers/storiesController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

router.use(verifyJWT)

router.get("/", getStories);
router.get("/own", getOwnStories);
router.post("/", createStory);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);
router.patch("/:id/likeStory", likeStory);


export default router;