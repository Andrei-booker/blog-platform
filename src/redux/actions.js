import {
  FETCH_ARTICLES_SUCCESS,
  SELECTED_ARTICLE_FETCH,
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
  POST_NEW_ARTICLE_SUCCESS,
  POST_NEW_ARTICLE_FAILURE,
  PUT_UPDATE_ARTICLE_SUCCESS,
  PUT_UPDATE_ARTICLE_FAILURE,
  POST_FAVORITE_ARTICLE_SUCCESS,
  POST_FAVORITE_ARTICLE_FAILURE,
  LOG_OUT,
} from "./types";

export function loaderOff() {
  return { type: LOADER_DISPLAY_OFF };
}

export function loaderOn() {
  return { type: LOADER_DISPLAY_ON };
}

export function errorOn(message) {
  return { type: ERROR_DISPLAY_ON, message };
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
  return async (dispatch) => {
    dispatch(loaderOn());
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const { articles, articlesCount } = await response.json();
      dispatch(fetchArticlesSuccess(articles, articlesCount, page));
      dispatch(loaderOff());
      dispatch(errorOff());
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("API Error"));
    }
  };
}

export function selectedArticleFetch() {
  return {
    type: SELECTED_ARTICLE_FETCH,
  };
}

export function selectedArticleSuccess(article) {
  return {
    type: SELECTED_ARTICLE_SUCCESS,
    article,
  };
}

export function fetchArticle(slug) {
  return async (dispatch) => {
    dispatch(selectedArticleFetch());
    dispatch(loaderOn());
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const { article } = await response.json();
      dispatch(selectedArticleSuccess(article));
      dispatch(loaderOff());
      dispatch(errorOff());
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("There is no such article anymore"));
    }
  };
}

export function postNewUserSuccess(user) {
  return {
    type: POST_NEW_USER_SUCCESS,
    user,
  };
}

export function postNewUserFailure(errors) {
  return {
    type: POST_NEW_USER_FAILURE,
    errors,
  };
}

export function postNewUser(userData) {
  const { username, email, password } = userData;
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const response = await fetch("https://blog.kata.academy/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { username, email, password },
        }),
      });
      if (response.status === 422) {
        localStorage.clear();
        const { errors } = await response.json();
        dispatch(postNewUserFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        const { user } = await response.json();
        const { token } = user;
        localStorage.setItem("token", token);
        dispatch(postNewUserSuccess(user));
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Post New User Error"));
    }
  };
}

export function postLogInSuccess(user) {
  return {
    type: POST_LOG_IN_SUCCESS,
    user,
  };
}

export function postLogInFailure(errors) {
  return {
    type: POST_LOG_IN_FAILURE,
    errors,
  };
}

export function postLogIn(userData) {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const response = await fetch(
        "https://blog.kata.academy/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userData,
        },
      );
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(postNewUserFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        const { user } = await response.json();
        const { token } = user;
        localStorage.setItem("token", token);
        dispatch(postLogInSuccess(user));
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Post Log In Error"));
    }
  };
}

export function getCurrentUserSuccess(user) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    user,
  };
}

export function getCurrentUserFailure(errors) {
  return {
    type: GET_CURRENT_USER_FAILURE,
    errors,
  };
}

export function getCurrentUser() {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://blog.kata.academy/api/user", {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(getCurrentUserFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        const { user } = await response.json();
        dispatch(getCurrentUserSuccess(user));
        dispatch(loaderOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Get Current User Error"));
    }
  };
}

export function putEditProfileSuccess(user) {
  return {
    type: PUT_EDIT_PROFILE_SUCCESS,
    user,
  };
}

export function putEditProfileFailure(errors) {
  return {
    type: PUT_EDIT_PROFILE_FAILURE,
    errors,
  };
}

export function putEditProfile(userData) {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch("https://blog.kata.academy/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Token ${localToken}`,
          "Content-Type": "application/json",
        },
        body: userData,
      });
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(putEditProfileFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        const { user } = await response.json();
        dispatch(putEditProfileSuccess(user));
        const { token } = user;
        if (token !== localToken) {
          localStorage.setItem("token", token);
        }
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Put Edit Profile Error"));
    }
  };
}

export function postNewArticleSuccess() {
  return {
    type: POST_NEW_ARTICLE_SUCCESS,
  };
}

export function postNewArticleFailure(errors) {
  return {
    type: POST_NEW_ARTICLE_FAILURE,
    errors,
  };
}

export function postNewArticle(data) {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch("https://blog.kata.academy/api/articles", {
        method: "POST",
        headers: {
          Authorization: `Token ${localToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: data }),
      });
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(postNewArticleFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        dispatch(fetchArticlesList());
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Post New Article Error"));
    }
  };
}

export function putUpdateArticleSuccess() {
  return {
    type: PUT_UPDATE_ARTICLE_SUCCESS,
  };
}

export function putUpdateArticleFailure(errors) {
  return {
    type: PUT_UPDATE_ARTICLE_FAILURE,
    errors,
  };
}

export function putUpdateArticle(data, slug) {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${localToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ article: data }),
        },
      );
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(putUpdateArticleFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        dispatch(putUpdateArticleSuccess());
        dispatch(fetchArticle(slug));
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Post New Article Error"));
    }
  };
}

export function deleteArticleSuccess() {
  return {
    type: PUT_UPDATE_ARTICLE_SUCCESS,
  };
}

export function deleteArticleFailure(errors) {
  return {
    type: PUT_UPDATE_ARTICLE_FAILURE,
    errors,
  };
}

export function deleteArticle(slug) {
  return async (dispatch) => {
    dispatch(errorOff());
    dispatch(loaderOn());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localToken}`,
          },
        },
      );
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(deleteArticleFailure(errors));
        dispatch(loaderOff());
        dispatch(errorOff());
      } else {
        dispatch(deleteArticleSuccess());
        dispatch(loaderOff());
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(loaderOff());
      dispatch(errorOn("Delete Article Error"));
    }
  };
}

export function postFavoriteArticleSuccess(article) {
  return {
    type: POST_FAVORITE_ARTICLE_SUCCESS,
    article,
  };
}

export function postFavoriteArticleFailure(errors) {
  return {
    type: POST_FAVORITE_ARTICLE_FAILURE,
    errors,
  };
}

export function getFavoriteArticlesList(offset = 0, page = 1) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const { articles, articlesCount } = await response.json();
      dispatch(fetchArticlesSuccess(articles, articlesCount, page));
      dispatch(errorOff());
    } catch (err) {
      dispatch(errorOn("API Error"));
    }
  };
}

export function postFavoriteArticle(slug, page) {
  const offset = (page - 1) * 5;
  return async (dispatch) => {
    dispatch(errorOff());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localToken}`,
          },
        },
      );
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(postFavoriteArticleFailure(errors));
        dispatch(errorOff());
      } else {
        const { article } = await response.json();
        dispatch(getFavoriteArticlesList(offset, page));
        dispatch(postFavoriteArticleSuccess(article));
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(errorOn("Post Favorite Article Error"));
    }
  };
}

export function deleteFavoriteArticle(slug, page) {
  const offset = (page - 1) * 5;
  return async (dispatch) => {
    dispatch(errorOff());
    try {
      const localToken = localStorage.getItem("token");
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localToken}`,
          },
        },
      );
      if (response.status === 422) {
        const { errors } = await response.json();
        dispatch(postFavoriteArticleFailure(errors));
        dispatch(errorOff());
      } else {
        const { article } = await response.json();
        dispatch(getFavoriteArticlesList(offset, page));
        dispatch(postFavoriteArticleSuccess(article));
        dispatch(errorOff());
      }
    } catch (err) {
      dispatch(errorOn("Post Favorite Article Error"));
    }
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
