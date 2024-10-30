import { tasks } from '../mock/task.js';
import { generateUniqueId } from '../utils.js';

export default class TasksModel {
  #boardTasks = tasks;
  #observers = [];
  


  getTasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateUniqueId(),
    };
    this.#boardTasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        this._notifyObservers();
    }
}

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs!== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}
