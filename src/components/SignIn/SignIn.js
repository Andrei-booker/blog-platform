import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import classNames from 'classnames';

import { postLogIn } from '../../redux/actions';

import classes from './SignIn.module.scss';

function SignIn() {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: 'onBlur' });

	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const error = useSelector(state => state.userReducer.errors);
	const isFetching = useSelector(state => state.appReducer.isFetching);

	const onSubmit = data => {
		const { email, password } = data;
		const lowerEmail = email.toLowerCase();
		const user = { email: lowerEmail, password };
		const jsonData = JSON.stringify({ user });
		dispatch(postLogIn(jsonData));
	};

	if (isLoggedIn) {
		return <Redirect to='/' />;
	}

	return (
		<div className={classes.signUp}>
			<p className={classes.title}>Sign In</p>
			{error['email or password'] && (
				<div className={classes.errorMessage}>
					<Alert message='Email or password is invalid' type='error' />
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<label htmlFor='email' className={classes.inputTitle}>
					Email address
				</label>
				<input
					placeholder='Email address'
					id='email'
					className={classNames(classes.input, {
						[classes.inputError]: errors.email,
					})}
					{...register('email', {
						required: 'This filed is required',
						pattern: {
							value: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gm,
							message: 'Your email needs to be valid.',
						},
					})}
				/>
				<div>
					{errors?.email && (
						<p className={classes.error}>{errors.email.message}</p>
					)}
				</div>
				<label htmlFor='password' className={classes.inputTitle}>
					Password
				</label>
				<input
					placeholder='Password'
					id='password'
					type='password'
					className={classNames(classes.input, {
						[classes.inputError]: errors.password,
					})}
					{...register('password', {
						required: 'This filed is required',
					})}
				/>
				<div>
					{errors?.password && (
						<p className={classes.errorEnd}>{errors.password.message}</p>
					)}
				</div>
				<button
					className={classes.submitButton}
					type='submit'
					disabled={isFetching}
				>
					Login
				</button>
			</form>
			<div className={classes.footer}>
				<p className={classes.footerText}>Don’t have an account?</p>
				<Link to='/sign-up' className={classes.footerLink}>
					Sign Up.
				</Link>
			</div>
		</div>
	);
}

export default SignIn;
