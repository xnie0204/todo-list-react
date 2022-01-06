import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../redux/actions';

const NewItemForm = (): JSX.Element => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const createItemFormRef = useRef<HTMLFormElement>(null);

    const dispatchAddItemAction = (): void => {
        dispatch(addItem(input));
    };

    const clearForm = (): void => {
        setInput('');
        setTyping(false);
        if (createItemFormRef.current) {
            createItemFormRef.current.reset();
        }
    };

    // handle submit event for createItemForm element
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
        <form id="create-item-form" ref={createItemFormRef} onSubmit={handleSubmit}>
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
