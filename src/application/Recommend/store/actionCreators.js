// action 工厂

import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

/**
 * 设置 首页轮播图
 * @param {} data 
 */
export const changeBannerList = (data) => {
    return ({
        type: actionTypes.CHANGE_BANNER,
        data: fromJS(data)
    })
}

/**
 * 设置推荐列表
 * @param {} data 
 */
export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
});


/**
 * 获取 首页轮播图
 * 异步的方式， 主动 dispatch action
 */
export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("轮播图数据传输错误");
        })
    }
};


/**
 * 异步获取推荐列表
 * 主动 dispatch action 触发 reducer 函数更新state
 */
export const getRecommendList = () => {
    return (dispatch) => {
      getRecommendListRequest ().then (data => {
        dispatch (changeRecommendList (data.result));
        // 另外在获取推荐歌单后，应把 loading 状态改为 false
        dispatch (changeEnterLoading (false));// 改变 loading
      }).catch (() => {
        console.log ("推荐歌单数据传输错误");
      });
    }
  };


