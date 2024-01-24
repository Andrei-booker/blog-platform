import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { message } from 'antd';

import uniqid from 'uniqid';

import {
	postFavoriteArticle,
	deleteFavoriteArticle,
} from '../../redux/actions';

import classes from './MiniArticle.module.scss';
import heart from '../../img/Vector.svg';
import redHeart from '../../img/red-heart.svg';
import userLogo from '../../img/user-logo.svg';

function MiniArticle({ data }) {
	const page = useSelector(state => state.articles.page);
	const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
	const dispatch = useDispatch();
	const {
		slug,
		title,
		favoritesCount,
		tagList,
		description,
		author,
		createdAt,
		favorited,
	} = data;
	const { image, username } = author;

	const handleFavorite = () => {
		if (!isLoggedIn) {
			message.info('You need to sign in to perform this action');
		}
		if (favorited) {
			dispatch(deleteFavoriteArticle(slug, page));
		} else dispatch(postFavoriteArticle(slug, page));
	};

	return (
		<div className={classes.miniArticle}>
			<div className={classes.articleInfo}>
				<div className={classes.articleHeader}>
					<Link to={`/articles/${slug}`} className={classes.articleTitle}>
						{title}
					</Link>
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
	);
}

MiniArticle.defaultProps = {
	data: {},
};

MiniArticle.propTypes = {
	data: PropTypes.shape({
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		favorited: PropTypes.bool.isRequired,
		favoritesCount: PropTypes.number,
		tagList: PropTypes.arrayOf(PropTypes.string),
		author: PropTypes.shape({
			image: PropTypes.string,
			username: PropTypes.string.isRequired,
		}).isRequired,
		createdAt: PropTypes.string.isRequired,
		image: PropTypes.string,
	}),
};

export default MiniArticle;
