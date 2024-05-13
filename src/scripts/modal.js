import { add, forEach } from "lodash"

export function createModal(e) {
  
  function renderModal() {
    const newModal = document.createElement('div');
    newModal.id = 'new-modal';
    newModal.classList.add('modal');
    document.body.appendChild(newModal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalClose.textContent = '❌';

    newModal.style.display = 'block';
    
    modalClose.addEventListener('click', ()=>{
      document.querySelector('#new-modal').remove();
    });
    newModal.appendChild(modalContent);
    
      function createForm(){
        const folderBtn = document.getElementById('newFolder');
        const taskBtn = document.getElementById('newTask');

        const modalFormTitle = document.createElement('h1');
        const createNewForm = document.createElement('form');
        const formFieldContainer = document.createElement('div')
        formFieldContainer.id = "formFieldContainer"
       
        // const newForm = document.getElementsByTagName('form');
        // const folderForm = document.querySelector("#modalNewFolderForm")
        // const taskForm = document.querySelector("#modalNewTaskForm")
        
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
        let addBtn = createFormObject.input.generateInput(1,6);
        formFieldContainer.insertAdjacentHTML("afterend", addBtn);

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
          /*
          Task Name:
          Description:
          Due Date:
          Prio:
          Notes:
          Completed:  add date when checked
          */
          formFieldContainer.innerHTML = 
          `${createFormObject.label.generateLabel(0,0)}
           ${createFormObject.input.generateInput(0,1,0)} 

           ${createFormObject.label.generateLabel(1,1)}
           ${createFormObject.input.generateInput(0,1,1)}

           ${createFormObject.label.generateLabel(2,2)}
           ${createFormObject.input.generateInput(2,1,2)}

           ${createFormObject.label.generateLabel(3,3)}
           ${createFormObject.input.generateInput(4,1,3)}

           ${createFormObject.label.generateLabel(4,4)}
           ${createFormObject.input.generateInput(0,1,4)}
          `;
        };

      }
      createForm();
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
    generateInput: function(key1,key2,key3){
      let typeAttr = Object.keys(this)[0]
      let type = this.type[key1]

      let idAttr = Object.keys(this)[1]
      let id = this.id[key3] //folder needs key 2 (6) 
      
      let nameAttr = 'name';
      let name = this.id[key3];

      if (type === this.type[1]) {
        return `<button ${typeAttr}=${type} ${idAttr}=${this.id[key2]}>Add ➕</button>
              </div>`
      }else if(type === this.type[4]){
        return `<div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=low-${id} ${nameAttr}=${name}>
                    <label for=low-${this.id[key3]}>Low</label>
                  </div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=med-${id} ${nameAttr}=${name}>
                    <label for=med-${this.id[key3]}>Medium</label>
                  </div>
                  <div>
                    <input ${typeAttr}=${type} ${idAttr}=high-${id} ${nameAttr}=${name}>
                    <label for=high-${this.id[key3]}>High</label>
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

// let formObject = {
//   label: function(){
//     return `<label for=${this.formFields.title.titleLabel[0]}>${this.formFields.title.titleLabel[1]}</label>`
//     // return `<label for=${forAttr}>${labelText}</label>`
//   },
//   input: function(){
//     return `<input type=${this.formFields.title.titleInput} id=${this.formFields.title.titleLabel[0]}>`
//     // return `<input type=${type} id=${id}>`
//   },
//   formFields:{
//     title:{
//       titleLabel: ['taskTitle','Task:'],
//       titleInput: 'text'
//     },
//     description: {
//       descLabel: [],
//       descInput: ''
//     },
//     dueDate:{
//       dueLabel: [],
//       dueInput:''
//     },
//     priority:{
//       prioLabel: [],
//       prioInput: ''
//     },
//     notes:{
//       notesLabel: [],
//       notesInput: ''
//     },
//     checkbox:{
//       checkboxLabel: [],
//       checkboxInput: ''
//     }
//   }
// }