import React from 'react';
import { Link,hashHistory } from 'react-router';
import $ from 'jquery'

import CarouselComponent from '../carousel/carouselComponent'
import ClothingComponent from '../clothing/clothingComponent'
import ToTopComponent from '../toTop/toTopComponent'
import CommonNalityFoot from '../commonalityFoot/footComponent'
import CommonNalitySeek from '../commonalitySeek/homeSeekComponent'



// 如果需要用到跳转就引入hashHistory Link from 'react-router'
// hashHistory.push('/home');
require('./homeComponent.scss')
require('../../basescss/base.scss')

export default class HomeComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: 'search',
            imgUrl: 'http://img.banggo.com/sources/cms/banggo2017/999999/sysdhf960.jpg?x-oss-process=image/quality,Q_90'
        }
    }
    render(){
        return (
            <div className="home">
                 <CommonNalitySeek></CommonNalitySeek>
         
                <div className="main">
                    <CarouselComponent></CarouselComponent>
                    <div className="transition">
                        <img src={this.state.imgUrl}/>
                    </div>
                    <ClothingComponent></ClothingComponent>
                </div>
         
                <ToTopComponent></ToTopComponent>
                <CommonNalityFoot color="home"></CommonNalityFoot>
            </div>  

        )
    }
}

