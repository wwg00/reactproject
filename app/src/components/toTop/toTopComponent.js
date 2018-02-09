import React from 'react'
import $ from 'jquery'

require('../home/homeComponent.scss')

export default class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        var speed = 700;//自定义滚动速度
        //回到顶部
        $(".toTop").click(function () {
            $(".main").stop().animate({ "scrollTop": 0 }, speed);
        });

        //淡入淡出
        $('.main').on('touchmove', function (e) {
            var height = $('.main')[0].scrollTop;
            height > 500 
                ? $(".toTop").fadeIn(1000) 
                : $(".toTop").stop(true, true).fadeOut(500);
        });
    }
    render() {
        return (
            <div className="scroll">
                <div className="scrollItem toTop">⇪</div>
            </div>
        )
    }
}