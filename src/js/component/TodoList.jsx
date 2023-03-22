import React, {useState, useEffect} from "react";
import Task from "./Task.jsx";

// Clase del 7/12/2022, resolvimos el problema que estaba pasando ajustando el orden el que el getTask era llamado.
// El problema es que no coincidia el recibir la data y la actualizacion del componente.
// Tengo que revisar los comentarios para ver los cambios que se hicieron y por qué.
// Tambien tengo que hacer las verificaciones de la respuesta recibida bien, y a partir de eso, ejecutar el codigo que quiero.
// Porque estaba haciendo el fetch, e indenpendientemente de lo que recibia, si lo recibia o no, ejecutaba lo que ejecutaba.

const TodoList = () => {

    const [inputValue, setInputValue ] = useState('');
    const [error, setError] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [tasks, setTask] = useState([]);
    const [spinner, setSpinner] = useState(false);
    
    // getTasks is the function that makes a GET request to the API to get the tasks.

    const getTasks = async () => {
        setSpinner(true)
        try {
                let receivedTasks = await fetch('https://assets.breatheco.de/apis/fake/todos/user/beltran', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"  
                }
                })
                let data = await receivedTasks.json()
                setTask(data)
                setSpinner(false)
                console.log(data)
            } 
        catch (error) {
                console.log(error)
            }
    }

    // modifyTasks is the function that makes a PUT request to the API to modify the task list on the database to whatever task list we send it as argument in the function call.

    const modifyTasks = async (modifiedTasks) => {
        //setSpinner(true)
        console.log(modifiedTasks)
        try {
            let response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/beltran', {
                method: "PUT",
                body: JSON.stringify(modifiedTasks),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            if (response.status === 400){
                setError(true)
                setErrortext("The to-do list cannot be empty.")
            }
            getTasks();
            //SsetSpinner(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    // addTask, deleteTask and doneTask work on a local level.
    // They do the logic required to add, delete or mark as done a task.
    // Then it calls the modifyTask function with the updated task list to reflect those changes in the API database.
    // After that, getTasks() gets called to update the component with the recently modified task list.

    //setError(false) gets called at the beginning of each function to clean the error message if there was one.

    const addTask = (event) => {
        setError(false)
        if (event.key === "Enter"){
            if (inputValue != ""){
                modifyTasks([...tasks, {label: inputValue, done: false}])
                //getTasks();
                setInputValue("")
                
            } else {
                setError(true)
                setErrortext("The task cannot be empty.")
            }
        } 
    }

    const deleteTask = (id) => {
        setError(false)
        let newTasks = tasks.filter((item, index) => id != index)
        modifyTasks(newTasks)
        getTasks();
        
    }

    const doneTask = (id) => {
        setError(false)
        
        if (tasks[id].done === true){
            tasks[id].done = false
        } else {
            tasks[id].done = true
        }

        let newTasks = tasks
        modifyTasks(newTasks);
        getTasks();
    }

    useEffect(() => {
        getTasks();
    }, [])

	return (
		<div className="max-min container d-flex flex-column justify-content-center align-items-center border rounded pb-2">
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
            <div className="w-100 d-flex flex-column">

                {error === true ? <div className="text-center fs-4 mb-3 fw-light">{errortext}</div> : null}

                {spinner === true 
                    ?<div class="spinner-border text-secondary m-auto mb-3" role="status"><span class="sr-only">Loading...</span></div>
                    :tasks.map((item, index) => <Task key={index} id={index} done={item.done} task={item.label} deleteTask={deleteTask} doneTask={doneTask}/>)
                }
                
            </div>
        </div>
	);
    
};

export default TodoList;