//#region imports
import { isBoolean } from "lodash";
import { addFolder } from "./folders";
import { generateId } from "./generateID";
import { folderArray } from "./init";
import { isValid } from "date-fns";
// import { bcrypt } from "..";
//#endregion imports

export const folderValidation = () =>{
  const folderNameInput = document.querySelector("#title")
  const errorMsg = document.querySelector("#errorMsgDisplay")
  const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));
  let userInput = folderNameInput.value;
  let folderTaskCount = document.querySelector('.folder-counter')
  let count = folderTaskCount.textContent
  let folderId = generateId();

  //change the lower case function to regex later
  const folderExists = savedFoldersObj.map(folderItem =>{
    return folderItem.folderTitle.toLowerCase()
  });
 
  if (userInput === "") {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name cannot be empty."
    return console.log("form error thrown!");
  } else if(userInput.length < 3) {
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = "Folder name must be longer than 2 characters."
    return console.log("form error thrown!");
  } else if(folderExists.includes(userInput.toLowerCase())){
    errorMsg.style.visibility = "visible";
    errorMsg.textContent = `Folder with title "${userInput}" already exists.`
    return console.log("form error thrown!");
  } else {
    folderArray.push({
      folderId,
      folderTitle:userInput, 
      folderTaskCount:+count
    })
    localStorage.setItem("folders", JSON.stringify(folderArray))
    document.querySelector('#new-modal').remove();
    return addFolder(userInput);
  }  
};

// this section needs to be reworked to validate the login itself not the fields
export const loginValidation = (username, password)=>{

  const errorMsg = document.querySelector('.error-msg')
  const accounts = JSON.parse(localStorage.getItem("users"));

  console.log(accounts); 
  console.log(`Username: ${username}, Password: ${password}`);
  errorMsg.innerHTML = "";
  
  if (username === "" || password === ""){
    return errorMsg.innerHTML = "Username & Password fields cannot be empty.</br>"
  } else {
    // let matched = accounts.find(account => account.username === username)
    accounts.forEach(i=>{
      const validLogin = username === i.username && password === i.password
      if (!validLogin){
        errorMsg.innerHTML = `Username does not exist or</br> password is incorrect.`
      }else{
        console.log(`Signing in... ${username}`);
        document.querySelector("dialog").remove()
        //move user to their profile
      }
    })
  }
}

export function registrationValidation(userInfoObj){
  const errorArr = new Array()
  const errorObj = new Object()
  
  for (const key in userInfoObj) {
    const formField = key
    const isValid = "isValid"
    const userInput = "userInput"
    const errorMsgsArr = "errorMsgsArr"
    let errorMsg;
    errorObj[formField] = {}
    errorObj[formField][isValid] = true
    errorObj[formField][userInput] = userInfoObj[key]
    errorObj[formField][errorMsgsArr] = []

    // const validateFields = ((str =>{
    const checkblanks = ((str=>{
      const isValidStr =/^(?![\s-])[\w\s-@.]+$/.test(str);
      errorMsg = "Form fields cannot contain blank spaces or be empty.</br>"
      if (key === "password" || key === "password-confirm") {
        return;
      }
      if (isValidStr === false){
        errorObj[key].isValid = isValidStr
        errorObj[key].errorMsgsArr.push(errorMsg)
      }
    }))(userInfoObj[key])

    if (key === "email"){
      const checkEmail = (str=>{
        const isValidEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/.test(str)
        errorMsg = "The email provided is not a valid email format.</br>"

        if (isValidEmail === false){
          errorObj[formField][isValid] = isValidEmail
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
      })(userInfoObj[key])
    }

    if (key === "fname" || key === "lname" || key === "username" ||  key === "password" ||  key === "password-confirm") 
    {
      const checkLength = (str =>{            
        if(key === "fname" || key === "lname"){
          
          const fnameErrorMsg = "First name provided must be between 2 to 20 characters.</br>"
          const lnameErrorMsg = "Last name provided must be between 2 to 20 characters.</br>"

          if (str.length < 2 || str.length > 20) {
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(key === "fname" ? errorMsg = fnameErrorMsg : errorMsg = lnameErrorMsg)
          }
        }

        if (key === "username") {
          if (str.length < 3 || str.length > 24) {
            errorMsg = "Username must be between 3 to 24 characters.</br>"
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }

        if(key === "password" || key === "password-confirm"){
          if (str.length < 8 ){
            errorMsg = "Minimum password length is 8 characters.</br>"
            errorObj[formField][isValid] = false
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
      })(userInfoObj[key])
    }

    if (key === "fname"|| key === "lname" || key === "username") {
      const checkSpecialChar = (str=>{
        if (key === "fname" || key === "lname") {
          const isValidName = /^[a-zA-Z\-]*$/.test(str)
          if (isValidName === false) {
            errorMsg = "Name cannot contain blanks, numeric or special characters.</br>"
            errorObj[formField][isValid] = isValidName
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
        if (key === "username") {
          const isValidChar = /^[a-zA-Z0-9\.\-\_]*$/.test(str)
          const isValidSequence = /(?!.*[\.\-\_]{2})^[a-zA-Z0-9\.\-\_]/.test(str)
          if (isValidChar === false) {
            errorMsg = "Only special characters: ('.', '-', '_') are valid.</br>"
            errorObj[formField][isValid] = isValidChar
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
          if (isValidSequence === false) {
            errorMsg = "Username must not have sequential special characters.</br>"
            errorObj[formField][isValid] = isValidSequence
            errorObj[key].errorMsgsArr.push(errorMsg)
          }
        }
      })(userInfoObj[key])
    }

    if (key === "password"|| key ==="password-confirm") {
      const validPassword = (str=>{
        const isValidUpper = /(?=.*[A-Z])/.test(str)
        const isValidLower = /(?=.*[a-z])/.test(str)
        const isValidDigit = /(?=.*\d)/.test(str)
        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(str)

        if (isValidUpper === false) {
          errorMsg = "Password must contain at least 1 uppercase letter.</br>"
            errorObj[formField][isValid] = isValidUpper
            errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidLower === false) {
          errorMsg = "Password must contain at least 1 lowercase letter.</br>"
          errorObj[formField][isValid] = isValidLower
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidDigit === false) {
          errorMsg = "Password must contain at least 1 number.</br>"
          errorObj[formField][isValid] = isValidDigit
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        if (isValidPassword === false) {
          errorMsg= "Password may contain special characters.</br>"
          errorObj[formField][isValid] = isValidPassword
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
        
      })(userInfoObj[key])

      const checkMatch = (() =>{
        if (userInfoObj["password"] !== userInfoObj["password-confirm"]) {
          errorMsg = "Passwords do not match.</br>"
          errorObj[formField][isValid] = false;
          errorObj[key].errorMsgsArr.push(errorMsg)
        }
      })(userInfoObj[key])
    }
  }
  
  Object.entries(errorObj).filter((data)=>{
    if (data[1].isValid === false){
      errorArr.push(data)
    }
  })
  const displayErrors = (() =>{
    const errorMsgDisplay = document.querySelectorAll(".error-msg");
    const formField = [...document.querySelectorAll("input")].filter(elem =>
      elem.type === "text" || elem.type==="password" || elem.type==="email");
      
    [...errorMsgDisplay].forEach(el =>{
      errorArr.forEach(i=>{
        if (i[0]===el.dataset.error) {
          el.innerHTML = ""
          el.innerHTML += i[1].errorMsgsArr.join("")
        }

        [...formField].forEach(input=>{
          if (i[0] === input.dataset.error) {
            input.classList.add("error")
          }
        })
      })
    }); 
  })(errorArr)
  console.log(`Error message array has ${errorArr.length} errors`);

  console.log(errorArr);

  if (errorArr.length === 0){
    let savedUsersObj = JSON.parse(localStorage.getItem("users"));
    let userArr = savedUsersObj ? savedUsersObj : [];
    userArr.push(userInfoObj)
    localStorage.setItem("users", JSON.stringify(userArr))
  }
}


