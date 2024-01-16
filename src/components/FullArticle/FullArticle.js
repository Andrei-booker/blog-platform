import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import uniqid from 'uniqid';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import classes from './FullArticle.module.scss';
import heart from '../../img/Vector.svg';
import userLogo from '../../img/user-logo.svg';
import { fetchArticle } from '../../redux/actions';

function FullArticle() {
	const articleData = useSelector(state => state.selectedArticle.item);
	const { slug } = useParams();
	const dispatch = useDispatch();

	const {
		title,
		favoritesCount,
		tagList,
		description,
		body,
		author,
		createdAt,
	} = articleData;
	const { image, username } = author;

	useEffect(() => {
		dispatch(fetchArticle(slug));
	}, []);

	return (
		articleData.title && (
			<div className={classes.fullArticle}>
				<div className={classes.topBlock}>
					<div className={classes.articleInfo}>
						<div className={classes.articleHeader}>
							<h5 className={classes.articleTitle}>{title}</h5>
							<img alt='like' src={heart} className={classes.articleLike} />
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
				</div>
				<Markdown className={classes.articleBody}>{body}</Markdown>
			</div>
		)
	);
}

export default FullArticle;
