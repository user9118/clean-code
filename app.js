
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

let newTask = document.querySelector(".new-task");//Add a new task text
let addButton = document.querySelector(".add-task-btn");//Add button
let todoTasks = document.querySelector(".todo-tasks");
let completedTasksHolder = document.querySelector(".completed-tasks");

//New task list item

let createNewTaskElement = function(taskString){

    let listItem = document.createElement("li");
    listItem.classList.add("task");
    //input (checkbox)
    let checkBox = document.createElement("input");
    checkBox.classList.add("task-done");
    checkBox.type = "checkbox";
    //label
    let label = document.createElement("label");
    label.classList.add('input-task');
    label.innerText = taskString;
    //input (text)
    let editInput = document.createElement("input");
    editInput.classList.add("input-task")
    editInput.type = "text";
    //button.edit
    let editButton = document.createElement("button");
    editButton.classList.add("edit-btn")

    //button.delete
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn")
    let deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("delete-btn-border")
    deleteButtonImg.src = './remove.svg';

    //Each elements, needs appending
    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

//Edit an existing task.

let editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type = text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit-btn");
    var containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};

//Delete task.

var deleteTask = function(){
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    console.log()
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    todoTasks.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

let bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    //select ListItems children
        var checkBox = taskListItem.querySelector("input[type = checkbox]");
        var editButton = taskListItem.querySelector(".edit-btn");
        var deleteButton = taskListItem.querySelector(".delete-btn");
        //Bind editTask to edit button.
        editButton.onclick = editTask;
        //Bind deleteTask to delete button.
        deleteButton.onclick = deleteTask;
        //Bind taskCompleted to checkBoxEventHandler.
        checkBox.onchange = checkBoxEventHandler;
    }
    
    let addTask = function(){
        console.log("Add Task...");
        //Create a new list item with the text from the #new-task:
        if (!newTask.value) return;
        var listItem = createNewTaskElement(newTask.value);
        //Append listItem to todoTasks
        todoTasks.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        newTask.value = "";
    }


var ajaxRequest = function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addButton.onclick = addTask;


addButton.addEventListener("click", addTask);

//cycle over todoTasks ul list items
//for each list item
for (var i = 0; i<todoTasks.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(todoTasks.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.