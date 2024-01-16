import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import App from './components/App';
import './index.css';

const store = configureStore({ reducer: rootReducer });
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);