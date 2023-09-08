import  express  from 'express';
import { AuthController } from './auth.controlller';

const router = express.Router();

router.post('/login', AuthController.signIn)

router.post('/create-user',AuthController.createUser)

export const AuthRoutes = router;