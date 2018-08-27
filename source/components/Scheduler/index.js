// Core
import React, { Component } from 'react';

import Spinner from '../Spinner';
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox'
// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        newTaskMessage: '',
        tasksFilter: '',
        isTasksFetching: false,
        tasks: [],
        isSpinning: false,
    }

    _updateTasksFilter = () => {

    }

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({
            newTaskMessage: value,
        });
    }

    _getAllCompleted = () => {

    }

    _setTasksFetchingState = (bool) => {
        this.setState(() => ({
            isSpinning: bool,
        }));
    }

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            const tasks = await api.fetchTasks();

            this.setState(() => ({
                tasks,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _createTaskAsync = async (newTaskMessage) => {
        try {
            this._setTasksFetchingState(true);

            const task = await api.createTask(newTaskMessage);

            this.setState((prevState) => ({
                tasks: [task, ...prevState.tasks]
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    }

    _updateTaskAsync = () => {

    }

    _removeTaskAsync = () => {

    }
    __completeAllTasksAsync = () => {

    }
    render () {
        const { tasks, newTaskMessage, isSpinning } = this.state;

        const tasksJSX = tasks.map((task) => (
            <Task
                { ...task }
                _removeTaskAsync = { this._removeTaskAsync }
                _updateTaskAsync = { this._updateTaskAsync }
            />
        ));
        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isSpinning } />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            onChange = { this._updateTasksFilter }
                            placeholder = 'Поиск'
                            type = 'search'
                            value = ''
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync } >
                            <input
                                className = 'createTask'
                                maxLength = { 50 }
                                onChange = { this._updateNewTaskMessage }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
                        <div className = 'overlay'>
                            { tasksJSX }
                        </div>
                    </section>
                    <footer>
                        <Checkbox onClick = {this._completeAllTasksAsync}/>
                        <span className = 'completeAllTasks'>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
