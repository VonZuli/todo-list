//#region imports
import { addTask } from "./tasks";
// import { folderArray } from "./init";
//#endregion imports

//user enters folder data
//user clicks add
//user data is appended to Folders list

// let taskFolderObject = {}

let taskTitle = document.querySelector("#title");
let taskDesc = document.querySelector("#desc")
let taskDueDate = document.querySelector("#dueDate")
let taskPriority
let lowPriority = document.querySelector("#low-priority")
let medPriority = document.querySelector("#med-priority")
let highPriority = document.querySelector("#high-priority")
let taskNotes = document.querySelector("#notes")
let taskCheckbox = document.querySelector(".completedChk")

export function addFolder(userInput) {
  const folderList = document.querySelector("#folder-content > ul")
  const folderContainer = document.createElement('div')
  const folderCounter = document.createElement('div')
  const listItem = document.createElement('li')
  // const folderNameInput = document.querySelector("#title")

  let folderTitle = userInput

  folderContainer.classList.add('folder-container')
  folderContainer.setAttribute('data-folder', folderTitle)

  folderCounter.classList.add('folder-counter')
  folderCounter.setAttribute('data-folder', folderTitle)
  folderCounter.textContent = 0

  listItem.textContent = folderTitle
  listItem.setAttribute('data-folder', folderTitle)
  
  folderList.appendChild(folderContainer)
  folderContainer.appendChild(listItem)
  folderContainer.appendChild(folderCounter)
  
  // addToFolderArray();

  //add check for duplicate folder names


  //adds event listener for each folder added
  selectFolder();
}
// function addToFolderArray() {
//   const savedFolders = JSON.parse(localStorage.getItem("folders"));
  
//   savedFolders.forEach((folder)=>{
//     const folderItem = document.querySelector("#folder-content > ul")
//     console.log(folder);
//     // folderItem.appendChild(folder);
//   })
//   // if (Array.isArray(savedFolders)) {
//   //   folderArray = savedFolders
//   // }else{
//   //   folderArray = new Array()
//   // }
//   // folderArray.push({folderTitle})
//   // console.log(folderArray);
//   // console.table(folderArray);
//   // localStorage.setItem("folders", JSON.stringify(folderArray))
// }

export function selectFolder(){
  const selectedFolder = document.querySelectorAll(".folder-container")
  selectedFolder.forEach((folderDiv)=>
    folderDiv.addEventListener('click', (e)=>{
    e.preventDefault();
    displayFolder(e)
  }))
}
//user clicks child of Folder header

function displayFolder(e) {
  const tasksSection = document.querySelector(".tasks-section")
  tasksSection.style.visibility = "visible"
  let taskHeader = e.target.firstChild.textContent;
  //modify tasks subtitle h2 to display "folder name + tasks"
  const tasksSubtitle = document.querySelector("#tasks-subtitle > h2")
  tasksSubtitle.textContent = `${taskHeader} Tasks`
 
  
  // listItem.innerHTML = localStorage.getItem
  // ('taskFolderObject')
  // tasksList.appendChild(listItem)
  //add active/hover styling to folders
    //selected folder width expands out to show delete/edit opt
  
  //Tasks section is updated with tasks assigned to that folder
    //display tasks associated with selected folder

}

// function checkTitleDuplicates(userInput) {
//   const savedFolders = JSON.parse(localStorage.getItem("folders"));
//   for (const folder of savedFolders) {
//     if (folder.folderTitle === userInput){
//       console.log(folder.folderTitle === userInput);
//       console.log(folder.folderTitle);
//       console.log(userInput);
//       const error = document.querySelector("#errorDisplay")
//       error.style.visibility = "visible";
//       error.textContent = "Folder already exists, enter unique folder name."
//     } else{
//       console.log(folder);
//       // console.log(folderTitle);
//       console.log(userInput);
//       folderArray.push({folderTitle:userInput})
//       console.log(folderArray);
//       localStorage.setItem("folders", JSON.stringify(folderArray))
//     }
//   }

//   // savedFolders.forEach(folder =>{
//   //   if (folder.folderTitle === userInput) {
//   //     //append to modal error message
//   //     console.log(folder.folderTitle === userInput);
//   //     console.log(folder.folderTitle);
//   //     console.log(userInput);
//   //     const error = document.querySelector("#errorDisplay")
//   //     error.style.visibility = "visible";
//   //     error.textContent = "Folder already exists, enter unique folder name."
//   //   } else{
//   //     console.log(folder.folderTitle);
//   //     console.log(userInput);
//   //     folderArray.push({folderTitle:userInput})
//   //     localStorage.setItem("folders", JSON.stringify(folderArray))
//   //   }
//   // })
// }


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