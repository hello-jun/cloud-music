import React, { useEffect } from 'react'
import { connect } from "react-redux";
import Slider from '../../components/slider'
import RecommendList from '../../components/list';
import { Content } from './style';
import Scroll from '../../baseUI/scroll';

import * as actionTypes from './store/actionCreators';

// console.log(Slider, typeof Slider)

const Recommend = props => {

    const { bannerList, recommendList } = props;

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props

    useEffect(() => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
        //eslint-disable-next-line
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : []  //immutatble 对象转js对象
    const recommendListJS = recommendList ? recommendList.toJS() : []


    /*     //mock 数据
        const bannerList = [1, 2, 3, 4].map(item => {
            return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
        }); */
    /* 
        const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
            return {
                id: 1,
                picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
                playCount: 17171122,
                name: "朴树、许巍、李健、郑钧、老狼、赵雷"
            }
        }); */

    return (
        <Content>
            <Scroll className='list'>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => {
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
    }
}


// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))  
