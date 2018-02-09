import React from 'react';

import $ from 'jquery'

//自定义方法
import p_Common from '../home/p_Common'

require('./classifyComponent.scss')

import classifyTabsComponent from '../classifyTabs/classifyTabsComponent'
import CommonNalityFoot from '../commonalityFoot/footComponent'
import CommonNalitySeek from '../commonalitySeek/homeSeekComponent'

export default class classifyComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: 'search',
        }
    }
    componentWillMount() {
        // console.log(this.state)
    }
    render(){
        return(
            <div className="classify">
                <CommonNalitySeek></CommonNalitySeek>
                <div className="classifyTabs">{this.props.children}</div>
                {/* <div className="static_area"></div> */}
                <CommonNalityFoot color="classify"></CommonNalityFoot>
            </div>  
        )
    }
}