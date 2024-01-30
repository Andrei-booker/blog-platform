import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spin, Alert } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ArticlesList from '../ArticlesList/ArticleList';
import Header from '../Header';
import classes from './App.module.scss';
import FullArticle from '../FullArticle/FullArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn/SignIn';

import { getCurrentUser } from '../../redux/actions';
import EditProfile from '../EditProfile/EditProfile';
import ArticleForm from '../ArticleForm/ArticleForm';

function App() {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.appReducer.isFetching);
	const error = useSelector(state => state.appReducer.isError);
	const errorMessage = useSelector(state => state.appReducer.errorMessage);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const article = useSelector(state => state.selectedArticle.item.slug);
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!isLoggedIn && token) {
			dispatch(getCurrentUser());
		}
	}, []);

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
						<Alert message={errorMessage} type='error' />
					</div>
				)}
				<Switch>
					<Route path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
					{isLoggedIn && <Route path='/profile' component={EditProfile} />}
					<Route path='/new-article' component={ArticleForm} />
					{!loading && article && (
						<Route path='/articles/:slug/edit' component={ArticleForm} />
					)}
					<Route path='/articles/:slug' component={FullArticle} />
					<Route path='/articles' component={ArticlesList} />
					<Route exact path='/' component={ArticlesList} />
					<Route
						render={() => (
							<div className={classes.error}>
								<Alert message='Page not found' type='error' />
							</div>
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
