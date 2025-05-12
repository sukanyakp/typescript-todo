import { Request, Response } from "express";
import { TaskManager } from "../models/task";

let manager = new TaskManager();


export const renderTodo = async (req: Request, res: Response) => {
    try{
        let tasks = manager.getAllTasks();
        res.render('index', {tasks})
    }catch(err){
        console.log(err);
    }
}

export const addTask = async (req: Request, res: Response) => {
    try{
        let title: string = req.body.title;
        manager.addTask(title);

        res.sendStatus(200);
    }catch(err){
        console.log(err);
    }
}

export const deleteTask = async(req: Request, res: Response) => {
    try{
        let id: number = req.body.id;
        manager.deleteTask(id);
        res.sendStatus(200)
    }catch(err){
        console.log(err)
    }
}

export const completeTask = async(req: Request, res: Response) => {
    try{
        let id: number = req.body.id;
        manager.completeTask(id);
        res.sendStatus(200)
    }catch(err){
        console.log(err);
    }
}

export const editTask = async(req: Request, res: Response) => {
    try{
        let id: number = req.body.id;
        let title: string = req.body.title;
        manager.editTask(id, title);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
    }
}