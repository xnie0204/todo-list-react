import React from 'react';

import ChildComponent from './ChildComponent';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <h1>Hello World</h1>
            <ChildComponent message={'Welcome to React'} />
        </React.Fragment>
    );
};

export default App;
