import { Router } from "express";
import * as todoController from '../controller/controller'

const router = Router();

router.get('/', todoController.renderTodo);

router.post('/add-task', todoController.addTask);

router.delete('/delete-task', todoController.deleteTask);

router.patch('/complete-task', todoController.completeTask);

router.put('/edit-task', todoController.editTask);

export default router;