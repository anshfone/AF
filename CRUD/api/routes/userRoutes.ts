import { Router } from "express"
import UserController from "../controllers/userController.ts"
import auth from "../middlewares/auth.ts"

const userRouter: Router = Router()

userRouter.get('/',auth,UserController.getUsers)
userRouter.post('/signUp', UserController.signUpUser)
userRouter.post('/login',UserController.loginUser)
userRouter.patch('/edit',auth,UserController.editUser)
userRouter.delete('/remove',auth,UserController.deleteUser)
userRouter.delete("/removeAll",UserController.deleteUsers)

export default userRouter