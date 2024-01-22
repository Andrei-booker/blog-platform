import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';

import classes from './SignUp.module.scss';

import { postNewUser } from '../../redux/actions';

function SignUp() {
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({ mode: 'onBlur' });

	const originalPassword = watch('password');
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const error = useSelector(state => state.userReducer.errors);

	const onSubmit = data => {
		const { email, username, password } = data;
		const lowerEmail = email.toLowerCase();
		const formatData = { username, email: lowerEmail, password };
		dispatch(postNewUser(formatData));
	};

	if (isLoggedIn) {
		return <Redirect to='/' />;
	}

	return (
		<div className={classes.signUp}>
			<p className={classes.title}>Create new account</p>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<label htmlFor='username' className={classes.inputTitle}>
					Username
				</label>
				<input
					{...register('username', {
						required: 'This filed is required',
						minLength: {
							value: 3,
							message: 'Your username needs to be at least 3 characters.',
						},
						maxLength: {
							value: 20,
							message: 'Your username needs to be a maximum of 20 characters.',
						},
					})}
					placeholder='Username'
					id='username'
					className={classNames(classes.input, {
						[classes.inputError]: errors.username,
					})}
				/>
				<div>
					{errors?.username && (
						<p className={classes.error}>{errors.username.message}</p>
					)}
					{error.username && !errors?.username && (
						<p className={classes.error}>{error.username}</p>
					)}
				</div>
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
					{error.email && !errors?.email && (
						<p className={classes.error}>{error.email}</p>
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
						minLength: {
							value: 6,
							message: 'Your password needs to be at least 6 characters.',
						},
						maxLength: {
							value: 40,
							message: 'Your password needs to be a maximum of 40 characters.',
						},
					})}
				/>
				<div>
					{errors?.password && (
						<p className={classes.error}>{errors.password.message}</p>
					)}
				</div>
				<label htmlFor='repeat-password' className={classes.inputTitle}>
					Repeat Password
				</label>
				<input
					placeholder='Password'
					id='repeat-password'
					type='password'
					className={classNames(classes.input, {
						[classes.inputError]: errors.repeatPassword,
					})}
					{...register('repeatPassword', {
						required: 'This filed is required',
						validate: value =>
							value === originalPassword || 'Passwords must match',
					})}
				/>
				<div>
					{errors?.repeatPassword && (
						<p className={classes.errorEnd}>{errors.repeatPassword.message}</p>
					)}
				</div>
				<div className={classes.agreementBlock}>
					<input
						id='checkbox'
						{...register('checkbox', {
							required: 'Sorry, we cannot register until you agree',
						})}
						className={classes.checkbox}
						type='checkbox'
					/>
					<label htmlFor='checkbox' className={classes.agreementText}>
						I agree to the processing of my personal information
					</label>
				</div>
				<div>
					{errors?.checkbox && (
						<p className={classes.agreementError}>{errors.checkbox.message}</p>
					)}
				</div>
				<button className={classes.submitButton} type='submit'>
					Create
				</button>
			</form>
			<div className={classes.footer}>
				<p className={classes.footerText}>Already have an account? </p>
				<Link to='sign-in' className={classes.footerLink}>
					Sign In.
				</Link>
			</div>
		</div>
	);
}
export default SignUp;
