import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { message } from 'antd';

import classNames from 'classnames';

import classes from './ArticleForm.module.scss';
import { errorOn, postNewArticle, putUpdateArticle } from '../../redux/actions';

function ArticleForm() {
	const history = useHistory();
	const path = history.location.pathname;
	const isFetching = useSelector(state => state.appReducer.isFetching);
	const selectedArticle = useSelector(state => state.selectedArticle.item);
	const currentUsername = useSelector(state => state.userReducer.user.username);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const { title, description, body, tagList, slug, author } = selectedArticle;
	const { username } = author;
	const defaultTagList = tagList.map(item => ({ tag: item }));
	const dispatch = useDispatch();

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		setValue,
		reset,
	} = useForm({
		mode: 'onSubmit',
		defaultValues: {
			title: '',
			description: '',
			body: '',
			tags: [{ tag: '' }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: 'tags',
		control,
	});

	const [inputValue, setInputValue] = useState(tagList.length >= 1 || '');

	const onSubmit = data => {
		const { tags } = data;
		const correctTags = [];
		tags.forEach(item => {
			if (item.tag) {
				correctTags.push(item.tag);
			}
		});
		const formatData = {
			...data,
			tagList: correctTags,
		};
		if (path === '/new-article') {
			message.success(
				'The article has been successfully created! Maybe another one?'
			);
			dispatch(postNewArticle(formatData));
			history.push(`/`);
		} else {
			message.success('The article has been successfully edited.');
			dispatch(putUpdateArticle(formatData, slug));
			history.push(`/articles/${slug}`);
		}
	};

	useEffect(() => {
		if (
			path !== '/new-article' &&
			currentUsername &&
			currentUsername !== username
		) {
			dispatch(errorOn("You should not edit someone else' article"));
		}
	}, [username, currentUsername, path]);

	useEffect(() => {
		if (path !== '/new-article') {
			setValue('title', title);
			setValue('description', description);
			setValue('body', body);
			setValue('tags', defaultTagList.length ? defaultTagList : [{ tag: '' }]);
		} else reset();
	}, [path]);

	useEffect(() => {
		if (!isLoggedIn) {
			history.push('/');
		}
	}, [isLoggedIn]);

	return (
		<div className={classes.signUp}>
			{path === '/new-article' ? (
				<p className={classes.title}>Create new article</p>
			) : (
				<p className={classes.title}>Edit article</p>
			)}
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
									remove(index);
									if (tagList.length) setInputValue(tagList.length);
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
				<button
					className={classes.submitButton}
					type='submit'
					disabled={isFetching}
				>
					Send
				</button>
			</form>
		</div>
	);
}

export default ArticleForm;
