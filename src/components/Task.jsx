import { FaTimes} from 'react-icons/fa'


const Task = ({task , onDelete ,onToggle})=>{
    return(
        <div className={`task ${task.remainder ? "reminder":''}`} 
        onDoubleClick={()=>onToggle(task.id)}>
            <h4>
                {task.text} <FaTimes onClick={()=>onDelete(task.id)} style={{color:"red" ,cursor:'pointer'}}/>
            </h4>
            <p>{task.day}</p>


        </div>
    )

}

export default Task;