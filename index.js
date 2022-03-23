let ul = document.getElementById("todoUl");
    let input = document.getElementById("newTaskEntry");
    let btn = document.querySelector(".btn");

    btn.addEventListener("click", newTask);

    let taskList = [];

    function newTask(e) {
        e.preventDefault();
        let inputVal = document.getElementById("newTaskEntry").value;
        const id = new Date().getTime().toString();

        if (inputVal === "") {
            alert("You must write something!");
        } else {
            renderItem(inputVal, id);
            addToTaskList(inputVal, id);
        }
            input.value = "";
    }

    function renderItem(inputVal, id) {
        //create the container div with the Id attribute and item class
        const element = document.createElement("div");
        let attribute = document.createAttribute("data-id");
        attribute.value = id;
        element.setAttributeNode(attribute);
        element.classList.add("item");

        //Create the paragraph for the text title and append to the main element container as a child
        let pText = document.createElement("p");
        pText.textContent = inputVal;
        pText.classList.add('p-text');
        element.appendChild(pText);

        //Create a container for the edit/delete options
        let changeWrapper = document.createElement("div");
        changeWrapper.classList.add('change-wrapper');
        element.appendChild(changeWrapper);

        //Create the Edit span
        let spanEdit = document.createElement("SPAN");
        let y = document.createTextNode("Edit");
        spanEdit.classList.add("edit");
        spanEdit.appendChild(y);
        changeWrapper.appendChild(spanEdit);

        //Create the Delete span 
        let spanDelete = document.createElement("SPAN");
        let x = document.createTextNode("Delete");
        spanDelete.classList.add("delete");
        spanDelete.appendChild(x);
        changeWrapper.appendChild(spanDelete);

        //Add event listeners
        const deletion = element.querySelector(".delete");
        deletion.addEventListener("click", deleteItem);

        const updating = element.querySelector(".edit");
        updating.addEventListener("click", editItem);

        //Add the element Div Wrapper to the ul
        ul.appendChild(element);
    }

    function addToTaskList(inputVal, id) {
        const additionalItem = { inputVal, id };
        taskList.push(additionalItem);
    }

    function deleteItem(e) {
        e.preventDefault();
        let parent = e.target.parentElement.parentElement;
        let id = parseInt(parent.getAttribute('data-id'));
        let deleteIndex;

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                deleteIndex = i;
                break;
            }
        }
        taskList.splice(deleteIndex, 1);
        updateState();
    };

    function updateState() {
        ul.innerHTML = "";

        for (let i = 0; i < taskList.length; i++) {
            let inputVal = taskList[i].inputVal;
            let id = taskList[i].id;
            renderItem(inputVal, id);
        }
    }

    function editItem(e) {
        e.preventDefault();
        let parent = e.target.parentElement.parentElement;
        let id = parseInt(parent.getAttribute('data-id'));
        let textArea = e.target.parentElement.previousElementSibling;
        let textData = textArea.textContent;
        
        parent.innerHTML = `
            <form class="edit-wrapper">
                <div data-id=${id} class="edit-wrapper">
                    <input type='text' class='edit-input'>
                    <button type='submit' class='edit-btn'>Update</button>
                </div>
            </form>`
        parent.querySelector(".edit-input").value = textData;
        const updateBtn = parent.querySelector(".edit-btn");
        updateBtn.addEventListener("click", updateEditItem);
    }

    function updateEditItem(e) {
        e.preventDefault();
        let parent = e.target.parentElement;
        let id = parseInt(parent.getAttribute('data-id'));
        let newInputVal = parent.querySelector(".edit-input").value;

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList[i].inputVal = newInputVal;
            }
        }
        updateState();
    }