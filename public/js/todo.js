const tasks = [{id: 1, name: 'Hacer una tarea', daily: true}, {id: 2, name: 'Hacer una tarea', daily: true}, {id: 3, name: 'Hacer una tarea', daily: true}];
let selectedTask;

function displayNewTaskModal(){
    $('#newTaskModal').modal('show')
}

function displayDeleteTaskModal(){
    $('#deleteTaskModal').modal('show')
    $('#deleteTaskId')[0].value = selectedTask;
}

function displayEditTaskModal(){
    $('#editTaskModal').modal('show')
    $('#editTaskName')[0].value = taskData.filter(i => i.id==selectedTask)[0].name;
    $('#editTaskId')[0].value = selectedTask;
    $('#taskDoLink')[0].href = '/tasks/do/' + selectedTask;
}

/*function handleNewTaskButton(){
    const taskName = $('#taskName')[0].value;
    if(taskName=='' || taskName==undefined || taskName==null){
        $('#taskNameError')[0].classList.remove('d-none');
        return null;
    }
    $('#newTaskForm')[0].classList.add('d-none');
    $('#loadNewTaskForm')[0].classList.remove('d-none');
    console.log(taskName)
}*/

function selectTask(id){
    selectedIconController(id);
    actionButtonController();
}

function selectedIconController(id){
    const selectedIcon = $('#'+id+'selectedbutton')[0]
    const unselectedIcon = $('#'+id+'unselectedbutton')[0]
    if(selectedIcon && unselectedIcon){
        console.log(0)
        selectedIcon.classList.toggle('d-none');
        unselectedIcon.classList.toggle('d-none');
    }
    if(selectedTask==undefined){
        selectedTask=id;
    }else if(selectedTask==id){
        selectedTask=undefined;
    }else{
        const aselectedIcon = $('#'+selectedTask+'selectedbutton')[0];
        const anoselectedIcon = $('#'+selectedTask+'unselectedbutton')[0];
        aselectedIcon.classList.toggle('d-none');
        anoselectedIcon.classList.toggle('d-none');
        selectedTask=id;
    }
}

function actionButtonController(){
    const addTaskButton = $('#addTaskButton')[0];
    const editTaskButton = $('#editTaskButton')[0];
    const deleteTaskButton = $('#deleteTaskButton')[0];
    if(selectedTask==undefined && (!editTaskButton.classList.contains('d-none') || !deleteTaskButton.classList.contains('d-none'))){
        editTaskButton.classList.toggle('d-none');
        deleteTaskButton.classList.toggle('d-none');
    }else if(editTaskButton.classList.contains('d-none') || deleteTaskButton.classList.contains('d-none')){
        editTaskButton.classList.toggle('d-none');
        deleteTaskButton.classList.toggle('d-none');
    }
}

