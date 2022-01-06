import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAllItems, toggleAllItems } from '../redux/actions';
import { RootState } from '../redux/store';
import { TodoItemType } from '../redux/types';
import NewItemForm from './NewItemForm';
import TodoItem from './TodoItem';

const TodoList: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const items: TodoItemType[] = useSelector(
        (state: RootState) => state.todoList.items
    );

    const dispatchDeleteAllItemAction = (): void => {
        dispatch(deleteAllItems());
    };

    const dispatchToggleAllItemAction = (): void => {
        dispatch(toggleAllItems());
    };

    const toggleAllItemsButton = (
        <input
            id="toggle-all-items-button"
            className="hide"
            type="checkbox"
            onClick={dispatchToggleAllItemAction}
        />
    );

    //let it become an array
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
            <div className="create_item-div">
                {items.length > 0 && toggleAllItemsButton}
                <NewItemForm />
            </div>
            <div className="item-list-div">
                <br />
                <ul>{todoItemJSXElements}</ul>
            </div>
            <a id="delete-all-items-button" onClick={dispatchDeleteAllItemAction}>
                DELETE ALL
            </a>
        </div>
    );
};

export default TodoList;
