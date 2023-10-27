import { Router } from "express"
import postController from "../controllers/postController.ts"
import auth from "../middlewares/auth.ts"

const postRouter: Router = Router()

postRouter.get('/get',auth,postController.getPosts)
postRouter.post('/create',auth, postController.createPost)

export default postRouter