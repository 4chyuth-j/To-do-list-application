import React, { useState } from "react";

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    function handleInputChange(event) {
        setNewTask(prevNewTask => prevNewTask = event.target.value)
    }

    function addTask() {
        let addNewTask = {
            task: newTask,
            completed: false
        };
        if (addNewTask.task.length != 0) {
            setTasks(prevTask => [addNewTask, ...prevTask]);
        }

        setNewTask('');
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i != index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) => {
            console.log('Index:', i, 'Task:', task);
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }




    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input type="text" name="" id="" placeholder="Enter a task..."
                    value={newTask} onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>
                    ADD
                </button>
            </div>

            {tasks.length == 0 ?
                (<p>No Tasks Added Yet</p>) :
                (<ol>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.task}</span>
                            <input type="checkbox" className="task-done" checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
                            <button className="delete-button" onClick={() => deleteTask(index)}>🗑️</button>
                            <button className="move-button" onClick={() => moveTaskUp(index)}>⬆️</button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}>⬇️</button>
                        </li>
                    )}
                </ol>)
            }



        </div>
    )
}

export default ToDoList;