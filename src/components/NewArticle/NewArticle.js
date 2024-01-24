import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { message } from 'antd';

import classNames from 'classnames';

import { postNewArticle } from '../../redux/actions';

import classes from './NewArticle.module.scss';

function NewArticle() {
	const [inputValue, setInputValue] = useState('');
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		reset,
	} = useForm({ mode: 'onSubmit', defaultValues: { tags: [{ tag: '' }] } });

	const { fields, append, remove } = useFieldArray({
		name: 'tags',
		control,
	});

	const onSubmit = data => {
		message.success(
			'The article has been successfully created! Maybe another one?'
		);
		const { tags, description, body, title } = data;
		const correctTags = [];
		tags.forEach(item => {
			if (item.tag) {
				correctTags.push(item.tag);
			}
		});
		const formatData = { title, description, body, tagList: correctTags };
		dispatch(postNewArticle(formatData));
		reset();
	};

	if (!isLoggedIn) {
		return <Redirect to='/sign-in' />;
	}

	return (
		<div className={classes.signUp}>
			<p className={classes.title}>Create new article</p>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<label htmlFor='title' className={classes.inputTitle}>
					Title
				</label>
				<input
					{...register('title', {
						required: 'This filed is required',
						maxLength: {
							value: 5 * 1000,
							message: 'The title can be max 5k characters.',
						},
					})}
					placeholder='Title'
					id='title'
					className={classNames(classes.input, {
						[classes.inputError]: errors.title,
					})}
				/>
				<div>
					{errors?.title && (
						<p className={classes.error}>{errors.title.message}</p>
					)}
				</div>
				<label htmlFor='description' className={classes.inputTitle}>
					Short description
				</label>
				<input
					placeholder='Title'
					id='description'
					className={classNames(classes.input, {
						[classes.inputError]: errors.description,
					})}
					{...register('description', {
						required: 'This filed is required',
					})}
				/>
				<div>
					{errors?.description && (
						<p className={classes.error}>{errors.description.message}</p>
					)}
				</div>
				<label htmlFor='text' className={classes.inputTitle}>
					Text
				</label>
				<textarea
					placeholder='Text'
					id='text'
					className={classNames(classes.textarea, {
						[classes.inputError]: errors.body,
					})}
					{...register('body', {
						required: 'This filed is required',
					})}
				/>
				<div>
					{errors?.body && (
						<p className={classes.error}>{errors.body.message}</p>
					)}
				</div>
				<label htmlFor='tags' className={classes.inputTitle}>
					Tags
				</label>
				{fields.map((field, index) => (
					<div key={field.id}>
						<div className={classes.tag}>
							<input
								placeholder='Tag'
								id='tags'
								className={classNames(classes.tagInput, {
									[classes.inputError]: errors.tags && errors.tags[index],
								})}
								onInput={e => {
									setInputValue(e.target.value);
								}}
								{...register(`tags.${index}.tag`, {
									pattern: {
										value: /^[a-zA-Z0-9]+$/,
										message:
											'You can use only english letters and digits without spaces and other symbols',
									},
								})}
							/>
							<button
								onClick={() => {
									setInputValue(fields.length);
									remove(index);
								}}
								className={classes.deleteTagBtn}
								type='button'
								disabled={fields.length === 1}
							>
								Delete
							</button>
							{index + 1 === Math.max(fields.length) && (
								<button
									onClick={() => {
										append();
										setInputValue('');
									}}
									className={classes.addTagBtn}
									type='button'
									disabled={!inputValue}
								>
									Add tag
								</button>
							)}
						</div>
						<p className={classes.error}>
							{errors.tags && errors.tags[index]?.tag?.message}
						</p>
					</div>
				))}
				<button className={classes.submitButton} type='submit'>
					Send
				</button>
			</form>
		</div>
	);
}

export default NewArticle;
