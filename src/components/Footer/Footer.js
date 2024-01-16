import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticlesList } from '../../redux/actions';
import classes from './Footer.module.scss';

function Footer() {
	const dispatch = useDispatch();
	const currentPage = useSelector(state => state.articles.page);
	const articlesCount = useSelector(state => state.articles.articlesCount);
	let offset;
	const onChangePage = page => {
		offset = (page - 1) * 5;
		dispatch(fetchArticlesList(offset, page));
	};
	return (
		<div className={classes.pagination}>
			<Pagination
				pageSize={5}
				current={currentPage}
				defaultCurrent={1}
				total={articlesCount}
				showSizeChanger={false}
				onChange={onChangePage}
			/>
		</div>
	);
}

export default Footer;
