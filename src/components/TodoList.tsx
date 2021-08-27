import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAllItems, toggleAllItems } from '../redux/actions';
import { RootState } from '../redux/store';
import { TodoItemType } from '../redux/types';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const items: TodoItemType[] = useSelector(
        (state: RootState) => state.todoList.items
    );

    const dispatchDeleteAllItemsAction = (): void => {
        dispatch(deleteAllItems());
    };

    const dispatchToggleAllItemsAction = (): void => {
        dispatch(toggleAllItems());
    };

    const toggleAllItemsButton = (
        <input
            id="toggle-all-items-button"
            className="hide"
            type="checkbox"
            onClick={dispatchToggleAllItemsAction}
        />
    );

    const todoItemJSXElements: JSX.Element[] = items.map(item => (
        <TodoItem
            name={item.name}
            done={item.done}
            id={item.id}
            key={item.id}
            createdOn={item.createdOn}
            doneOn={item.doneOn}
            updatedOn={item.updatedOn}
        />
    ));

    return (
        <div className="content-div">
            <div className="create-item-div">
                {items.length > 0 && toggleAllItemsButton}
                {/* <NewMessageForm /> */}
            </div>
            <div className="item-list-div">
                <br />
                <ul>{todoItemJSXElements}</ul>
            </div>
            <a id="delete-all-items-button" onClick={dispatchDeleteAllItemsAction}>
                DELETE ALL
            </a>
        </div>
    );
};

export default TodoList;
