import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import classes from './EditProfile.module.scss';
import { putEditProfile } from '../../redux/actions';

function EditProfile() {
	const dispatch = useDispatch();
	const userData = useSelector(state => state.userReducer.user);
	const { username, email, image } = userData;
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: 'onBlur', defaultValues: { username, email, image } });

	const onSubmit = data => {
		const user = data;
		const jsonData = JSON.stringify({ user });
		dispatch(putEditProfile(jsonData));
	};

	return (
		<div className={classes.signUp}>
			<p className={classes.title}>Edit Profile</p>
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
						pattern: {
							value: /^[a-z][a-z0-9]*$/,
							message: 'You can only use lowercase English letters and numbers',
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
					{/* {error.email && !errors?.email && (
						<p className={classes.error}>{error.email}</p>
					)} */}
				</div>
				<label htmlFor='new-password' className={classes.inputTitle}>
					New password
				</label>
				<input
					placeholder='New password'
					id='new-password'
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
				<label htmlFor='image' className={classes.inputTitle}>
					Avatar image (url)
				</label>
				<input
					placeholder='Avatar image'
					id='image'
					className={classNames(classes.input, {
						[classes.inputError]: errors.image,
					})}
					{...register('image', {
						pattern: {
							value:
								// eslint-disable-next-line no-useless-escape
								/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gm,
							message: 'Image url needs to be valid.',
						},
					})}
				/>
				<div>
					{errors?.image && (
						<p className={classes.errorEnd}>{errors.image.message}</p>
					)}
				</div>
				<button className={classes.submitButton} type='submit'>
					Save
				</button>
			</form>
		</div>
	);
}

export default EditProfile;
