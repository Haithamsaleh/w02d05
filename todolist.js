

let toDos = [];

if (!retrievedData) {
  toDos = [
    { value: "code", isCompleted: true },
    { value: "code", isCompleted: true },
    { value: "code", isCompleted: false },
  ];
} else {
  toDos = retrievedData;
}


const reLoadCounter = () => {
  const counterArray = toDos.filter((todo) => {
    return todo.isCompleted == false;
  });
  $("#counter").html(counterArray.length);
};


const renderToDos = () => {
  $(".list").html("");
  toDos.forEach((todo, i) => {
    $(".list").append(`<li class="listItem" id="listItem${i}">
    <span id="todo${i}" class="${
      todo.isCompleted ? "completedItem" : "unCompletedItem"
    }" onclick="completeToDo(${i}); return false">${todo["value"]}</span>
    <span class="options">
    <a class="editItem" onclick="editToDo(${i})">Edit</a>
    <a class="removeItem" onclick="removeToDo(${i})">Remove</a>
    </span>
    </li>`);
  });
  reLoadCounter();
};

render();

const addToDo = () => {
  const inputValue = $("#todoInput").val();
  if (inputValue.length && inputValue.trim().length) {
    toDos.push({
      value: inputValue,
      isCompleted: false,
    });
  }
  $("#todoInput").val("");
  render();
};


const remove = (todoIndex) => {
  toDos = toDos.filter((todo, index) => {
    if (todoIndex !== index) {
      return todo;
    }
  });
  render();
};


const editToDo = (todoIndex) => {
  toDos.forEach((todo, index) => {
    if (todoIndex === index) {
      $(`#listItem${index}`).html(`<input id="todoEditInput" type="text">`);
      $("#todoEditInput").on("blur", () => {
        todo.value = $("#todoEditInput").val();
        render();
      });
    }
  });
};


const completeToDo = (todoIndex) => {
  toDos.forEach((todo, index) => {
    if (todoIndex === index) {
      if (todo.isCompleted == false) {
        todo.isCompleted = true;
        render();
      } else {
        todo.isCompleted = false;
        render();
      }
    }
  });
};


const clearAllToDos = () => {
  toDos.length = 0;
  render();
};


const clearAllCompletedToDos = () => {
  toDos = toDos.filter((todo) => {
    return !todo.isCompleted;
  });
  render();
};


$("#addButton").click(addToDo);
$("#clearList").click(clearAllToDos);
$("#clearCompleted").click(clearAllCompletedToDos);