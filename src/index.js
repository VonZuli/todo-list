//#region imports
// const bcrypt = require('bcrypt');
import _ from 'lodash';
import './style.css'
import {createHeader as header} from './scripts/header'
import {createFooter as footer} from './scripts/footer';
import {initHomepage, initDOM, noLogin } from './scripts/init';
import { saveFolders } from './scripts/saveFolders';

// import images
const images = require.context('../src/assets/images', true)
export const imagepath = (name) => images(name, true)
//#endregion imports

// export const savedFoldersObj = JSON.parse(localStorage.getItem("folders"));

//create DOM structure and initialize app
header();
// initDOM();
initHomepage();
footer();
saveFolders();