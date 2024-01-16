import {
	FETCH_ARTICLES_SUCCESS,
	SELECTED_ARTICLE_SUCCESS,
	LOADER_DISPLAY_OFF,
	LOADER_DISPLAY_ON,
	ERROR_DISPLAY_ON,
	ERROR_DISPLAY_OFF,
} from './types';

export function loaderOff() {
	return { type: LOADER_DISPLAY_OFF };
}

export function loaderOn() {
	return { type: LOADER_DISPLAY_ON };
}

export function errorOn() {
	return { type: ERROR_DISPLAY_ON };
}

export function errorOff() {
	return { type: ERROR_DISPLAY_OFF };
}

export function fetchArticlesSuccess(articles, articlesCount, page) {
	return {
		type: FETCH_ARTICLES_SUCCESS,
		articles,
		articlesCount,
		page,
	};
}

export function fetchArticlesList(offset = 0, page = 1) {
	return async dispatch => {
		dispatch(loaderOn());
		try {
			const response = await fetch(
				`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`
			);
			const { articles, articlesCount } = await response.json();
			dispatch(fetchArticlesSuccess(articles, articlesCount, page));
			dispatch(loaderOff());
			dispatch(errorOff());
		} catch (err) {
			dispatch(loaderOff());
			dispatch(errorOn());
		}
	};
}

export function selectedArticleSuccess(article) {
	return {
		type: SELECTED_ARTICLE_SUCCESS,
		article,
	};
}

export function fetchArticle(slug) {
	return async dispatch => {
		dispatch(loaderOn());
		try {
			const response = await fetch(
				`https://blog.kata.academy/api/articles/${slug}`
			);
			const { article } = await response.json();
			dispatch(selectedArticleSuccess(article));
			dispatch(loaderOff());
			dispatch(errorOff());
		} catch (err) {
			dispatch(loaderOff());
			dispatch(errorOn());
		}
	};
}
