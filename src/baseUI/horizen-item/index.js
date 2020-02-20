/**
 * 横向分类列表
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import { List, ListItem } from './style'

const Horizen = props => {

    // 加入声明
    const Category = useRef(null);

    const { list, oldVal, title } = props;
    const { handleClick } = props;

    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
    }, [])


    return (
        <Scroll direction={"horizental"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${oldVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    );
}

Horizen.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
};

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
};

export default Horizen
