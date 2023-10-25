"use strict";
(self["webpackChunktodolist_project"] = self["webpackChunktodolist_project"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/storage.js */ "./src/modules/storage.js");
/* harmony import */ var _modules_data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/data.js */ "./src/modules/data.js");


var storage = new _modules_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"]('tasks');

// Update localstorage and Data class on load
var data = new _modules_data_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
data.setTasks(storage.loadData());
window.addEventListener('beforeunload', function () {
  storage.saveData(data.getTasks());
});

/***/ }),

/***/ "./src/modules/app.js":
/*!****************************!*\
  !*** ./src/modules/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTasks": () => (/* binding */ renderTasks),
/* harmony export */   "updateStorage": () => (/* binding */ updateStorage)
/* harmony export */ });
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.js */ "./src/modules/function.js");

var updateStorage = function updateStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
var renderTasks = function renderTasks(tasks, deleteData, updateData, setTasks, pendingTasks) {
  var todolist = document.querySelector('.todoLists');
  todolist.innerHTML = '';
  tasks.forEach(function (task, index) {
    var element = document.createElement('li');
    if (task.completed === true) {
      element.classList.add('completed', 'list');
    } else {
      element.classList.add('in-progress', 'list');
    }
    element.innerHTML = "\n      <input type=\"checkbox\" id=\"check\" class=\"checkbox\" ".concat(task.completed ? 'checked' : '', ">\n      <input type=\"text\" class=\"task\" id=\"task-input\" value=\"").concat(task.description, "\" ").concat(task.completed ? 'disabled' : '', ">\n      <i class=\"uil uil-trash\"></i>\n    ");
    var trashIcon = element.querySelector('.uil-trash');
    trashIcon.addEventListener('click', function () {
      deleteData(index);
    });
    var checkbox = element.querySelector('.checkbox');
    checkbox.addEventListener('change', function () {
      task.completed = !task.completed;
      updateData(index, task);
    });
    var taskInput = element.querySelector('.task');
    taskInput.addEventListener('blur', function () {
      _function_js__WEBPACK_IMPORTED_MODULE_0__["default"].editDescription(index, taskInput.value, tasks, setTasks, updateStorage);
    });
    taskInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        taskInput.blur(); // Trigger the blur event to save the changes
      }
    });

    todolist.appendChild(element);
    pendingTasks();
  });
};

/***/ }),

/***/ "./src/modules/clear.js":
/*!******************************!*\
  !*** ./src/modules/clear.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClearTask": () => (/* binding */ ClearTask),
/* harmony export */   "clearCompleted": () => (/* binding */ clearCompleted),
/* harmony export */   "complete": () => (/* binding */ complete),
/* harmony export */   "updateStorage": () => (/* binding */ updateStorage)
/* harmony export */ });
var updateStorage = function updateStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
var clearCompleted = function clearCompleted(tasks) {
  var updatedTasks = tasks.filter(function (task) {
    return !task.completed;
  });
  updatedTasks.forEach(function (task, index) {
    task.index = index + 1;
  });
  return updatedTasks;
};
var complete = function complete(tasks, index) {
  var task = tasks[index];
  task.completed = !task.completed;
};
var ClearTask = function ClearTask(dataInstance) {
  var clearButton = document.querySelector('.clear-button');
  clearButton.addEventListener('click', function () {
    var todolist = document.querySelector('.todoLists');
    var completedTasks = todolist.querySelectorAll('.completed');

    // remove only completed tasks if there are any
    if (completedTasks.length > 0) {
      var tasks = dataInstance.getTasks().filter(function (task) {
        return !task.completed;
      });
      dataInstance.setTasks(tasks);
    }
    clearCompleted(dataInstance.getTasks());

    // update storage with the latest tasks
    updateStorage(dataInstance.getTasks());
    dataInstance.pendingTasks();
  });
  clearCompleted(dataInstance.getTasks());
};

/***/ }),

/***/ "./src/modules/data.js":
/*!*****************************!*\
  !*** ./src/modules/data.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./src/style.css");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ "./src/modules/app.js");
/* harmony import */ var _clear_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clear.js */ "./src/modules/clear.js");
/* harmony import */ var _taskUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskUtils.js */ "./src/modules/taskUtils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




var _tasks = /*#__PURE__*/new WeakMap();
var Data = /*#__PURE__*/function () {
  function Data() {
    var _this = this;
    _classCallCheck(this, Data);
    _classPrivateFieldInitSpec(this, _tasks, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "renderTasks", function () {
      (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.renderTasks)(_classPrivateFieldGet(_this, _tasks), _this.deleteData.bind(_this), _this.updateData.bind(_this), _this.setTasks.bind(_this), _this.pendingTasks);
    });
    _defineProperty(this, "pendingTasks", function () {
      var pendingNum = document.querySelector('.pending-num');
      var pendingTasks = _classPrivateFieldGet(_this, _tasks).filter(function (task) {
        return !task.completed;
      });
      pendingNum.textContent = pendingTasks.length === 0 ? 'no' : pendingTasks.length;
    });
    _defineProperty(this, "addData", function () {
      var inputField = document.querySelector('.input-field textarea');
      var noteIcon = document.querySelector('.input-field .note-icon');
      var handleAddTask = function handleAddTask() {
        var inputVal = inputField.value.trim();
        if (inputVal.length > 0) {
          (0,_taskUtils_js__WEBPACK_IMPORTED_MODULE_3__.addTask)(_classPrivateFieldGet(_this, _tasks), inputVal, _this.renderTasks, _this.pendingTasks, _clear_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage);
          inputField.value = '';
        }
      };
      inputField.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          handleAddTask();
        }
      });
      noteIcon.addEventListener('click', function () {
        handleAddTask();
      });
    });
    _defineProperty(this, "readData", function () {
      return _classPrivateFieldGet(_this, _tasks);
    });
    _defineProperty(this, "updateData", function (index, newData) {
      _classPrivateFieldGet(_this, _tasks)[index] = newData;
      _this.renderTasks();
      _this.pendingTasks();
      (0,_clear_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage)(_classPrivateFieldGet(_this, _tasks));
    });
    _defineProperty(this, "deleteData", function (index) {
      (0,_taskUtils_js__WEBPACK_IMPORTED_MODULE_3__.deleteData)(_classPrivateFieldGet(_this, _tasks), index, _this.renderTasks, _this.pendingTasks, _clear_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage);
    });
    _classPrivateFieldSet(this, _tasks, []);
    this.renderTasks();
    this.addData();
    (0,_clear_js__WEBPACK_IMPORTED_MODULE_2__.ClearTask)(this);
  }
  _createClass(Data, [{
    key: "getTasks",
    value: function getTasks() {
      return _classPrivateFieldGet(this, _tasks);
    }
  }, {
    key: "setTasks",
    value: function setTasks(tasks) {
      // Assign new index values based on order in array
      tasks.forEach(function (task, index) {
        task.index = index + 1;
      });
      _classPrivateFieldSet(this, _tasks, tasks);
      this.renderTasks();
    }
  }]);
  return Data;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Data);

/***/ }),

/***/ "./src/modules/function.js":
/*!*********************************!*\
  !*** ./src/modules/function.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EditTask = /*#__PURE__*/function () {
  function EditTask() {
    _classCallCheck(this, EditTask);
  }
  _createClass(EditTask, null, [{
    key: "editDescription",
    value: function editDescription(taskIndex, newDescription, tasks, setTasks, updateStorage) {
      var updatedTasks = tasks.map(function (task, index) {
        if (index === taskIndex) {
          return _objectSpread(_objectSpread({}, task), {}, {
            description: newDescription
          });
        }
        return task;
      });
      setTasks(updatedTasks); // Update the tasks with the edited description
      updateStorage(updatedTasks); // Save the changes to the storage
    }
  }]);
  return EditTask;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditTask);

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Update the values to the localstorage
var LocalStorage = /*#__PURE__*/_createClass(function LocalStorage(storageKey) {
  var _this = this;
  _classCallCheck(this, LocalStorage);
  _defineProperty(this, "saveData", function (data) {
    localStorage.setItem(_this.storageKey, JSON.stringify(data));
  });
  _defineProperty(this, "loadData", function () {
    var data = localStorage.getItem(_this.storageKey);
    return data ? JSON.parse(data) : [];
  });
  this.storageKey = storageKey;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LocalStorage);

/***/ }),

/***/ "./src/modules/taskUtils.js":
/*!**********************************!*\
  !*** ./src/modules/taskUtils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "deleteData": () => (/* binding */ deleteData)
/* harmony export */ });
var deleteData = function deleteData(tasks, index, renderTasks, pendingTasks, updateStorage) {
  tasks.splice(index, 1);
  tasks.forEach(function (task, index) {
    task.index = index + 1;
  });
  renderTasks();
  pendingTasks();
  updateStorage(tasks);
};
var addTask = function addTask(tasks, inputVal, renderTasks, pendingTasks, updateStorage) {
  var newTask = {
    description: inputVal,
    completed: false
  };
  tasks.push(newTask);
  tasks.forEach(function (task, index) {
    task.index = index + 1;
  });
  renderTasks();
  pendingTasks();
  updateStorage(tasks);
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Poppins', sans-serif;\n}\n\nbody {\n  background-color: #e3f2fd;\n}\n\n.container {\n  position: relative;\n  max-width: 480px;\n  width: 100%;\n  border-radius: 8px;\n  padding: 25px;\n  margin: 85px auto 0;\n  background-color: white;\n  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.1);\n}\n\n.container .input-field {\n  position: relative;\n  height: 64px;\n  width: 100%;\n}\n\n.container .my-todo {\n  margin-bottom: 16px;\n}\n\ntextarea {\n  overflow: hidden;\n}\n\n.input-field textarea {\n  height: 100%;\n  width: 100%;\n  outline: none;\n  font-size: 18px;\n  font-weight: 400;\n  border-radius: 8px;\n  padding: 18px 45px 18px 15px;\n  border: 1px solid #ccc;\n  resize: none;\n}\n\n.input-field textarea:focus {\n  border-color: #4070f4;\n}\n\n.input-field .note-icon {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  transform: translateY(-50%);\n  font-size: 24px;\n  color: #707070;\n  cursor: pointer;\n}\n\n.input-field textarea:focus ~ .note-icon {\n  color: #4070f4;\n}\n\n.container .todoLists {\n  max-height: 380px;\n  overflow-y: auto;\n}\n\n.todoLists .list {\n  display: flex;\n  align-items: center;\n  list-style: none;\n  background-color: #d8fcff;\n  box-shadow: 0 5px 10px rgba(0, 41, 63, 0.1);\n  width: 100%;\n  padding: 1px 15px;\n  border-radius: 8px;\n  margin-top: 10px;\n  position: relative;\n  cursor: pointer;\n}\n\n.todoLists .list .checkbox {\n  height: 18px;\n  min-width: 18px;\n  color: #4070f4;\n}\n\n.todoLists .list .task {\n  /* margin: 0 30px 0 15px; */\n  word-break: break-all;\n}\n\n.list input:checked ~ .task {\n  text-decoration: line-through;\n}\n\n.todoLists .list i {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  transform: translateY(-50%);\n  font-size: 20px;\n  color: #707070;\n  padding: 5px;\n  opacity: 0.6;\n  display: none;\n}\n\n.todoLists .list:hover i {\n  display: inline-flex;\n}\n\n.todoLists .list i:hover {\n  opacity: 1;\n  color: #f97070;\n}\n\n.container .pending-tasks {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 25px;\n}\n\n.pending-tasks span {\n  color: #333;\n}\n\n.pending-tasks .clear-button {\n  padding: 6px 12px;\n  outline: none;\n  border: none;\n  background: #4070f4;\n  color: #fff;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.clear-button:hover {\n  background-color: #0e4bf1;\n}\n\n#task-input {\n  outline-style: none;\n  padding: 20px;\n  border: none;\n  border-radius: 6px;\n  width: 100%;\n  height: max-content;\n  font-size: 18px;\n  font-family: 'Poppins', sans-serif;\n  font-weight: 400;\n  margin-left: 12px;\n  margin-right: -13px;\n  color: #333;\n}\n\n#task-input:focus {\n  background-color: #dde6ff;\n}\n\ninput[type='checkbox'] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  margin-right: 5px;\n  cursor: pointer;\n  transition: all 0.3s ease-in-out;\n}\n\ninput[type='checkbox']:focus {\n  outline: 2px solid #2196f3;\n  box-shadow: 0 0 5px #ccc;\n  outline-offset: 2px;\n}\n\ninput[type='checkbox']:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n\n@media screen and (max-width: 350px) {\n  .container {\n    padding: 25px 10px;\n  }\n}\n\n@media screen and (max-width: 767px) {\n  .todoLists .list i {\n    display: inline-flex;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,wCAAwC;AAC1C;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,4BAA4B;EAC5B,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,2BAA2B;EAC3B,eAAe;EACf,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,yBAAyB;EACzB,2CAA2C;EAC3C,WAAW;EACX,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,2BAA2B;EAC3B,qBAAqB;AACvB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,2BAA2B;EAC3B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,kCAAkC;EAClC,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,gCAAgC;AAClC;;AAEA;EACE,0BAA0B;EAC1B,wBAAwB;EACxB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;AACvB;;AAEA;EACE;IACE,kBAAkB;EACpB;AACF;;AAEA;EACE;IACE,oBAAoB;EACtB;AACF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Poppins', sans-serif;\n}\n\nbody {\n  background-color: #e3f2fd;\n}\n\n.container {\n  position: relative;\n  max-width: 480px;\n  width: 100%;\n  border-radius: 8px;\n  padding: 25px;\n  margin: 85px auto 0;\n  background-color: white;\n  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.1);\n}\n\n.container .input-field {\n  position: relative;\n  height: 64px;\n  width: 100%;\n}\n\n.container .my-todo {\n  margin-bottom: 16px;\n}\n\ntextarea {\n  overflow: hidden;\n}\n\n.input-field textarea {\n  height: 100%;\n  width: 100%;\n  outline: none;\n  font-size: 18px;\n  font-weight: 400;\n  border-radius: 8px;\n  padding: 18px 45px 18px 15px;\n  border: 1px solid #ccc;\n  resize: none;\n}\n\n.input-field textarea:focus {\n  border-color: #4070f4;\n}\n\n.input-field .note-icon {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  transform: translateY(-50%);\n  font-size: 24px;\n  color: #707070;\n  cursor: pointer;\n}\n\n.input-field textarea:focus ~ .note-icon {\n  color: #4070f4;\n}\n\n.container .todoLists {\n  max-height: 380px;\n  overflow-y: auto;\n}\n\n.todoLists .list {\n  display: flex;\n  align-items: center;\n  list-style: none;\n  background-color: #d8fcff;\n  box-shadow: 0 5px 10px rgba(0, 41, 63, 0.1);\n  width: 100%;\n  padding: 1px 15px;\n  border-radius: 8px;\n  margin-top: 10px;\n  position: relative;\n  cursor: pointer;\n}\n\n.todoLists .list .checkbox {\n  height: 18px;\n  min-width: 18px;\n  color: #4070f4;\n}\n\n.todoLists .list .task {\n  /* margin: 0 30px 0 15px; */\n  word-break: break-all;\n}\n\n.list input:checked ~ .task {\n  text-decoration: line-through;\n}\n\n.todoLists .list i {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  transform: translateY(-50%);\n  font-size: 20px;\n  color: #707070;\n  padding: 5px;\n  opacity: 0.6;\n  display: none;\n}\n\n.todoLists .list:hover i {\n  display: inline-flex;\n}\n\n.todoLists .list i:hover {\n  opacity: 1;\n  color: #f97070;\n}\n\n.container .pending-tasks {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 25px;\n}\n\n.pending-tasks span {\n  color: #333;\n}\n\n.pending-tasks .clear-button {\n  padding: 6px 12px;\n  outline: none;\n  border: none;\n  background: #4070f4;\n  color: #fff;\n  font-size: 14px;\n  border-radius: 4px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.clear-button:hover {\n  background-color: #0e4bf1;\n}\n\n#task-input {\n  outline-style: none;\n  padding: 20px;\n  border: none;\n  border-radius: 6px;\n  width: 100%;\n  height: max-content;\n  font-size: 18px;\n  font-family: 'Poppins', sans-serif;\n  font-weight: 400;\n  margin-left: 12px;\n  margin-right: -13px;\n  color: #333;\n}\n\n#task-input:focus {\n  background-color: #dde6ff;\n}\n\ninput[type='checkbox'] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  margin-right: 5px;\n  cursor: pointer;\n  transition: all 0.3s ease-in-out;\n}\n\ninput[type='checkbox']:focus {\n  outline: 2px solid #2196f3;\n  box-shadow: 0 0 5px #ccc;\n  outline-offset: 2px;\n}\n\ninput[type='checkbox']:checked {\n  background-color: #2196f3;\n  border-color: #2196f3;\n}\n\n@media screen and (max-width: 350px) {\n  .container {\n    padding: 25px 10px;\n  }\n}\n\n@media screen and (max-width: 767px) {\n  .todoLists .list i {\n    display: inline-flex;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9zcmMvbW9kdWxlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QtcHJvamVjdC8uL3NyYy9tb2R1bGVzL2NsZWFyLmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9zcmMvbW9kdWxlcy9kYXRhLmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9zcmMvbW9kdWxlcy9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vc3JjL21vZHVsZXMvdGFza1V0aWxzLmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QtcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG9saXN0LXByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5qcyc7XG5pbXBvcnQgRGF0YSBmcm9tICcuL21vZHVsZXMvZGF0YS5qcyc7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgTG9jYWxTdG9yYWdlKCd0YXNrcycpO1xuXG4vLyBVcGRhdGUgbG9jYWxzdG9yYWdlIGFuZCBEYXRhIGNsYXNzIG9uIGxvYWRcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YSgpO1xuZGF0YS5zZXRUYXNrcyhzdG9yYWdlLmxvYWREYXRhKCkpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICBzdG9yYWdlLnNhdmVEYXRhKGRhdGEuZ2V0VGFza3MoKSk7XG59KTtcbiIsImltcG9ydCBFZGl0VGFzayBmcm9tICcuL2Z1bmN0aW9uLmpzJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVN0b3JhZ2UgPSAodGFza3MpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJUYXNrcyA9IChcbiAgdGFza3MsXG4gIGRlbGV0ZURhdGEsXG4gIHVwZGF0ZURhdGEsXG4gIHNldFRhc2tzLFxuICBwZW5kaW5nVGFza3MsXG4pID0+IHtcbiAgY29uc3QgdG9kb2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0xpc3RzJyk7XG4gIHRvZG9saXN0LmlubmVySFRNTCA9ICcnO1xuXG4gIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBpZiAodGFzay5jb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJywgJ2xpc3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbi1wcm9ncmVzcycsICdsaXN0Jyk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja1wiIGNsYXNzPVwiY2hlY2tib3hcIiAke1xuICB0YXNrLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnXG59PlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0YXNrXCIgaWQ9XCJ0YXNrLWlucHV0XCIgdmFsdWU9XCIke1xuICB0YXNrLmRlc2NyaXB0aW9uXG59XCIgJHt0YXNrLmNvbXBsZXRlZCA/ICdkaXNhYmxlZCcgOiAnJ30+XG4gICAgICA8aSBjbGFzcz1cInVpbCB1aWwtdHJhc2hcIj48L2k+XG4gICAgYDtcblxuICAgIGNvbnN0IHRyYXNoSWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnVpbC10cmFzaCcpO1xuICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGRlbGV0ZURhdGEoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpO1xuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xuICAgICAgdXBkYXRlRGF0YShpbmRleCwgdGFzayk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrJyk7XG4gICAgdGFza0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICBFZGl0VGFzay5lZGl0RGVzY3JpcHRpb24oXG4gICAgICAgIGluZGV4LFxuICAgICAgICB0YXNrSW5wdXQudmFsdWUsXG4gICAgICAgIHRhc2tzLFxuICAgICAgICBzZXRUYXNrcyxcbiAgICAgICAgdXBkYXRlU3RvcmFnZSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0YXNrSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIHRhc2tJbnB1dC5ibHVyKCk7IC8vIFRyaWdnZXIgdGhlIGJsdXIgZXZlbnQgdG8gc2F2ZSB0aGUgY2hhbmdlc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9kb2xpc3QuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcGVuZGluZ1Rhc2tzKCk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCB1cGRhdGVTdG9yYWdlID0gKHRhc2tzKSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJDb21wbGV0ZWQgPSAodGFza3MpID0+IHtcbiAgY29uc3QgdXBkYXRlZFRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZWQpO1xuICB1cGRhdGVkVGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICB0YXNrLmluZGV4ID0gaW5kZXggKyAxO1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRUYXNrcztcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wbGV0ZSA9ICh0YXNrcywgaW5kZXgpID0+IHtcbiAgY29uc3QgdGFzayA9IHRhc2tzW2luZGV4XTtcbiAgdGFzay5jb21wbGV0ZWQgPSAhdGFzay5jb21wbGV0ZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgQ2xlYXJUYXNrID0gKGRhdGFJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhci1idXR0b24nKTtcbiAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgdG9kb2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb0xpc3RzJyk7XG4gICAgY29uc3QgY29tcGxldGVkVGFza3MgPSB0b2RvbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGxldGVkJyk7XG5cbiAgICAvLyByZW1vdmUgb25seSBjb21wbGV0ZWQgdGFza3MgaWYgdGhlcmUgYXJlIGFueVxuICAgIGlmIChjb21wbGV0ZWRUYXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0YXNrcyA9IGRhdGFJbnN0YW5jZS5nZXRUYXNrcygpLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKTtcbiAgICAgIGRhdGFJbnN0YW5jZS5zZXRUYXNrcyh0YXNrcyk7XG4gICAgfVxuICAgIGNsZWFyQ29tcGxldGVkKGRhdGFJbnN0YW5jZS5nZXRUYXNrcygpKTtcblxuICAgIC8vIHVwZGF0ZSBzdG9yYWdlIHdpdGggdGhlIGxhdGVzdCB0YXNrc1xuICAgIHVwZGF0ZVN0b3JhZ2UoZGF0YUluc3RhbmNlLmdldFRhc2tzKCkpO1xuXG4gICAgZGF0YUluc3RhbmNlLnBlbmRpbmdUYXNrcygpO1xuICB9KTtcbiAgY2xlYXJDb21wbGV0ZWQoZGF0YUluc3RhbmNlLmdldFRhc2tzKCkpO1xufTtcbiIsImltcG9ydCAnLi4vc3R5bGUuY3NzJztcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9hcHAuanMnO1xuaW1wb3J0IHsgQ2xlYXJUYXNrLCB1cGRhdGVTdG9yYWdlIH0gZnJvbSAnLi9jbGVhci5qcyc7XG5pbXBvcnQgeyBkZWxldGVEYXRhLCBhZGRUYXNrIH0gZnJvbSAnLi90YXNrVXRpbHMuanMnO1xuXG5jbGFzcyBEYXRhIHtcbiAgI3Rhc2tzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3Rhc2tzID0gW107XG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgIHRoaXMuYWRkRGF0YSgpO1xuICAgIENsZWFyVGFzayh0aGlzKTtcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLiN0YXNrcztcbiAgfVxuXG4gIHNldFRhc2tzKHRhc2tzKSB7XG4gICAgLy8gQXNzaWduIG5ldyBpbmRleCB2YWx1ZXMgYmFzZWQgb24gb3JkZXIgaW4gYXJyYXlcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFzay5pbmRleCA9IGluZGV4ICsgMTtcbiAgICB9KTtcbiAgICB0aGlzLiN0YXNrcyA9IHRhc2tzO1xuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tzID0gKCkgPT4ge1xuICAgIHJlbmRlclRhc2tzKFxuICAgICAgdGhpcy4jdGFza3MsXG4gICAgICB0aGlzLmRlbGV0ZURhdGEuYmluZCh0aGlzKSxcbiAgICAgIHRoaXMudXBkYXRlRGF0YS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy5zZXRUYXNrcy5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy5wZW5kaW5nVGFza3MsXG4gICAgKTtcbiAgfTtcblxuICBwZW5kaW5nVGFza3MgPSAoKSA9PiB7XG4gICAgY29uc3QgcGVuZGluZ051bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZW5kaW5nLW51bScpO1xuICAgIGNvbnN0IHBlbmRpbmdUYXNrcyA9IHRoaXMuI3Rhc2tzLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKTtcbiAgICBwZW5kaW5nTnVtLnRleHRDb250ZW50ID0gcGVuZGluZ1Rhc2tzLmxlbmd0aCA9PT0gMCA/ICdubycgOiBwZW5kaW5nVGFza3MubGVuZ3RoO1xuICB9O1xuXG4gIGFkZERhdGEgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1maWVsZCB0ZXh0YXJlYScpO1xuICAgIGNvbnN0IG5vdGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWZpZWxkIC5ub3RlLWljb24nKTtcblxuICAgIGNvbnN0IGhhbmRsZUFkZFRhc2sgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dFZhbCA9IGlucHV0RmllbGQudmFsdWUudHJpbSgpO1xuXG4gICAgICBpZiAoaW5wdXRWYWwubGVuZ3RoID4gMCkge1xuICAgICAgICBhZGRUYXNrKFxuICAgICAgICAgIHRoaXMuI3Rhc2tzLFxuICAgICAgICAgIGlucHV0VmFsLFxuICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MsXG4gICAgICAgICAgdGhpcy5wZW5kaW5nVGFza3MsXG4gICAgICAgICAgdXBkYXRlU3RvcmFnZSxcbiAgICAgICAgKTtcbiAgICAgICAgaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBoYW5kbGVBZGRUYXNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBub3RlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGhhbmRsZUFkZFRhc2soKTtcbiAgICB9KTtcbiAgfTtcblxuICByZWFkRGF0YSA9ICgpID0+IHRoaXMuI3Rhc2tzO1xuXG4gIHVwZGF0ZURhdGEgPSAoaW5kZXgsIG5ld0RhdGEpID0+IHtcbiAgICB0aGlzLiN0YXNrc1tpbmRleF0gPSBuZXdEYXRhO1xuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB0aGlzLnBlbmRpbmdUYXNrcygpO1xuICAgIHVwZGF0ZVN0b3JhZ2UodGhpcy4jdGFza3MpO1xuICB9O1xuXG4gIGRlbGV0ZURhdGEgPSAoaW5kZXgpID0+IHtcbiAgICBkZWxldGVEYXRhKFxuICAgICAgdGhpcy4jdGFza3MsXG4gICAgICBpbmRleCxcbiAgICAgIHRoaXMucmVuZGVyVGFza3MsXG4gICAgICB0aGlzLnBlbmRpbmdUYXNrcyxcbiAgICAgIHVwZGF0ZVN0b3JhZ2UsXG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcbiIsImNsYXNzIEVkaXRUYXNrIHtcbiAgc3RhdGljIGVkaXREZXNjcmlwdGlvbihcbiAgICB0YXNrSW5kZXgsXG4gICAgbmV3RGVzY3JpcHRpb24sXG4gICAgdGFza3MsXG4gICAgc2V0VGFza3MsXG4gICAgdXBkYXRlU3RvcmFnZSxcbiAgKSB7XG4gICAgY29uc3QgdXBkYXRlZFRhc2tzID0gdGFza3MubWFwKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSB0YXNrSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4udGFzaywgZGVzY3JpcHRpb246IG5ld0Rlc2NyaXB0aW9uIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFzaztcbiAgICB9KTtcblxuICAgIHNldFRhc2tzKHVwZGF0ZWRUYXNrcyk7IC8vIFVwZGF0ZSB0aGUgdGFza3Mgd2l0aCB0aGUgZWRpdGVkIGRlc2NyaXB0aW9uXG4gICAgdXBkYXRlU3RvcmFnZSh1cGRhdGVkVGFza3MpOyAvLyBTYXZlIHRoZSBjaGFuZ2VzIHRvIHRoZSBzdG9yYWdlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdFRhc2s7XG4iLCIvLyBVcGRhdGUgdGhlIHZhbHVlcyB0byB0aGUgbG9jYWxzdG9yYWdlXG5jbGFzcyBMb2NhbFN0b3JhZ2Uge1xuICBjb25zdHJ1Y3RvcihzdG9yYWdlS2V5KSB7XG4gICAgdGhpcy5zdG9yYWdlS2V5ID0gc3RvcmFnZUtleTtcbiAgfVxuXG4gIHNhdmVEYXRhID0gKGRhdGEpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfTtcblxuICBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zdG9yYWdlS2V5KTtcbiAgICByZXR1cm4gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiBbXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxTdG9yYWdlO1xuIiwiY29uc3QgZGVsZXRlRGF0YSA9ICh0YXNrcywgaW5kZXgsIHJlbmRlclRhc2tzLCBwZW5kaW5nVGFza3MsIHVwZGF0ZVN0b3JhZ2UpID0+IHtcbiAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICB0YXNrLmluZGV4ID0gaW5kZXggKyAxO1xuICB9KTtcbiAgcmVuZGVyVGFza3MoKTtcbiAgcGVuZGluZ1Rhc2tzKCk7XG4gIHVwZGF0ZVN0b3JhZ2UodGFza3MpO1xufTtcblxuY29uc3QgYWRkVGFzayA9ICh0YXNrcywgaW5wdXRWYWwsIHJlbmRlclRhc2tzLCBwZW5kaW5nVGFza3MsIHVwZGF0ZVN0b3JhZ2UpID0+IHtcbiAgY29uc3QgbmV3VGFzayA9IHtcbiAgICBkZXNjcmlwdGlvbjogaW5wdXRWYWwsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgfTtcbiAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICB0YXNrLmluZGV4ID0gaW5kZXggKyAxO1xuICB9KTtcbiAgcmVuZGVyVGFza3MoKTtcbiAgcGVuZGluZ1Rhc2tzKCk7XG4gIHVwZGF0ZVN0b3JhZ2UodGFza3MpO1xufTtcblxuZXhwb3J0IHsgZGVsZXRlRGF0YSwgYWRkVGFzayB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Qb3BwaW5zOndnaHRAMzAwOzQwMDs1MDA7NjAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlM2YyZmQ7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWF4LXdpZHRoOiA0ODBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcGFkZGluZzogMjVweDtcXG4gIG1hcmdpbjogODVweCBhdXRvIDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDEwcHggcmdiKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi5jb250YWluZXIgLmlucHV0LWZpZWxkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogNjRweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uY29udGFpbmVyIC5teS10b2RvIHtcXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XFxufVxcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5pbnB1dC1maWVsZCB0ZXh0YXJlYSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcGFkZGluZzogMThweCA0NXB4IDE4cHggMTVweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5pbnB1dC1maWVsZCB0ZXh0YXJlYTpmb2N1cyB7XFxuICBib3JkZXItY29sb3I6ICM0MDcwZjQ7XFxufVxcblxcbi5pbnB1dC1maWVsZCAubm90ZS1pY29uIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDE1cHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBjb2xvcjogIzcwNzA3MDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmlucHV0LWZpZWxkIHRleHRhcmVhOmZvY3VzIH4gLm5vdGUtaWNvbiB7XFxuICBjb2xvcjogIzQwNzBmNDtcXG59XFxuXFxuLmNvbnRhaW5lciAudG9kb0xpc3RzIHtcXG4gIG1heC1oZWlnaHQ6IDM4MHB4O1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuXFxuLnRvZG9MaXN0cyAubGlzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhmY2ZmO1xcbiAgYm94LXNoYWRvdzogMCA1cHggMTBweCByZ2JhKDAsIDQxLCA2MywgMC4xKTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMXB4IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9kb0xpc3RzIC5saXN0IC5jaGVja2JveCB7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBtaW4td2lkdGg6IDE4cHg7XFxuICBjb2xvcjogIzQwNzBmNDtcXG59XFxuXFxuLnRvZG9MaXN0cyAubGlzdCAudGFzayB7XFxuICAvKiBtYXJnaW46IDAgMzBweCAwIDE1cHg7ICovXFxuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxufVxcblxcbi5saXN0IGlucHV0OmNoZWNrZWQgfiAudGFzayB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG9MaXN0cyAubGlzdCBpIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDE1cHg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBjb2xvcjogIzcwNzA3MDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG9wYWNpdHk6IDAuNjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvTGlzdHMgLmxpc3Q6aG92ZXIgaSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG59XFxuXFxuLnRvZG9MaXN0cyAubGlzdCBpOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBjb2xvcjogI2Y5NzA3MDtcXG59XFxuXFxuLmNvbnRhaW5lciAucGVuZGluZy10YXNrcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIG1hcmdpbi10b3A6IDI1cHg7XFxufVxcblxcbi5wZW5kaW5nLXRhc2tzIHNwYW4ge1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbi5wZW5kaW5nLXRhc2tzIC5jbGVhci1idXR0b24ge1xcbiAgcGFkZGluZzogNnB4IDEycHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZDogIzQwNzBmNDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLmNsZWFyLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGU0YmYxO1xcbn1cXG5cXG4jdGFzay1pbnB1dCB7XFxuICBvdXRsaW5lLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XFxuICBtYXJnaW4tcmlnaHQ6IC0xM3B4O1xcbiAgY29sb3I6ICMzMzM7XFxufVxcblxcbiN0YXNrLWlucHV0OmZvY3VzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZGU2ZmY7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J10ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDE2cHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J106Zm9jdXMge1xcbiAgb3V0bGluZTogMnB4IHNvbGlkICMyMTk2ZjM7XFxuICBib3gtc2hhZG93OiAwIDAgNXB4ICNjY2M7XFxuICBvdXRsaW5lLW9mZnNldDogMnB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzUwcHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAyNXB4IDEwcHg7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAudG9kb0xpc3RzIC5saXN0IGkge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qix3Q0FBd0M7QUFDMUM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsYUFBYTtFQUNiLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixzQkFBc0I7RUFDdEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixXQUFXO0VBQ1gsMkJBQTJCO0VBQzNCLGVBQWU7RUFDZixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLDJDQUEyQztFQUMzQyxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZUFBZTtFQUNmLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixXQUFXO0VBQ1gsMkJBQTJCO0VBQzNCLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGtDQUFrQztFQUNsQyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQix3QkFBd0I7RUFDeEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFO0lBQ0Usa0JBQWtCO0VBQ3BCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLG9CQUFvQjtFQUN0QjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEAzMDA7NDAwOzUwMDs2MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UzZjJmZDtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXgtd2lkdGg6IDQ4MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwYWRkaW5nOiAyNXB4O1xcbiAgbWFyZ2luOiA4NXB4IGF1dG8gMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNoYWRvdzogMCA1cHggMTBweCByZ2IoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLmNvbnRhaW5lciAuaW5wdXQtZmllbGQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiA2NHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jb250YWluZXIgLm15LXRvZG8ge1xcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcXG59XFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmlucHV0LWZpZWxkIHRleHRhcmVhIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwYWRkaW5nOiAxOHB4IDQ1cHggMThweCAxNXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuLmlucHV0LWZpZWxkIHRleHRhcmVhOmZvY3VzIHtcXG4gIGJvcmRlci1jb2xvcjogIzQwNzBmNDtcXG59XFxuXFxuLmlucHV0LWZpZWxkIC5ub3RlLWljb24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICByaWdodDogMTVweDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiAjNzA3MDcwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaW5wdXQtZmllbGQgdGV4dGFyZWE6Zm9jdXMgfiAubm90ZS1pY29uIHtcXG4gIGNvbG9yOiAjNDA3MGY0O1xcbn1cXG5cXG4uY29udGFpbmVyIC50b2RvTGlzdHMge1xcbiAgbWF4LWhlaWdodDogMzgwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbn1cXG5cXG4udG9kb0xpc3RzIC5saXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOGZjZmY7XFxuICBib3gtc2hhZG93OiAwIDVweCAxMHB4IHJnYmEoMCwgNDEsIDYzLCAwLjEpO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxcHggMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi50b2RvTGlzdHMgLmxpc3QgLmNoZWNrYm94IHtcXG4gIGhlaWdodDogMThweDtcXG4gIG1pbi13aWR0aDogMThweDtcXG4gIGNvbG9yOiAjNDA3MGY0O1xcbn1cXG5cXG4udG9kb0xpc3RzIC5saXN0IC50YXNrIHtcXG4gIC8qIG1hcmdpbjogMCAzMHB4IDAgMTVweDsgKi9cXG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcXG59XFxuXFxuLmxpc3QgaW5wdXQ6Y2hlY2tlZCB+IC50YXNrIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG4udG9kb0xpc3RzIC5saXN0IGkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICByaWdodDogMTVweDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGNvbG9yOiAjNzA3MDcwO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgb3BhY2l0eTogMC42O1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG9MaXN0cyAubGlzdDpob3ZlciBpIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbn1cXG5cXG4udG9kb0xpc3RzIC5saXN0IGk6aG92ZXIge1xcbiAgb3BhY2l0eTogMTtcXG4gIGNvbG9yOiAjZjk3MDcwO1xcbn1cXG5cXG4uY29udGFpbmVyIC5wZW5kaW5nLXRhc2tzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgbWFyZ2luLXRvcDogMjVweDtcXG59XFxuXFxuLnBlbmRpbmctdGFza3Mgc3BhbiB7XFxuICBjb2xvcjogIzMzMztcXG59XFxuXFxuLnBlbmRpbmctdGFza3MgLmNsZWFyLWJ1dHRvbiB7XFxuICBwYWRkaW5nOiA2cHggMTJweDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kOiAjNDA3MGY0O1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4uY2xlYXItYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZTRiZjE7XFxufVxcblxcbiN0YXNrLWlucHV0IHtcXG4gIG91dGxpbmUtc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBtYXJnaW4tbGVmdDogMTJweDtcXG4gIG1hcmdpbi1yaWdodDogLTEzcHg7XFxuICBjb2xvcjogIzMzMztcXG59XFxuXFxuI3Rhc2staW5wdXQ6Zm9jdXMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZTZmZjtcXG59XFxuXFxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMTZweDtcXG4gIGhlaWdodDogMTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG59XFxuXFxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpmb2N1cyB7XFxuICBvdXRsaW5lOiAycHggc29saWQgIzIxOTZmMztcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggI2NjYztcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbiAgYm9yZGVyLWNvbG9yOiAjMjE5NmYzO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNTBweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDI1cHggMTBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gIC50b2RvTGlzdHMgLmxpc3QgaSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkxvY2FsU3RvcmFnZSIsIkRhdGEiLCJzdG9yYWdlIiwiZGF0YSIsInNldFRhc2tzIiwibG9hZERhdGEiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2F2ZURhdGEiLCJnZXRUYXNrcyIsIkVkaXRUYXNrIiwidXBkYXRlU3RvcmFnZSIsInRhc2tzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXJUYXNrcyIsImRlbGV0ZURhdGEiLCJ1cGRhdGVEYXRhIiwicGVuZGluZ1Rhc2tzIiwidG9kb2xpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwidGFzayIsImluZGV4IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb21wbGV0ZWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb25jYXQiLCJkZXNjcmlwdGlvbiIsInRyYXNoSWNvbiIsImNoZWNrYm94IiwidGFza0lucHV0IiwiZWRpdERlc2NyaXB0aW9uIiwidmFsdWUiLCJlIiwia2V5IiwiYmx1ciIsImFwcGVuZENoaWxkIiwiY2xlYXJDb21wbGV0ZWQiLCJ1cGRhdGVkVGFza3MiLCJmaWx0ZXIiLCJjb21wbGV0ZSIsIkNsZWFyVGFzayIsImRhdGFJbnN0YW5jZSIsImNsZWFyQnV0dG9uIiwiY29tcGxldGVkVGFza3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiYWRkVGFzayIsIl90YXNrcyIsIldlYWtNYXAiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9jbGFzc1ByaXZhdGVGaWVsZEluaXRTcGVjIiwid3JpdGFibGUiLCJfZGVmaW5lUHJvcGVydHkiLCJfY2xhc3NQcml2YXRlRmllbGRHZXQiLCJiaW5kIiwicGVuZGluZ051bSIsInRleHRDb250ZW50IiwiaW5wdXRGaWVsZCIsIm5vdGVJY29uIiwiaGFuZGxlQWRkVGFzayIsImlucHV0VmFsIiwidHJpbSIsIm5ld0RhdGEiLCJfY2xhc3NQcml2YXRlRmllbGRTZXQiLCJhZGREYXRhIiwiX2NyZWF0ZUNsYXNzIiwidGFza0luZGV4IiwibmV3RGVzY3JpcHRpb24iLCJtYXAiLCJfb2JqZWN0U3ByZWFkIiwic3RvcmFnZUtleSIsImdldEl0ZW0iLCJwYXJzZSIsInNwbGljZSIsIm5ld1Rhc2siLCJwdXNoIl0sInNvdXJjZVJvb3QiOiIifQ==