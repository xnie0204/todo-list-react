import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../redux/actions';

const NewItemForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const createItemForRef = useRef<HTMLFormElement>(null);

    const dispatchAddItemAction = (): void => {
        dispatch(addItem(input));
    };

    // become original state
    const clearForm = (): void => {
        setInput('');
        setTyping(false);
        if (createItemForRef.current) {
            createItemForRef.current.reset();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        // don't let it refresh
        e.preventDefault();
        dispatchAddItemAction();
        clearForm();
    };

    // handle focus event for the input element inside createItemForm element
    const handleFocus = (): void => {
        setTyping(true);
    };

    // handle change event for the input element inside createItemForm element
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    // handle focusout event for the input element inside createItemForm element
    const handleFocusOut = (): void => {
        if (!input) {
            setTyping(false);
        }
    };

    const createItemForm = (
        <form id="create-item-form" ref={createItemForRef} onSubmit={handleSubmit}>
            <input
                id="create-item-input"
                type="text"
                placeholder="Add a new item"
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleFocusOut}
                value={input}
            />
            {typing && (
                <button id="create-item-button" type="submit">
                    +
                </button>
            )}
        </form>
    );

    const clearFormButton = (
        <button className="x-button" onClick={clearForm}>
            x
        </button>
    );

    return (
        <React.Fragment>
            {createItemForm}
            {clearFormButton}
        </React.Fragment>
    );
};

export default NewItemForm;
