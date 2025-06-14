import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input.trim(), isEditing: false }]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isEditing = true;
    setTasks(newTasks);
  };

  const saveTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    newTasks[index].isEditing = false;
    setTasks(newTasks);
  };

  return (
    <div className="app-container">
      <h1 className="title">Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => {
                    const newTasks = [...tasks];
                    newTasks[index].text = e.target.value;
                    setTasks(newTasks);
                  }}
                />
                <button
                  onClick={() => saveTask(index, task.text)}
                  className="edit-btn"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.text || "No Task Name"}</span>
                <div className="btns">
                  <button onClick={() => editTask(index)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="del-btn"
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
  );
}

export default App;
