type ListStatus = 'pending' | 'done';

abstract class List {
    public id : number;
    public title : string;
    public status : ListStatus;

    constructor(id: number, title: string, status: ListStatus){
        this.id = id;
        this.title = title;
        this.status = status
    }

}

export class Task extends List{}


export class TaskManager{
    private tasks: List[] = [];
    private nextId: number = 1;

    private isTaskExist (title:String) : boolean {
        return this.tasks.some (task => task.title === title)
    }



    addTask(title: string): List | null{

        if(this.isTaskExist(title)) {
            console.log('Task with same title already exists');
            return null
        }

        let task = new Task(this.nextId++, title, 'pending')
        this.tasks.push(task);
        return task;
    }

    getAllTasks(): List[]{
        return this.tasks;
    }

    getTaksById(id: number){
        return this.tasks.find((item: List) => item.id == id);
    }

    editTask(id: number, title: string): void{

        if(this.isTaskExist(title)){
            console.log('The name with same title already exists');
            return   
        }
        let task = this.getTaksById(id);
        if(task){
            task.title = title;
        }
    }

    completeTask(id: number){
        let task = this.getTaksById(id);
        if(task){
            if(task.status == 'done'){
                task.status = 'pending';
            }else{
                task.status = 'done';
            }
        }
    }

    deleteTask(id: number){
        const index = this.tasks.findIndex((item) => item.id == id);
        if(index != -1){
            this.tasks.splice(index, 1);
        }
    }
}