"use client";
import React from "react";
import "./todo.css";
import { useEffect,useState } from "react";

export default function Todo() {
  const [todoList, setTodoList] = useState(0);
  const [doingList, setDoingList] = useState(0);
  const [doneList, setDoneList] = useState(0);
  const [Modal, setModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskdetails, setTaskdetails] = useState("");
  const [taskColor, setTaskColor] = useState("#ffffff"); 
  const [taskList, setTaskList] = useState([]);
  const [subtaskName, setSubtaskName] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedSubtask, setEditedSubtask] = useState("");
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
    const colors = [  
    '#4A593D', 
    '#6C8672',
    '#8BA382',  
    '#D99E73', 
    '#F2C78F',
    '#FF5E57',
    '#D9534F', 
    '#A9C1A9'
  ];
  function handleColorSelection(selectedColor) {
  setTaskColor(selectedColor); 
}
  useEffect(() => {
  const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
  const storedDoingTasks = JSON.parse(localStorage.getItem("doingTasks")) || [];
  const storedDoneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

  if (storedTasks.length > 0) setTaskList(storedTasks);
  if (storedDoingTasks.length > 0) setDoingTasks(storedDoingTasks);
  if (storedDoneTasks.length > 0) setDoneTasks(storedDoneTasks);

}, []);
  useEffect(() => {
    setTodoList(taskList.length);
    setDoingList(doingTasks.length);
    setDoneList(doneTasks.length);
  }, [taskList, doingTasks, doneTasks]);




  useEffect(() => {

    localStorage.setItem("taskList", JSON.stringify(taskList));
    localStorage.setItem("todoList", todoList.toString());
    localStorage.setItem("doingTasks", JSON.stringify(doingTasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    localStorage.setItem("doingList", doingList.toString());
    localStorage.setItem("doneList", doneList.toString());
  }, [taskList, doingTasks, doneTasks, todoList, doingList, doneList]);





  function moveTaskToDoing(index) {
  const taskToMove = taskList[index];
  setDoingTasks([...doingTasks, taskToMove]);
  const updatedTaskList = taskList.filter((_, i) => i !== index);
  setTaskList(updatedTaskList);
  setTodoList(todoList - 1);
  setDoingList(doingList + 1);  
}

function moveTaskToDone(index) {
  const taskToMove = doingTasks[index];
  setDoneTasks([...doneTasks, taskToMove]);
  const updatedDoingTasks = doingTasks.filter((_, i) => i !== index);
  setDoingTasks(updatedDoingTasks);
  setDoingList(doingList - 1);
  setDoneList(doneList + 1);  
}


  function handleEditSubtask(index) {
    setEditingIndex(index);
    setEditedSubtask(subtasks[index]);
  }

  function handleUpdateSubtask() {
    const updatedSubtasks = subtasks.map((subtask, index) =>
      index === editingIndex ? editedSubtask : subtask
    );
    setSubtasks(updatedSubtasks);
    setEditingIndex(-1);
    setEditedSubtask("");
  }

  function handleEditTask(index) {
    const taskToEdit = taskList[index];
    setTaskName(taskToEdit.name);
    setTaskdetails(taskToEdit.details);
    setSubtasks(taskToEdit.subtasks);
    setTaskColor(taskToEdit.color); 
    setEditingTaskIndex(index);
    setModal(true);
  }

 function handleDeleteTask(index) {
  const updatedTaskList = taskList.filter((_, i) => i !== index);
  setTaskList(updatedTaskList);
  setTodoList(todoList - 1);  
}


  function handleAddSubtask() {
    if (subtaskName === "") {
      alert("Subtask Name is required");
    } else {
      setSubtasks([...subtasks, subtaskName]);
      setSubtaskName("");
    }
  }

  function handleDeleteSubtask(index) {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  }

  function openmodal() {
    setModal(true);
  }

  function closemodal() {
    setModal(false);
  }

  function handleAddTask() {
  

  if (taskName === "" || taskdetails === "") {
    alert("Task Name and Task Details are required");
  } else {
    const updatedTask = {
      name: taskName,
      details: taskdetails,
      subtasks: subtasks,
      color: taskColor,
    };

    if (editingTaskIndex > -1) {
      
      const updatedTaskList = [...taskList];
      updatedTaskList[editingTaskIndex] = updatedTask;
      setTaskList(updatedTaskList);
      setEditingTaskIndex(-1);
    } else {
      
      setTaskList([...taskList, updatedTask]);
      setTodoList(todoList + 1);
    }

    
    setTaskName("");
    setTaskdetails("");
    setSubtasks([]);
    setTaskColor("#ffffff");
    closemodal();
  }
}



  return (
    <>
      <div id="task" className="todo-card">
        <button
          id="bot"
          className="bg-white-500 hover:bg-black-200 text-black py-2 px-2 rounded"
          onClick={() => openmodal()}>
          Add New Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="done-container">
          <div className="todo-header">
            <div className="todo-card">
              <h1 className="todo-h1">Todo</h1>
              <p className="todo-p1">{todoList}</p>
            </div>
          </div>
          <div className="todo-body">
            {taskList.map((task, index) => (
              <div
                className="todo-item"
                key={index}
                style={{ backgroundColor: task.color }}>
                <h3>{task.name}</h3>
                <p>{task.details}</p>

                {task.subtasks && (
                  <ul>
                    {task.subtasks.map((subtask, subIndex) => (
                      <li key={subIndex}>{subtask}</li>
                    ))}
                  </ul>
                )}
                <div className="task-menu">
                  <div
                    className="three-dots"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      const menuContent = e.currentTarget.nextElementSibling;
                      menuContent.style.display =
                        menuContent.style.display === "block"
                          ? "none"
                          : "block"; 
                    }}>
                    ...
                  </div>
                  <div className="menu-content">
                    <button onClick={() => handleEditTask(index)}>
                      Edit Task
                    </button>
                    <button onClick={() => handleDeleteTask(index)}>
                      Delete Task
                    </button>
                    <button onClick={() => moveTaskToDoing(index)}>
                      Move to Doing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="done-container">
          <div className="todo-header">
            <div className="todo-card">
              <h1 className="todo-h1">Doing</h1>
              <p className="todo-p">{doingList}</p>
            </div>
          </div>
          <div className="todo-body">
            {doingTasks.map((task, index) => (
              <div
                className="todo-item"
                key={index}
                style={{ backgroundColor: task.color }}>
                <h3>{task.name}</h3>
                <p>{task.details}</p>

                {task.subtasks && (
                  <ul>
                    {task.subtasks.map((subtask, subIndex) => (
                      <li key={subIndex}>{subtask}</li>
                    ))}
                  </ul>
                )}

                <div className="task-menu">
                  <div
                    className="three-dots"
                    onClick={(e) => {
                      e.stopPropagation();
                      const menuContent = e.currentTarget.nextElementSibling;
                      menuContent.style.display =
                        menuContent.style.display === "block"
                          ? "none"
                          : "block";
                    }}>
                    ...
                  </div>
                  <div className="menu-content">
                    <button onClick={() => moveTaskToDone(index)}>
                      Move to Done
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="done-container">
          <div className="todo-card">
            <h1 className="todo-h1">Done</h1>
            <p className="todo-p2">{doneList}</p>
          </div>
          <div className="todo-body">
            {doneTasks.map((task, index) => (
              <div
                className="todo-item"
                key={index}
                style={{ backgroundColor: task.color }}>
                <h3>{task.name}</h3>
                <p>{task.details}</p>

                {task.subtasks && (
                  <ul>
                    {task.subtasks.map((subtask, subIndex) => (
                      <li key={subIndex}>{subtask}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        
    {Modal && (
      <div id="modal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div id="modal-content" className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Add New Task</h2>

          <input
            type="text"
            placeholder="Task Name"
            className="border border-gray-300 rounded p-2 w-full mb-4"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Details"
            className="border border-gray-300 rounded p-2 w-full mb-4"
            value={taskdetails}
            onChange={(e) => setTaskdetails(e.target.value)}
          />

          
          <div className="color-picker mb-4">
            <h3>Select Task Color:</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border ${taskColor === color ? 'border-black' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelection(color)}
                ></div>
              ))}
            </div>
          </div>

          
          <div className="subtask-container">
            <h3 className="text-md mb-2">Subtasks</h3>
            <input
              type="text"
              placeholder="Subtask Name"
              className="border border-gray-300 rounded p-2 w-full mb-2"
              value={subtaskName}
              onChange={(e) => setSubtaskName(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
              onClick={handleAddSubtask}
            >
              Add Subtask
            </button>

            <ul className="list-disc pl-4 mt-2">
              {subtasks.map((subtask, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedSubtask}
                        onChange={(e) => setEditedSubtask(e.target.value)}
                      />
                      <button
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                        onClick={handleUpdateSubtask}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{subtask}</span>
                      <div className="flex gap-2">
                        <button
                          className="ml-2 bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                          onClick={() => handleEditSubtask(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                          onClick={() => handleDeleteSubtask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2"
              onClick={() => closemodal()}
            >
              &larr; Back
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleAddTask}
            >
              {editingTaskIndex > -1 ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    )}
      </div>
    </>
  );
}
