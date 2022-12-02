import React, {useState} from "react";
import Task from "./Task.jsx";

const TodoList = () => {

    const [inputValue, setInputValue ] = useState('');
    const [error, setError] = useState(false);
    const [tasks, setTask] = useState([]);
    
    const addTask = (event) => {
        if (event.key === "Enter"){
            if (inputValue != ""){
                setTask(prev => [...tasks, inputValue])
                setInputValue("")
                setError(false)
            } else {
                setError(true)
            }
        } 
    }

    const deleteTask = (id) => {
        let newTasks = tasks.filter((item, index) => id != index)
        setTask(newTasks)
    }

	return (
		<div className="max-min container d-flex flex-column justify-content-center align-items-center border rounded">
            <div className="display-4 border-bottom mt-2">To-Do List</div>
            <div className="form-group m-3">
                <input
                    className="form-control"
                    placeholder="What needs to be done?"
                    onKeyPress={addTask}
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                />
            </div>
            <div className="w-100">
                {error === true ? <div className="alert alert-danger">The task cannot be empty.</div> : null}
                {tasks.map((item, index) => <Task key={index} id={index} task={item} deleteTask={deleteTask}/>)}
            </div>
        </div>
	);
    
};

export default TodoList;