//#region imports
import { addTask } from "./tasks";
// import { folderArray } from "./init";
//#endregion imports



// let taskFolderObject = {}

// let taskTitle = document.querySelector("#title");
// let taskDesc = document.querySelector("#desc")
// let taskDueDate = document.querySelector("#dueDate")
// let taskPriority
// let lowPriority = document.querySelector("#low-priority")
// let medPriority = document.querySelector("#med-priority")
// let highPriority = document.querySelector("#high-priority")
// let taskNotes = document.querySelector("#notes")
// let taskCheckbox = document.querySelector(".completedChk")

export function addFolder(userInput) {
  const folderList = document.querySelector("#folder-content > ul")
  const folderContainer = document.createElement('div')
  const counterContainer = document.createElement('div')
  const folderCounter = document.createElement('div')
  const deleteContainer = document.createElement('div')
  const animationContainer = document.createElement('div')
  const folderDelete = document.createElement('div')
  const listItem = document.createElement('li')
  

  let folderTitle = userInput

  folderContainer.classList.add('folder-container')
  folderContainer.setAttribute('data-folder', folderTitle)

  counterContainer.classList.add('counter-container')
  folderCounter.classList.add('folder-counter')
  folderCounter.setAttribute('data-folder', folderTitle)
  folderCounter.textContent = 0

  
  listItem.textContent = folderTitle
  listItem.setAttribute('data-folder', folderTitle)
  // folderDelete.textContent = "🗑"
  animationContainer.classList.add("animation-container")
  deleteContainer.classList.add('delete-container')
  deleteContainer.classList.add('hovered')
  folderList.appendChild(folderContainer)
  folderContainer.appendChild(listItem)
  folderContainer.appendChild(animationContainer)
  animationContainer.appendChild(counterContainer)
  counterContainer.appendChild(folderCounter)
  animationContainer.appendChild(deleteContainer)
  deleteContainer.appendChild(folderDelete)

  //adds event listener to folder-container class elements
  selectFolder(); 
}

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', ()=>{
        document.querySelector(".active")?.classList.remove("active")
        folderDiv.classList.add("active")
  }))
}

//user clicks child of Folder header
function displayFolderContents(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.firstChild.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  const tasksSubtitle = document.querySelector("#tasks-subtitle > h2")
  tasksSubtitle.textContent = `${taskHeader} Tasks`
}

/*
Task Name:
Description:
Due Date:
Prio:
Notes:
Completed:  add date when checked
*/

  // taskFolderObject = [
  //   [userInput,
  //     {"folder":userInput,
  //      "tasks":[
  //         {taskTitle,
  //         taskDesc,
  //         taskDueDate,
  //         taskPriority,
  //         taskNotes,
  //         taskCheckbox
  //         },
  //         {}
  //       ]
  //     }
  //   ],
  //   [],
  //   []
  // ]

  // Object(taskFolderObject, userInput, {
  //   taskTitle: 'test',
  //   description: 'testdesc',
  //   dueDate: 'somedate',
  //   priority: 'high',
  //   notes: 'oooo so many notes',
  //   completed: true
  // })
  //insert task objects here.