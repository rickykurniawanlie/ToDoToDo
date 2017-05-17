//---------------------------VARIABLES-----------------------------

var addButton = document.getElementById("add");
var taskInput = document.getElementById("new-task");
var descInput = document.getElementById("new-description");
var startDate = document.getElementById("start-date");
var endDate = document.getElementById("end-date");
var priorityInput = document.getElementById("priority");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completeTasksHolder = document.getElementById("completed-tasks");

//---------------------------FUNCIONS-----------------------------

var createNewListElement = function(taskString, descString) {
    //Create list item
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    var labelDesc = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //textarea
    var textAreaInput = document.createElement("textarea");
    //button .edit
    var editButton = document.createElement("button");
    //button .delete
    var deleteButton = document.createElement("button");
    // each element needs modifying
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerHTML = "Edit";
    editButton.className = "edit";
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    label.innerHTML = taskString;
    labelDesc.className = "label-description";
    labelDesc.innerHTML = descString;

    // and each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(labelDesc);
    listItem.appendChild(textAreaInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

var addTask = function() {
    if (taskInput.value) {
        //Create new list item with text from #new-task
        var listItem = createNewListElement(taskInput.value, descInput.value);
        //append list item to incompleteTasksHolder
        incompleteTasksHolder.appendChild(listItem);

        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
        descInput.value = "";
    }
};

var deleteTask = function() {
    console.log(this.nodeName);
    var listItem = this.parentNode;
    console.log(listItem.nodeName);
    var ul = listItem.parentNode;
    console.log(ul.nodeName);
    ul.removeChild(listItem);
};

var taskCompleted = function() {
    var listItem = this.parentNode;
    completeTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var editTask = function() {

    var editButton = this;
    var listItem = this.parentNode;

    var label = listItem.querySelector("label");
    var labelDesc = listItem.querySelector(".label-description");
    var textarea = listItem.querySelector("textarea");
    var editInput = listItem.querySelector("input[type=text]");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        labelDesc.innerText = textarea.value;
        editButton.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        textarea.value = labelDesc.innerText;
        editButton.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};

var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
    //console.log("Binding list item events");
    //select taskListItem's children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
    editButton.addEventListener("click", editTask);
    //bind deleteTask to deleted button
    deleteButton.addEventListener("click", deleteTask);
    //bind checkboxEventHandler to checkbox
    checkbox.onchange = checkboxEventHandler;
};

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to li item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over CompleteTasksHolder ul list items
for (var i = 0; i < completeTasksHolder.children.length; i++) {
    //bind events to li item's children (taskIncompleted)
    bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);
