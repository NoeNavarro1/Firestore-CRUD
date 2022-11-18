import { saveTask, getTasks,onGetTasks,deleteTasks,getTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks((querySnapshot)=>{
        let html = ""
           
        querySnapshot.forEach(doc => {
            const task = doc.data()
           html += `
           <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button class='btn-delete' data-id="${doc.id}">Delete</button>
                <button class='btn-edit' data-id="${doc.id}">Edit</button>
           </div>
           `  
        })
        tasksContainer.innerHTML = html

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

        btnsDelete.forEach(btn =>{
            btn.addEventListener('click', ({target:{dataset}}) =>{
                deleteTasks(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn =>{
            btn.addEventListener('click', async (e) =>{
            const doc = await getTask(e.target.dataset.id)
            const task = doc.data()

            taskForm['task-title'].value = task.title
            taskForm['task-description'].value = task.description

            editStatus = true 

            })
        })

    })   
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']
    
    if(editStatus){
        console.log('updating')
    }else{
        saveTask(title.value, description.value)
    }
    

    taskForm.reset()

})