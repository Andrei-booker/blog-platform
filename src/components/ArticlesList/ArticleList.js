import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MiniArticle from '../MiniArticle';
import Footer from '../Footer';
import classes from './ArticlesList.module.scss';
import { fetchArticlesList } from '../../redux/actions';

function ArticlesList() {
	const dispatch = useDispatch();
	const articlesList = useSelector(state => state.articles.items);

	useEffect(() => {
		dispatch(fetchArticlesList());
	}, []);

	return (
		<>
			<ul className={classes.list}>
				{articlesList.map(res => (
					<MiniArticle key={res.slug} data={res} />
				))}
			</ul>
			{!!articlesList.length && <Footer />}
		</>
	);
}

export default ArticlesList;
