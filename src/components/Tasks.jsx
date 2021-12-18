import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
const FORMAT = 'MM/dd/yyyy';
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onCancel, onAddTask }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState(null);
    return (<div className="add-task-dialog">
        <input value={task} onChange={(event) => setTask(event.target.value)} />
        <div className="add-taks-action-container">
            <div className="btn-container">
                <button
                    disabled={!task}
                    className="add-btn" onClick={() => {
                        onAddTask(task, date);
                        onCancel();
                        setTask("");
                    }}>
                    Add Task
                </button>
                <button className="cancel-btn" onClick={() => {
                    onCancel();
                    setTask("");
                }}>
                    Cancel
                </button>
            </div>
            <div className="icon container">
                <DayPickerInput onDayChange={(day) => setDate(day)}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    formatDate={formatDate}
                    format={FORMAT}
                    dayPickerProps={{
                        modifiers: {
                            disabled: [{ before: new Date() }]
                        },
                    }}
                />
            </div>
        </div>
    </div>)
}

const TASKS_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days"
};

const TaskItem = ({ selectedTab, tasks }) => {
    let taskToRender = [...tasks]
    if (selectedTab === 'NEXT_7') {
        taskToRender = taskToRender.filter(
            (task) =>
                isAfter(task.date, new Date()) &&
                isBefore(task.date, addDays(new Date(), 7))
        );
    }
    if (selectedTab === 'TODAY') {
        taskToRender = taskToRender.filter((task) => isToday(task.date))

    }
    return (
        <div className="task-item-container"> {taskToRender.map((task) => (
            <div className="task-item">
                <p>{task.text} {dateFnsFormat(new Date(task.date), FORMAT)} {" "}</p>

            </div>
        ))}</div>
    )
};
const Tasks = ({ selectedTab }) => {
    const [showAddTask, setShowAddTaks] = useState(false);
    const [tasks, setTasks] = useState([]);
    const addnewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() };
        setTasks(prevstate => [...prevstate, newTaskItem])
    };
    return (
        <div className="tasks">
            <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab === "INBOX" ? (
                <div className="add-task-btn"
                    onClick={() => setShowAddTaks((prevstate) => !prevstate)}>
                    <span className="plus">+</span>
                    <span className="add-task-text">AddTask</span>
                </div>) : null}
            {showAddTask && (
                < AddTask onAddTask={addnewTask} onCancel={() => setShowAddTaks(false)} />
            )}

            {tasks.length > 0 ? (
                <TaskItem tasks={tasks} selectedTab={selectedTab} />
            ) : (<p>No Tasks Yet</p>)}
        </div>
    );
};

export default Tasks