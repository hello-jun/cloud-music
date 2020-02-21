import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'

import { ScrollContainer, PullDownLoading, PullUpLoading } from './style'
import Loading from '../loading/index';
import Loading2 from '../loading-v2/index';
import { debounce } from "../../api/utils";
/**
 * Scroll 组件 集成 better-scroll
 */

const Scroll = forwardRef((props, ref) => {
    //better-scroll 实例对象
    const [bScroll, setBScroll] = useState()
    //current 指向初始化 bs 实例需要的 DOM 元素 
    const scrollContaninerRef = useRef()
    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
    const { pullUp, pullDown, onScroll } = props


    let pullUpDebounce = useMemo(() => {

        return debounce(pullUp, 300)

    }, [pullUp]);



    let pullDownDebounce = useMemo(() => {

        return debounce(pullDown, 300)

    }, [pullDown]);


    const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
    const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };

    useEffect(() => {// 初始化 better-scroll 实例
        const scroll = new BScroll(
            scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        }
        )
        setBScroll(scroll);
        return () => { // 卸载时调用 保证单例
            setBScroll(null);
        }
    }, [])// 使用初始state值

    useEffect(() => {//每次重新渲染都要刷新实例，防止无法滑动
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    useEffect(() => {//给实例绑定 scroll 事件，
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect(() => {//进行上拉到底的判断，调用上拉刷新的函数
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUpDebounce,pullUp, bScroll]);

    useEffect(() => {//进行下拉的判断，调用下拉刷新的函数
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce();
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDownDebounce,pullDown, bScroll]);

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));



    return (// refs 转发
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={PullDowndisplayStyle}><Loading2></Loading2></PullDownLoading>
        </ScrollContainer>
    )
})

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),// 滚动的方向
    click: true,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
}
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}
export default Scroll 
