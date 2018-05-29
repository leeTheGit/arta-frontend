import App                      from './App';
import Store                    from './store/store';
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { Provider }             from 'react-redux';
import { BrowserRouter }        from 'react-router-dom';
import registerServiceWorker    from './registerServiceWorker';
import "./assets/styles/concat.min.css";

const app = (
    <Provider store={Store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
