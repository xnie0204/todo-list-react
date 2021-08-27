import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteItem, toggleItem, updateItem } from '../redux/actions';
import { TodoItemType } from '../redux/types';
import TodoItemDetails from './TodoItemDetails';

type TodoItemProps = TodoItemType;

const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps): JSX.Element => {
    const dispatch = useDispatch();
    const [editingMode, setEditingMode] = useState(false);
    const [editedItemName, setEditedItemName] = useState('');
    const [showItemDetails, setShowItemDetails] = useState(false);

    const quitEditingMode = (): void => {
        setEditingMode(false);
        setEditedItemName(props.name);
    };

    const dispatchToggleItemAction = (): void => {
        dispatch(toggleItem(props.id));
    };

    const dispatchUpdateItemAction = (): void => {
        dispatch(updateItem({ id: props.id, name: editedItemName }));
    };

    const dispatchDeleteItemAction = (): void => {
        dispatch(deleteItem(props.id));
    };

    // handle keyup event for updateItemInput element
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (editedItemName) {
                dispatchUpdateItemAction();
            } else {
                dispatchDeleteItemAction();
            }
            quitEditingMode();
        } else if (e.key === 'Escape') {
            quitEditingMode();
        }
    };

    // handle focusout event for updateItemInput element
    const handleFocusOut = (): void => {
        if (editedItemName) {
            dispatchUpdateItemAction();
        } else {
            dispatchDeleteItemAction();
        }
        quitEditingMode();
    };

    // handle change event for updateItemInput element
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedItemName(e.target.value);
    };

    // handle click event for itemLabel element
    const startTyping = (): void => {
        setEditingMode(true);
    };

    // handle click event for showItemDetailsButton element
    const toggleShowItemDetails = (): void => {
        setShowItemDetails(!showItemDetails);
    };

    const toggleItemCheckbox = (
        <input
            type="checkbox"
            className="toggle-item-checkbox"
            onChange={dispatchToggleItemAction}
            checked={props.done}
        />
    );

    const updateItemInput = (
        <input
            autoFocus
            type="text"
            value={editedItemName}
            onKeyUp={handleKeyUp}
            onBlur={handleFocusOut}
            className="update-item-input"
            onChange={handleTyping}
        />
    );

    const itemLabelClasses = classNames({
        'item-label': true,
        'item-strikethrough': props.done,
    });

    const itemLabel = (
        <label onClick={startTyping} className={itemLabelClasses}>
            {props.name}
        </label>
    );

    const deleteItemButton = (
        <button className="x-button" onClick={dispatchDeleteItemAction}>
            x
        </button>
    );

    const showItemDetailsButton = (
        <button className="show-item-details-button" onClick={toggleShowItemDetails}>
            ...
        </button>
    );

    if (!editingMode) {
        return (
            <React.Fragment>
                <li>
                    {toggleItemCheckbox}
                    {itemLabel}
                    {deleteItemButton}
                    {showItemDetailsButton}
                </li>
                {showItemDetails && (
                    <TodoItemDetails
                        done={props.done}
                        createdOn={props.createdOn}
                        doneOn={props.doneOn}
                        updatedOn={props.updatedOn}
                    />
                )}
            </React.Fragment>
        );
    } else {
        return (
            <li>
                {toggleItemCheckbox}
                {updateItemInput}
                {deleteItemButton}
            </li>
        );
    }
};

export default TodoItem;
