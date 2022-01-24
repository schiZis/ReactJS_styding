import React,  { useState, useRef, useEffect }  from "react";
import Notification from "../Notification/Notification";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Todo = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('')
    const [notificationActive, setNotificationActive] = useState(false);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    const showNotification = (value) => {
        setNotificationActive(true)
        setNotificationTitle(value)
    }

    const hideNotification = () => {
        setNotificationActive(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button
                    type="submit"
                    className="btn btn__primary todo-edit"
                    onClick={() => showNotification('Task edited successfully!')}
                >
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {
                notificationActive
                    ?<Notification
                        hideNotification={hideNotification}
                        title={notificationTitle}
                        active={notificationActive} setActive={setNotificationActive}/>
                    : null
            }
            <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
        </>
    );
}

export default Todo