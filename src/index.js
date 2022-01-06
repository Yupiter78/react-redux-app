import React from 'react';
import ReactDOM from 'react-dom';

function createStore(initialState) {
    let state = initialState;

    function getState() {
        return state;
    }

    return {getState};
}

const store = createStore([{id: 1, description: "Task 1", completed: false}]);

const App = () => {
    console.log("store:", store.getState());
    return <h1>App</h1>
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

