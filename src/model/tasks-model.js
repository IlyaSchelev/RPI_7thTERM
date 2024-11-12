import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { generateUniqueId } from '../utils.js';
import { UserAction } from '../const.js';
import { Status } from '../const.js';


export default class TasksModel extends Observable {
  #boardTasks = [];
  #observers = [];
  #tasksApiService = null;


  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.tasks.then((tasks) => {
      console.log(tasks);
    });
  }


  async init() {
    try {
        const tasks = await this.#tasksApiService.tasks;
        this.#boardTasks = tasks;
    } catch(err) {
        this.#boardTasks = [];
    }
    this._notify(UpdateType.INIT);  // оповещаем после завершения загрузки
}



  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateUniqueId(),
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }

  }

    async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        
    }

    try {
      const updateTask = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updateTask);
      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи на сервер:', err);
      task.status = previousStatus;
      throw err;
    }
  }

  deleteTask(taskId) {
    this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, {id: taskId});
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardTasks.filter(task => task.status === Status.TRASH);

    try {
        // Удаляем задачи из локального массива
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== Status.TRASH);

        // Теперь удалим их с сервера
        await Promise.all(basketTasks.map(task => this._deleteTaskFromServer(task.id)));

        console.log('Корзина очищена');
        this._notify(UserAction.CLEAR_BASKET);
    } catch (err) {
        console.error('Ошибка при очистке корзины:', err);
    }
}

async _deleteTaskFromServer(taskId) {
  const url = `${this.#tasksApiService._endPoint}/tasks/${taskId}`;
  try {
      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if (!response.ok) {
          throw new Error(`Ошибка при удалении задачи с ID ${taskId}`);
      }
      console.log(`Задача с ID ${taskId} успешно удалена с сервера`);
  } catch (err) {
      console.error('Ошибка при удалении задачи с сервера:', err);
  }
}
}
