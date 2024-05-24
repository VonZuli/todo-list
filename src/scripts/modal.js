import _, { add, forEach, map } from "lodash"
import { folderArray } from "./init";
import { addFolder } from "./folders";
import { addTask } from "./tasks"

export function createModal(e) {
  
  function renderModal() {
    // create the modal element and append to DOM
    const newModal = document.createElement('div');
    newModal.id = 'new-modal';
    newModal.classList.add('modal');
    document.body.appendChild(newModal);

    // create the content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    // add a close "button"
    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalClose.textContent = '❌';

    // display the modal
    newModal.style.display = 'block';
    
    // add close event to close "button"
    modalClose.addEventListener('click', ()=>{
      document.querySelector('#new-modal').remove();
    });
    newModal.appendChild(modalContent);
    
    // dynamically create forms
      function createForm(){
        const folderBtn = document.getElementById('newFolder');
        const taskBtn = document.getElementById('newTask');
        const modalFormTitle = document.createElement('h1');
        const createNewForm = document.createElement('form');
        const formFieldContainer = document.createElement('div');
        const errorMsgDisplay = document.createElement("div")
        formFieldContainer.id = "formFieldContainer"
        errorMsgDisplay.id = "errorMsgDisplay"
   
        // logic to call function depending on button pressed
        if(folderBtn === e){
          createFolderForm(createNewForm);
        }
        if (taskBtn === e) {
          createTaskForm(createNewForm);
        }
        
        // append form to modal
        modalContent.appendChild(modalFormTitle);
        modalContent.appendChild(modalClose);
        modalContent.appendChild(createNewForm);
        createNewForm.appendChild(formFieldContainer)
        formFieldContainer.appendChild(errorMsgDisplay)

        // append addBtn to modal
        let addBtn = createFormObject.input.generateInput(1,6);
        formFieldContainer.insertAdjacentHTML("afterend", addBtn);
        
        // if rendering form add data-type attr to addBtn
        if (createNewForm.id === createFormObject.label.labelAttr.form[0]) {
          document.querySelector('#addBtn').setAttribute('data-add-type', 'folder')
        }
        if (createNewForm.id === createFormObject.label.labelAttr.form[1]) {
          document.querySelector('#addBtn').setAttribute('data-add-type', 'task')
        }

        // creates folder form       
        function createFolderForm(newForm){
          modalFormTitle.textContent = "Create new folder";
          newForm.setAttribute('id', createFormObject.label.labelAttr.form[0]);

          formFieldContainer.innerHTML = 
            `${createFormObject.label.generateLabel(0,6)}
             ${createFormObject.input.generateInput(0,0,0)}
            `;
        };

        // creates task form
        function createTaskForm(newForm){
          modalFormTitle.textContent = "Create new task";
          newForm.setAttribute('id', createFormObject.label.labelAttr.form[1]);

          // create form from object
          formFieldContainer.innerHTML = 
          `${createFormObject.label.generateLabel(0,0)}
           ${createFormObject.input.generateInput(0,1,0)} 

           ${createFormObject.label.generateLabel(1,1)}
           ${createFormObject.input.generateInput(0,1,1)}

           ${createFormObject.label.generateLabel(2,2)}
           ${createFormObject.input.generateInput(2,1,2)}

           ${createFormObject.label.generateLabel(3,3)}
           ${createFormObject.input.generateInput(4,1,3)}
          `;
        };
      }
      createForm();

      addBtn.addEventListener('click', (e)=>{
          e.preventDefault()
          if (e.target.dataset.addType === 'folder') {
            const formValidation = (() =>{
              const folderNameInput = document.querySelector("#title")
              const savedFolders = JSON.parse(localStorage.getItem("folders"));
              const errorMsg = document.querySelector("#errorMsgDisplay")
              let userInput = folderNameInput.value;
              
              const folderExists = savedFolders.map(a =>{
                return a.folderTitle
              });
             
              if (userInput === "") {
                errorMsg.style.visibility = "visible";
                errorMsg.textContent = "Folder name cannot be empty."
                return console.log("form error thrown!");
              } else if(userInput.length < 3) {
                errorMsg.style.visibility = "visible";
                errorMsg.textContent = "Folder name must be longer than 2 characters."
                return console.log("form error thrown!");
              } else if(folderExists.includes(userInput)){
                errorMsg.style.visibility = "visible";
                errorMsg.textContent = `Folder with title "${userInput}" already exists.`
                return console.log("form error thrown!");
              } else {
                folderArray.push({folderTitle:userInput})
                localStorage.setItem("folders", JSON.stringify(folderArray))
                document.querySelector('#new-modal').remove();
                return addFolder(userInput);
              }  
            })();
          }
          if (e.target.dataset.addType === 'task') {
            addTask()
            document.querySelector('#new-modal').remove();
          }
      })
  }
  renderModal();
};

let createFormObject = {
  label:{
    labelAttr:{
      for:{
        title: ['title','desc','dueDate','priority','notes','checkbox','addBtn'],
        text: ["Task", "Description", "Due Date", "Priority", "Notes", "Completed", "Folder Name"],
      },
      form: ["modalNewFolderForm","modalNewTaskForm"],

    },
    generateLabel: function(val1, val2){
      let forAttr = Object.keys(this.labelAttr)[0]
      let forAttrContent = this.labelAttr.for.title[val1]

      let labelText = this.labelAttr.for.text[val2]
      return `<div>
                <label ${forAttr}=${forAttrContent}>${labelText}:</label>
              ` 
    },
  },
  input:{
    type:['text','button','date','checkbox','radio','submit'],
    id:['title','desc','dueDate','priority','notes','checkbox','addBtn'],
    generateInput: function(val1,val2,val3){
      let typeAttr = Object.keys(this)[0]
      let type = this.type[val1]

      let idAttr = Object.keys(this)[1]
      let id = this.id[val3]
      
      let nameAttr = 'name';
      let name = this.id[val3];

      if (type === this.type[1]) {
        return `<button ${typeAttr}=${type} ${idAttr}=${this.id[val2]}>Add ➕</button>
              </div>`
      }else if(type === this.type[4]){
        return `<div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=low-${id} ${nameAttr}=${name}>
                    <label for=low-${this.id[val3]}>Low</label>
                  </div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=med-${id} ${nameAttr}=${name}>
                    <label for=med-${this.id[val3]}>Medium</label>
                  </div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=high-${id} ${nameAttr}=${name}>
                    <label for=high-${this.id[val3]}>High</label>
                  </div>
                </div> 
              </div>`
      }else{
        return `<input ${typeAttr}=${type} ${idAttr}=${id} ${nameAttr}=${name}>
              </div>`
      }
    },
  }
};