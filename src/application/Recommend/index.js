import React from 'react'
import Slider from '../../components/slider'
import PropTypes from 'prop-types'

console.log(Slider,typeof Slider)

const Recommend = props => {

    //mock 数据
    const bannerList = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    });

    return (
        <div>
            <Slider bannerList={bannerList}></Slider>
        </div>
    )
}

Recommend.propTypes = {

}

export default React.memo(Recommend)
