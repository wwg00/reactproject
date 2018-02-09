import React from 'react';
import $ from 'jquery';

import { Button, WhiteSpace, WingBlank, Carousel } from 'antd-mobile';
require('../home/homeComponent.scss')
export default class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['80130apmb_08', '2018zt/app11sylb', 'dxrmbapptz18-0130_01'],
            keyword:['男装','女装','童装'],
            imgHeight: 176,
            slideIndex: 0,
            imgUrl:[],
        }
    }
    componentWillMount(){
        // var url = 'http://127.0.0.1:88/getCarousel';
        // $.get(url,(res)=>{
        //     this.setState({imgUrl:res})
        // })
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['80130apmb_08', '2018zt/app11sylb', 'dxrmbapptz18-0130_01'],
            });
        }, 1000);
    }
    render(){
        return(
            <div className="carousel">
                <WingBlank>
                    <div className="sub-title">Normal</div>
                    <Carousel
                        dots={true}
                        autoplay={true}
                        infinite
                        selectedIndex={1}
                        autoplayInterval={3000}
                    >
                        {this.state.data.map( (item,idx) => (
                            <a
                                key={item}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={`http://img.banggo.com/sources/cms/banggo2017/APP/${item}.jpg`}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    alt = {this.state.keyword[idx]}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
            </div>
            
        )
    }
}
