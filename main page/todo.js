// Element Seçimi 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[2];
const secondCardBody = document.querySelectorAll(".card-body")[3];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector(".clear-todos") ;

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    todoList.addEventListener("click",deleteToDo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}



function clearAllTodos(){
    
    if (todoList.firstElementChild === null) {
        showAlert2("danger","Silinecek madde olduğundan emin olunuz!!")
    }
    else if ( confirm("Tümünü silmek istediğinizden emin misiniz ?")){

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
    
}

function showAlert2(type,message) {

    const alert2 = document.createElement("div");

    alert2.className= `alert alert-${type}` ;
    alert2.textContent = message ;

    secondCardBody.appendChild(alert2);

    setTimeout(function(){
        alert2.remove()
    }, 3000) ;
}



function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = secondCardBody.querySelectorAll(".list-group-item");
    // bütün grup itemlerini aldık.

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if ( text.indexOf(filterValue) === -1) {
            //text içinde filterValue yok ise.
            listItem.setAttribute("style","display:none !important");
        }
        else {
            listItem.setAttribute("style","display:block");
        }

    })
}

function deleteToDo(e){
    if ( e.target.className = "fa fa-trash") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim()) ;
        showAlert("success","Todo Başarıyla Silindi..")
    }
    console.log(e.target);
}

function  deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if ( todo === deletetodo){
            todos.splice(index,1); 
        }
    });
    
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e) {

    const newTodo = todoInput.value.trim() ;
    

    if( newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz..");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Başarılı bir giriş yaptınız..");       
    };




    e.preventDefault() ;
}

function getTodosFromStorage(){  // Storage'dan todo çektim.

    let todos ;

    if( localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos ; // !!! Önemli !!! 
}


function addTodoToStorage(newTodo) { // Storage'a todo güncelledim.

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function showAlert(type,message) {

    const alert = document.createElement("div");

    alert.className= `alert alert-${type}` ;
    alert.textContent = message ;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove()
    }, 3000) ;
}



function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.className= "delete-item";
    link.innerHTML= "<i class='fa fa-trash'> </i>"
    link.href= "#"

    listItem.className= "list-group-item d-flex justify-content-between" ;

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);

}


