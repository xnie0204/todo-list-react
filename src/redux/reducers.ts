import { v4 as uuid } from 'uuid';

import {
    AddItemAction,
    DeleteItemAction,
    TodoItemType,
    TodoListAction,
    todoListActionTypes,
    TodoListState,
    ToggleItemAction,
    UpdateItemAction,
} from './types';

const now: Date = new Date();

const initialState: TodoListState = {
    items: [
        {
            name: 'This is a done message',
            done: true,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
        {
            name: 'This is an undone message',
            done: false,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
    ],
};

export default (
    state: TodoListState = initialState,
    action: TodoListAction
): TodoListState => {
    switch (action.type) {
        case todoListActionTypes.ADD_ITEM: {
            const { name, id, createdOn } = (action as AddItemAction).payload;
            const newItem = {
                name: name,
                done: false,
                id: id,
                createdOn: createdOn,
                doneOn: undefined,
                updatedOn: createdOn,
            };
            return {
                items: [...state.items, newItem],
            };
        }

        case todoListActionTypes.DELETE_ITEM: {
            const { id } = (action as DeleteItemAction).payload;
            const updateItem: TodoItemType[] = state.items.filter(
                item => item.id !== id
            );
            return {
                items: updateItem,
            };
        }

        case todoListActionTypes.DELETE_ALL_ITEMS: {
            return {
                items: [],
            };
        }

        case todoListActionTypes.TOGGLE_ITEM: {
            const { id, doneOn } = (action as ToggleItemAction).payload;
            const updateItem: TodoItemType[] = state.items.map(item => {
                if (item.id === id) {
                    if (item.done) {
                        return { ...item, done: false, doneOn: undefined };
                    } else {
                        return { ...item, done: true, doneOn: doneOn };
                    }
                } else {
                    return item;
                }
            });
            return {
                items: updateItem,
            };
        }

        case todoListActionTypes.TOGGLE_ALL_ITEMS: {
            const numItems: number = state.items.length;
            let numDoneItems = 0;

            //caculate numDoneItems
            for (const message of state.items) {
                if (message.done === true) {
                    numDoneItems++;
                }
            }

            const updateItems: TodoItemType[] = state.items.map(item => {
                if (numDoneItems === numItems) {
                    //means everything has been toggled, untoggle them all
                    return { ...item, done: false };
                } else {
                    return { ...item, done: true };
                }
            });

            return {
                items: updateItems,
            };
        }

        case todoListActionTypes.UPDATE_ITEM: {
            const updateItems: TodoItemType[] = [...state.items];
            const { id, name, updatedOn } = (action as UpdateItemAction).payload;
            for (const message of updateItems) {
                if (message.id === id) {
                    message.name = name;
                    message.updatedOn = updatedOn;
                }
            }
            return {
                items: updateItems,
            };
        }

        default: {
            return state;
        }
    }
};
