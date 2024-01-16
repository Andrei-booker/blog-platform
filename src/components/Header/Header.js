import { Link } from 'react-router-dom/cjs/react-router-dom';
import classes from './Header.module.scss';

function Header() {
	return (
		<div className={classes.header}>
			<Link to='/' className={classes.title}>
				Realworld Blog
			</Link>
			<div>
				<button
					className={[classes.buttonSignIn, classes.button].join(' ')}
					type='button'
				>
					Sign In
				</button>
				<button
					className={[classes.buttonSignUp, classes.button].join(' ')}
					type='button'
				>
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default Header;
