import { combineReducers } from 'redux';

import {
	FETCH_ARTICLES_SUCCESS,
	SELECTED_ARTICLE_SUCCESS,
	LOADER_DISPLAY_OFF,
	LOADER_DISPLAY_ON,
	ERROR_DISPLAY_ON,
	ERROR_DISPLAY_OFF,
	POST_NEW_USER_SUCCESS,
	POST_NEW_USER_FAILURE,
	POST_LOG_IN_SUCCESS,
	POST_LOG_IN_FAILURE,
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_FAILURE,
	PUT_EDIT_PROFILE_SUCCESS,
	PUT_EDIT_PROFILE_FAILURE,
	LOG_OUT,
} from './types';

function appReducer(
	state = {
		isFetching: false,
		isError: false,
		errorMessage: '',
	},
	action
) {
	switch (action.type) {
		case LOADER_DISPLAY_OFF:
			return { ...state, isFetching: false };
		case LOADER_DISPLAY_ON:
			return { ...state, isFetching: true };
		case ERROR_DISPLAY_ON:
			return { ...state, isError: true, errorMessage: action.message };
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

function userReducer(
	state = {
		isLoggedIn: false,
		user: {
			email: '',
			token: '',
			username: '',
			bio: '',
			image: null,
		},
		errors: { username: '', email: '' },
	},
	action
) {
	switch (action.type) {
		case POST_NEW_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoggedIn: true,
				errors: { username: '', email: '' },
			};
		case POST_NEW_USER_FAILURE:
			return { ...state, errors: action.errors };
		case POST_LOG_IN_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoggedIn: true,
				errors: { username: '', email: '' },
			};
		case POST_LOG_IN_FAILURE:
			return { ...state, errors: action.errors };
		case GET_CURRENT_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoggedIn: true,
				errors: { username: '', email: '' },
			};
		case GET_CURRENT_USER_FAILURE:
			return { ...state, errors: action.errors };
		case PUT_EDIT_PROFILE_SUCCESS:
			return { ...state, user: action.user };
		case PUT_EDIT_PROFILE_FAILURE:
			return { ...state, errors: action.errors };
		case LOG_OUT:
			return {
				isLoggedIn: false,
				user: {
					email: '',
					token: '',
					username: '',
					bio: '',
					image: null,
				},
				errors: { username: '', email: '' },
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	articles,
	selectedArticle,
	appReducer,
	userReducer,
});

export default rootReducer;
