// tüm elementleri seçme 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners(); 

function eventListeners(){  // tüm event listenerler

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){ // arayüzden tüm todoları temizleme
    if(confirm("Tüm verilerini silmek istediğinizden eminmisiniz ?")) {
        // arayüzden todoları silme
       // todoList.innerHTML="";

       while(todoList.firstElementChild != null){
           todoList.removeChild(todoList.firstChild);
       }
       localStorage.removeItem("todos");
    }
}    

function filterTodos(e){ // filtreleme functionu
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // bulamadığında
            listItem.setAttribute("style","display : none !important");
            }
            else{
                listItem.setAttribute("style","display: block");
            }
    });
    
}

function deleteTodo(e){// todo silme functionu
    if (e.target.className==="fa fa-remove"){ // target tıkladığımız alanı bulmamıza yarıyor
        e.target.parentElement.parentElement.remove(); // parenElement tıkladığımız alanın dış kümesini alıyor <li> <a></a></li> gibi
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)

        showAlert("success", "Başarıyla Silinmiştir");
    }

}

function loadAllTodosToUI(){ // locale kaydettiğimiz todolar sayfa yenideiktensonrada karşımızda gelmesini sağlar
    let todos= getTodoFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function deleteTodoFromStorage(deleteTodo){

    let todos= getTodoFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo){
            todos.splice(index,1);// arrayden değer silmeye yarar
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

        if (newTodo === ""){
    
        showAlert("danger","Lütfen Boş Bırakmayınız!");

        }

else{

    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Başarıyla eklenmiştir.");
}
    
    e.preventDefault();

}
function getTodoFromStorage(){// storagedan tüm todolarımızı almaya yarar
    let todos;
  
    if (localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoToStorage(newTodo){

  let todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));
  
}

function showAlert(type,message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}` ;     //template litreal yöndemi kullanıldı altgr +2 kere noktalı virgüle basılarak 
    alert.textContent = message;
    firstCardBody.appendChild(alert);


    // setTimeout metodu belirlenen süre içerisinde  functionumuzu çalıştıracak

   setTimeout(function(){
        alert.remove();// alertimizi kaldıracak 
    },2000);
} 

function addTodoToUI(newTodo){ // String olarak ekleme yapacak 
  
    // list item olçuşturma 
    const listItem = document.createElement("li");
    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // text node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // todo liste list item ekleme 
    todoList.appendChild(listItem);
    todoInput.value = "";
}