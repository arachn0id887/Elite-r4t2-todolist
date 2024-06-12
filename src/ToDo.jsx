import React, {useState, useEffect} from "react";

function ToDo(){
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [newtask, setNewtask] = useState("");
  const taskbar = document.querySelector(".taskbar")

  useEffect(() => {localStorage.setItem("tasks", JSON.stringify(tasks))}, [tasks]);

  function handleChange (event) {
    event.preventDefault();
     setNewtask(event.target.value)
  }

  function addTask() {
   if(newtask.trim().length !== 0){
    setTasks((tasks) => [...tasks, newtask])
   setNewtask("")}
   }
   function enter(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setNewtask(event.target.value);
  }
  
  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    document.getElementById(`item-${index}`).style.textDecoration = "none";

    for (i = index + 1; i < tasks.length; i++) {
        document.getElementById(`item-${i}`).setAttribute = "id", `item-${i - 1}`;
        document.getElementById(`edit-${i}`).setAttribute = "id", `edit-${i - 1}`;
    }
  }
  function completeTask(i){
    const item = document.getElementById(`item-${i}`);
    item.style.textDecoration = "line-through";
    item.style.textDecorationColor = "black";
  }
  
  function editTask(i){
    document.getElementById(`item-${i}`).focus();
    document.getElementById(`item-${i}`).contentEditable = "true";
    document.getElementById(`item-${i}`).style.animation = "blink 1s 3";
    document.getElementById(`edit-${i}`).style.display = "block"
  }

  function stopBlink(i){
    document.getElementById(`item-${i}`).blur();
    document.getElementById(`item-${i}`).contentEditable = "false";
    document.getElementById(`item-${i}`).style.animation = "none";
     document.getElementById(`edit-${i}`).style.display = "none";
  }

return(
  <div className="todolist" spellCheck="false">
    <h1>TO DO LIST</h1>
    <input type="text" onChange={handleChange} onKeyUp={enter} placeholder="Add new task..." value={newtask} className="taskbar" />
    <button onClick={addTask} className="addbtn"><i className="fa-solid fa-plus"></i></button>
    <ul>
      
      {tasks.map((element, i) => <li key={i} className="listitem">
       <p id={`item-${i}`} contentEditable="false" suppressContentEditableWarning={true}>{element}</p>
       <button id={`edit-${i}`} onClick={() => stopBlink(i)}>SAVE</button>
       <div className="buttons">
       <button onClick={() => completeTask(i)}><i className="fa-solid fa-square-check"></i></button>
       <button onClick={() => editTask(i)}><i className="fa-solid fa-pen-to-square"></i></button>
       <button onClick={() => removeTask(i)}><i className="fa-solid fa-trash"></i></button>
       </div>
        </li> )}
    </ul>
  </div>
)
}
export default ToDo
