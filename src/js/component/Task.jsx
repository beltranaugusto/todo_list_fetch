import React, {useState} from "react";

const Task = (props) => {

    const {task, id, done, doneTask, deleteTask, spinner} = props

    const [icon, setIcon] = useState(false)
    const showIcon = () => {
        setIcon(true)
    }
    const hideIcon = () => {
        setIcon(false)
    }

	return (
        <>
            <div
                onMouseOut={hideIcon} 
                onMouseOver={showIcon} 
                className={"p-1 m-1 fs-4 fw-light d-flex justify-content-between rounded px-3 " + (done === true ? "done": "pending")}
            >
                <div>{task}</div>
                <div className={"my-auto o-0" + (icon === true ? "o-100": "")}>
                    <i 
                        className="fa-solid fa-check mx-3"
                        onClick={() => doneTask(id)}
                    ></i>
                    <i
                        onClick={() => deleteTask(id)}
                        className={"fa-regular fa-trash-can"}
                    ></i>
                </div>
            </div>
        </>
	);
    
};

export default Task;