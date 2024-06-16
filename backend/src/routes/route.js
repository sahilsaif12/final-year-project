import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { dataAnalysis } from "../controllers/controller.js";
const router=Router()

router.route("/analysis").post(upload.single("xlData"),dataAnalysis)

export default router