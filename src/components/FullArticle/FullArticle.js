import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { format } from 'date-fns';
import { Popconfirm, message } from 'antd';

import uniqid from 'uniqid';
import Markdown from 'react-markdown';

import classes from './FullArticle.module.scss';
import heart from '../../img/Vector.svg';
import redHeart from '../../img/red-heart.svg';
import userLogo from '../../img/user-logo.svg';

import {
	deleteArticle,
	deleteFavoriteArticle,
	fetchArticle,
	postFavoriteArticle,
} from '../../redux/actions';

function FullArticle() {
	const history = useHistory();
	const { pathname } = history.location;
	const articleData = useSelector(state => state.selectedArticle.item);
	const deleted = useSelector(state => state.selectedArticle.deleted);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const currentUsername = useSelector(state => state.userReducer.user.username);
	const articleAuthor = useSelector(
		state => state.selectedArticle.item.author.username
	);
	const { slug } = useParams();
	const dispatch = useDispatch();

	const onDelete = () => {
		message.success('Article deleted successfully');
		dispatch(deleteArticle(slug));
	};

	const {
		title,
		favoritesCount,
		tagList,
		description,
		body,
		author,
		createdAt,
		favorited,
	} = articleData;
	const { image, username } = author;

	useEffect(() => {
		dispatch(fetchArticle(slug));
	}, []);

	useEffect(() => {
		if (deleted) {
			history.push('/');
		}
	}, [deleted]);

	const handleFavorite = () => {
		if (!isLoggedIn) {
			message.info('You need to sign in to perform this action');
			return;
		}
		if (favorited) {
			dispatch(deleteFavoriteArticle(slug));
		} else dispatch(postFavoriteArticle(slug));
	};

	return (
		articleData.title && (
			<div className={classes.fullArticle}>
				<div className={classes.topBlock}>
					<div className={classes.articleInfo}>
						<div className={classes.articleHeader}>
							<h5 className={classes.articleTitle}>{title}</h5>
							<button
								type='button'
								className={classes.likeButton}
								onClick={handleFavorite}
							>
								<img
									alt='like'
									src={favorited ? redHeart : heart}
									className={classes.articleLike}
								/>
							</button>
							<span className={classes.likesCount}>{favoritesCount}</span>
						</div>
						<ul className={classes.tagList}>
							{!!tagList.length &&
								tagList.map(
									tag =>
										!!tag.length && (
											<button
												key={uniqid()}
												className={classes.articleTag}
												type='button'
											>
												{tag}
											</button>
										)
								)}
						</ul>
						<p className={classes.articleDescription}>{description}</p>
					</div>
					<div className={classes.rightBlock}>
						<div className={classes.userInfo}>
							<div className={classes.userTextInfo}>
								<p className={classes.userName}>{username}</p>
								<p className={classes.date}>
									{format(new Date(createdAt), 'MMMM dd, yyyy')}
								</p>
							</div>
							<img
								alt='user-logo'
								src={image.length ? image : userLogo}
								className={classes.userImage}
							/>
						</div>
						{currentUsername === articleAuthor && (
							<Popconfirm
								title='Delete the task'
								description='Are you sure to delete this article?'
								onConfirm={onDelete}
								okText='Yes'
								cancelText='No'
								placement='right'
							>
								<button
									className={[classes.deleteButton, classes.button].join(' ')}
									type='button'
								>
									Delete
								</button>
							</Popconfirm>
						)}
						{currentUsername === articleAuthor && (
							<button
								type='button'
								className={[classes.editButton, classes.button].join(' ')}
								onClick={() => history.push(`${pathname}/edit`)}
							>
								Edit
							</button>
						)}
					</div>
				</div>
				<Markdown className={classes.articleBody}>{body}</Markdown>
			</div>
		)
	);
}

export default FullArticle;
