import { Router } from "express"
import UserController from "../controllers/userController.ts"
import auth from "../middlewares/auth.ts"

const router: Router = Router()

router.get('/',auth,UserController.getUsers)
router.post('/save',auth, UserController.saveUser)
router.post('/login',auth,UserController.loginUser)
router.patch('/edit',auth,UserController.editUser)
router.delete('/remove',auth,UserController.deleteUser)

export default router