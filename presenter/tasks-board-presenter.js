import TasksListComponent from '../view/list-task-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/taskbar-component.js';
import { Status, StatusLabel} from '../const.js';
import {render} from '../framework/render.js';

export default class TasksBoardPresenter {
    tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.boardContainer = boardContainer;
        this.tasksModel = tasksModel;
    }

    init() {
      this.boardTasks = [...this.tasksModel.getTasks()];

      render(this.tasksBoardComponent, this.boardContainer);

      // Преобразуем объект Status в массив значений
      Object.values(Status).forEach((status) => {
          // Передаем заголовок из StatusLabel для каждого статуса
          const tasksListComponent = new TasksListComponent({ 
              status, 
              title: StatusLabel[status]  // Используем соответствующий заголовок для каждого статуса
          });
          render(tasksListComponent, this.tasksBoardComponent.getElement());

          const tasksByStatus = this.boardTasks.filter(task => task.status === status);

          tasksByStatus.forEach(task => {
              const taskComponent = new TaskComponent({ task });
              render(taskComponent, tasksListComponent.getElement().querySelector('.task-list'));
          });
      });
  }
}
