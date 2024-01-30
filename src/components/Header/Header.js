import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import classes from './Header.module.scss';
import userLogo from '../../img/user-logo.svg';

import { fetchArticlesList, logOut } from '../../redux/actions';

function Header() {
	const history = useHistory();
	const path = history.location.pathname;
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const user = useSelector(state => state.userReducer.user);
	const slug = useSelector(state => state.selectedArticle.item.slug);
	const { username, image } = user;
	const [logo, setLogo] = useState(image);
	const [name, setName] = useState(username);

	useEffect(() => {
		if (logo !== image) {
			setLogo(image);
		}
		if (name !== username) {
			setName(username);
		}
	}, [username, image]);

	return (
		<div className={classes.header}>
			<Link to='/' className={classes.title}>
				Realworld Blog
			</Link>
			<div className={classes.rightBlock}>
				{isLoggedIn && (
					<Link
						to='/new-article'
						className={[classes.buttonCreateArticle, classes.button].join(' ')}
					>
						Create article
					</Link>
				)}
				{!isLoggedIn && (
					<Link
						to='/sign-in'
						className={[classes.buttonSignIn, classes.button].join(' ')}
					>
						Sign In
					</Link>
				)}
				{!isLoggedIn && (
					<Link
						to='/sign-up'
						className={[classes.buttonSignUp, classes.button].join(' ')}
					>
						Sign Up
					</Link>
				)}
				{isLoggedIn && (
					<Link
						to='/profile'
						className={[classes.username, classes.button].join(' ')}
					>
						{name}
					</Link>
				)}
				{isLoggedIn && (
					<Link to='/profile'>
						<img
							className={classes.userLogo}
							alt='user-logo'
							src={image ? logo : userLogo}
						/>
					</Link>
				)}
				{isLoggedIn && (
					<button
						type='button'
						className={[classes.buttonLogOut, classes.button].join(' ')}
						onClick={() => {
							localStorage.clear();
							dispatch(logOut());
							dispatch(fetchArticlesList());
							if (path !== `/articles/${slug}`) {
								history.push('/');
							}
						}}
					>
						Log Out
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
