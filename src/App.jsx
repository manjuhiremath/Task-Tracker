//import React from "react";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";




//using function components 
const App = () => {
    const[showaddTask,setShowAddTask]=useState(false);
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
      const getTasks=async()=>{
        const tasksfromServer =await fetchTasks()
        setTasks(tasksfromServer)
      }
      getTasks();
    },[])

    const fetchTasks = async()=>{
      const res = (await fetch('https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks')).json()
      return res;
    }
    
    const fetchTask = async(id)=>{
      const res = (await fetch(`https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks/${id}`)).json()
      return res;
    }

      //Delete Task
      const deleteTask = async(id) =>{
        await fetch(`https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks/${id}`,{
        method:'DELETE'
      })
        setTasks(tasks.filter((task)=>task.id!==id))
    }

    //Toggle Remainder
    const toggleRemainder =async(id)=>{
          const taskToToggle = await fetchTask(id)
          const updTask={...taskToToggle,remainder:!taskToToggle.remainder}
          const res = await fetch(`https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks/${id}`,{
            method:'PUT',
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(updTask)
          })
          const data = await res.json()
          setTasks(tasks.map((task)=>task.id===id?{...task,remainder:data.remainder}:task))
    }
    // https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks/
    //AddTask
    const addTask=async(task)=>{
      const res = await(fetch('https://my-json-server.typicode.com/manjuhiremath/Task-Tracker/tasks',{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(task)
      }))
        const data = await res.json()
        setTasks([...tasks,data])
        // const id = Math.floor(Math.random()*1000)+1;
        // console.log(id);
        // const newTask = {id ,...task};
        // setTasks([...tasks,newTask])
    }
  return (
    <>
    <div className="container">
    <Header title={"Task Tracker"} showAdd={showaddTask} onAdd={()=>setShowAddTask(!showaddTask)}/>
    {showaddTask&&<AddTask onAdd={addTask}/>}
    {tasks.length>0 ?( <Tasks onToggle={toggleRemainder} tasks={tasks} onDelete={deleteTask}></Tasks>) : ('No Task to Show')}
    </div>
    </>
  )
}


//Using class components 
// class App extends React.Component{
//     render(){
//         return <>
//         <h1 className="text-xl text-orange-600 text-center">HI this is class component</h1>
//         </>
//     }
// }

export default App;