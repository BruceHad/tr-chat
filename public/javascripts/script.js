/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var socket = io();
var people = [];


/** Dom stuff
 */

function addPeople(room) {
    // console.log(room);
    var peopleNode = document.querySelector('#people');
    peopleNode.innerHTML = '';
    for (var i in room) {
        console.log('Room: ', i, room[i].name);
        var li = document.createElement('li');
        li.innerHTML = room[i].name + ' is connected.';
        peopleNode.appendChild(li);
    }
}

function updateUserName(name) {
    var req = new XMLHttpRequest();
    req.open('GET', '/updatename/' + name, true);
    req.addEventListener('load', function() {
        if (req.status < 400) {
            console.log(req.responseText);
        }
    });
    req.send();
}

/** Sockets stuff
 */
socket.on('chat message', function(msg, name) {
    var li = document.createElement('li');
    li.innerHTML = name + ': ' + msg;
    messages.appendChild(li);
});

socket.on('join', function(data) {
    addPeople(data.room); // creates list of people in the room
});

/** Event listeners
 */
if (document.querySelector('form')) {
    var form = document.querySelector('form');
    var input = document.querySelector('#m');
    var messages = document.querySelector('#messages');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
        return false;
    });
}

if (document.querySelector('#user-field')) {
    var field = document.querySelector('#user-field');
    var changeButton = document.querySelector('#update-user-button');
    var saveButton = document.querySelector('#save-name');
    changeButton.addEventListener('click', function(e) {
        e.preventDefault();
        field.readOnly = false;
        field.value = '...';
        field.select();
        field.focus();
        saveButton.classList.remove('hidden');
        this.classList.add('hidden');
    });
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        updateUserName(field.value);
        field.readOnly = true;
        field.blur();
        changeButton.classList.remove('hidden');
        this.classList.add('hidden');
    });
}


/***/ })
/******/ ]);