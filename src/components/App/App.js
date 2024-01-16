import { useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticleList';
import Header from '../Header';
import classes from './App.module.scss';
import FullArticle from '../FullArticle/FullArticle';

function App() {
	const loading = useSelector(state => state.appReducer.isFetching);
	const error = useSelector(state => state.appReducer.isError);
	// const selectedArticle = useSelector(state => state.selectedArticle.item);
	return (
		<Router>
			<div className={classes.app}>
				<Header />
				{loading && (
					<div className={classes.spin}>
						<Spin />
					</div>
				)}
				{error && (
					<div className={classes.error}>
						<Alert
							message='Something went wrong... We are already working on this!'
							type='error'
						/>
					</div>
				)}
				<Switch>
					<Route path='/articles/:slug' component={FullArticle} />
					<Route path='/articles' component={ArticlesList} />
					<Route path='/' component={ArticlesList} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
