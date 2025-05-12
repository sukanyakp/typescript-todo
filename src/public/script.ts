let addForm = document.getElementById('addTodoForm') as HTMLFormElement;

addForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    let input = document.getElementById('todoText') as HTMLFormElement;
    if(input.value.trim()){
        const response = await fetch('add-task', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: input.value.trim()})
        })

        if(response.ok){
            location.reload();
            addForm.reset()
        }
    }
});

let taskList = document.getElementById('todoUl') as HTMLElement;

taskList.addEventListener('click', async (event: Event) => {
    let target = event.target as HTMLElement;
    if(target.id == 'delete-btn'){
        let taskId = target.getAttribute('data-task-id');
        const response = await fetch('delete-task', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: taskId})
        });

        if(response.ok){
            location.reload();
        }
    }else if(target.id == 'done-btn'){
        let taskId = target.getAttribute('data-task-id');

        const response = await fetch('complete-task', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: taskId})
        });

        if(response.ok){
            location.reload();
        }
    }else if(target.id == 'edit-btn'){
        let id = target.getAttribute('data-task-id');
        let spanElement = document.getElementById(`task-title-${id}`) as HTMLElement;
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = spanElement.innerText;
        inputElement.id = 'edit-input';
        spanElement.replaceWith(inputElement);
        inputElement.focus();
        target.classList.replace('fa-pencil', 'fa-floppy-o');
        target.setAttribute('id', `save-btn`);
    }else if(target.id == 'save-btn'){
        let id = target.getAttribute('data-task-id');
        let title = document.getElementById('edit-input') as HTMLFormElement;
        const response = await fetch('edit-task', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, title: title.value})
        })
        if(response.ok){
            location.reload();
        }
    }
})