import { combineReducers } from 'redux';

import {
	FETCH_ARTICLES_SUCCESS,
	SELECTED_ARTICLE_SUCCESS,
	LOADER_DISPLAY_OFF,
	LOADER_DISPLAY_ON,
	ERROR_DISPLAY_ON,
	ERROR_DISPLAY_OFF,
} from './types';

function appReducer(state = { isFetching: false, isError: false }, action) {
	switch (action.type) {
		case LOADER_DISPLAY_OFF:
			return { ...state, isFetching: false };
		case LOADER_DISPLAY_ON:
			return { ...state, isFetching: true };
		case ERROR_DISPLAY_ON:
			return { ...state, isError: true };
		case ERROR_DISPLAY_OFF:
			return { ...state, isError: false };
		default:
			return state;
	}
}

function articles(state = { items: [], articlesCount: 0, page: 1 }, action) {
	switch (action.type) {
		case FETCH_ARTICLES_SUCCESS:
			return {
				...state,
				items: action.articles,
				articlesCount: action.articlesCount,
				page: action.page,
			};
		default:
			return state;
	}
}

function selectedArticle(
	state = {
		item: {
			slug: null,
			title: null,
			description: null,
			body: null,
			tagList: [],
			createdAt: null,
			updatedAt: null,
			favorited: false,
			favoritesCount: 0,
			author: {
				username: null,
				image: '',
			},
		},
	},
	action
) {
	switch (action.type) {
		case SELECTED_ARTICLE_SUCCESS:
			return { ...state, item: action.article };
		case FETCH_ARTICLES_SUCCESS:
			return {
				...state,
				item: {
					slug: null,
					title: null,
					description: null,
					body: null,
					tagList: [],
					createdAt: null,
					updatedAt: null,
					favorited: false,
					favoritesCount: 0,
					author: {
						username: null,
						image: '',
					},
				},
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({ articles, selectedArticle, appReducer });

export default rootReducer;
