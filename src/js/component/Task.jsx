import React, {useState} from "react";

const Task = (props) => {

    const [icon, setIcon] = useState(false)
    const showIcon = () => {
        setIcon(true)
    }
    const hideIcon = () => {
        setIcon(false)
    }

    // Busco borrar el componente cambiando el State de su componente padre
    // Como comunicar estados entre componentes?

        // Pasarle la funcion de borrar la tarea a este componente hijo mediante props

	return (
        <>
            <div
                onMouseOut={hideIcon} 
                onMouseOver={showIcon} 
                className={"m-2 mb-3 fs-4 fw-light border-bottom d-flex justify-content-between"}
            >
                <div>{props.task}</div>
                <i
                    onClick={() => props.deleteTask(props.id)}
                    className={"fa-regular fa-trash-can my-auto o-0" + (icon === true ? "o-100": "")}
                ></i>
            </div>
        </>
	);
    
};

export default Task;