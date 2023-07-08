import React from 'react'
import axios from 'axios';

function CheckTask({ task, tasks, setTasks }) {
    function checkTask(ftask){

        axios
        .put('http://127.0.0.1:8000/comp-task/'+ftask.id)
        .then((response) => {

            console.log("check",response.data)

            if (response.data.completed == "True"){
                const tempTasks = [...tasks]
                const task = tempTasks.find(task => task.id === ftask.id)
                task.is_completed = !task.is_completed
                setTasks(tempTasks)
            }
            else{
                const tempTasks = [...tasks]
                const task = tempTasks.find(task => task.id === ftask.id)
                task.is_completed = !task.is_completed
                setTasks(tempTasks)
            }

        })

        
    }
    return (
        <span>
            <input className="task_check m-2" type="checkbox" 
            checked={task.is_completed}
            onChange={()=>checkTask(task)}/>
        </span>

    )
}

export default CheckTask