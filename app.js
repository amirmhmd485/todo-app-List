// start add task
let content = document.querySelector(".contents");
let input = document.querySelector(".input input");
let addBtn = document.querySelector(".input button");
let allLength = document.querySelector("span.lenegthAll")
let activeLength = document.querySelector("span.lengthstill")
let completedLength = document.querySelector("span.lengthcompleted")
let arrOfTasks = [];

function addTask(arr){
    content.innerHTML = "";
    let identity = 0;
    arr.forEach((task) => {
        content.innerHTML += `
            <div class="task" id = "${identity}">
                <div class="left">
                    <div class="check">
                        <img src="images/icon-check.svg" alt="check" class= "${task.done ? "show":""}">
                    </div>
                    <h3>${task.name}</h3>
                </div>
                <img src="images/icon-cross.svg" alt="" class = "delete">
            </div>
        `
        identity++;
    })
}
function clickAdd(){
    if(input.value != ""){
        let obj = {
            id: arrOfTasks.length,
            name:input.value,
            done:false,
        }
        arrOfTasks.push(obj);
        addTask(arrOfTasks);
        input.value = "";
        allLength.innerHTML = arrOfTasks.length;
        savetolocalstorage(arrOfTasks);
    }
}
addBtn.addEventListener("click" , clickAdd);
// end add task
// start delete Task
function deleteTask(e){
    if(e.target.classList.contains("delete")){
        let idItem = e.target.parentElement.getAttribute("id");
        e.target.parentElement.remove();
        arrOfTasks.splice(idItem , 1);
        addTask(arrOfTasks);
        allLength.innerHTML = arrOfTasks.length;
        arrOfTasks.forEach((task , index) => {
            task.id = index;
        })
        savetolocalstorage(arrOfTasks);
        allLength.innerHTML = arrOfTasks.length;
    }
}
content.addEventListener("click" , deleteTask);
// end delete Task
// start update
function updateTask(e){
    if(e.target.classList.contains("check")){
        let imgCheck = e.target.children[0]
        let itemId = +e.target.parentElement.parentElement.getAttribute("id");
        if(imgCheck.classList.contains("show")){
            imgCheck.classList.remove("show");
            arrOfTasks.forEach((task) => {
                if(task.id == itemId){
                    task.done = false;
                }
            })
        }
        else{
            imgCheck.classList.add("show");
            arrOfTasks.forEach((task) => {
                if(task.id == itemId){
                    task.done = true;
                }
            })
        }
        savetolocalstorage(arrOfTasks);
    }
}
content.addEventListener("click" , updateTask);
// end update
// start filtering
// start active
let allButtons = document.querySelectorAll(".content .head .filter button");
allButtons.forEach((btn , i) => {
    btn.addEventListener("click" , function(e){
        allButtons.forEach((b) => {
            b.classList.remove("active");
        })
        btn.classList.add("active");
        if( i == 0){
            addTask(arrOfTasks);
        }
        else if( i == 1){
            filteringNotDone(arrOfTasks);
        }
        else{
            filteringDone(arrOfTasks);
        }
    })
})
// end active
function filteringDone(arr){
    arr = arr.filter((e) =>{
        if(e.done == true){
            return e;
        }
    })
    addTask(arr);
    completedLength.innerHTML = arr.length;
}
function filteringNotDone(arr){
    arr = arr.filter((e) =>{
        if(e.done == false){
            return e;
        }
    })
    addTask(arr);
    activeLength.innerHTML = arr.length;
}
// end filtering
// start localstorage
function savetolocalstorage(arr){
    localStorage.setItem("tasks" , JSON.stringify(arr));
}
window.addEventListener("load" , function(e){
    arrOfTasks = JSON.parse(this.localStorage.getItem("tasks"));
    addTask(arrOfTasks);
})
// end localstorage