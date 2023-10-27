import { Router } from "express"
import UserController from "../controllers/userController.ts"
import auth from "../middlewares/auth.ts"

const userRouter: Router = Router()

userRouter.get('/',auth,UserController.getUsers)
userRouter.post('/signUp', UserController.signUpUser)
userRouter.post('/login',auth,UserController.loginUser)
userRouter.patch('/edit',auth,UserController.editUser)
userRouter.delete('/remove',auth,UserController.deleteUser)

export default userRouter