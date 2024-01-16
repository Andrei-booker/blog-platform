import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';
import { format } from 'date-fns';
import classes from './MiniArticle.module.scss';
import heart from '../../img/Vector.svg';
import userLogo from '../../img/user-logo.svg';
// import { fetchArticle } from '../../redux/actions';

function MiniArticle({ data }) {
	// const dispatch = useDispatch();
	const {
		slug,
		title,
		favoritesCount,
		tagList,
		description,
		author,
		createdAt,
	} = data;
	const { image, username } = author;

	return (
		<div className={classes.miniArticle}>
			<div className={classes.articleInfo}>
				<div className={classes.articleHeader}>
					<Link
						to={`/articles/${slug}`}
						className={classes.articleTitle}
						// onClick={() => dispatch(fetchArticle(slug))}
					>
						{title}
					</Link>
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
