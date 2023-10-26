import { Router } from "express"
import UserController from "../controllers/userController.js"
import auth from "../middlewares/auth.js"

const router = Router()

router.get('/',auth,UserController.getUsers)
router.post('/save',auth, UserController.saveUser)
router.patch('/edit',auth,UserController.editUser)
router.delete('/remove',auth,UserController.deleteUser)

export default router