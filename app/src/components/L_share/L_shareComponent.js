
import React from 'react';
import { Link,hashHistory } from 'react-router';
import {connect} from 'react-redux'
import { Icon,} from 'antd';
import './L_share.scss';
import Imgw from "../../assets/img/weichat.png"
import Imgq from "../../assets/img/qq.png"
import { Button, Tabs, WhiteSpace  } from 'antd-mobile';
import * as L_shareAction from './L_shareAction.js'


class L_shareComponent extends React.Component{
    wshare(){
        var infodd_l = document.getElementsByClassName('infodd_l')[0];
         infodd_l.style.transform = "scale(1)";
         infodd_l.style.opacity = 0.9;

         setTimeout(function(){
            infodd_l.style.transform = "scale(0)";
            infodd_l.style.opacity = 0;
         },1000);

    }
    
    render(){
        return (
            <div id="L_share">
                <ul>
                    <li>
                        <img onClick={this.wshare.bind(this)} src={Imgw}/>
                        <p>微信</p>
                       
                    </li>
                    <li>
                        <img  onClick={this.wshare.bind(this)} src={Imgq}/>
                        <p >朋友圈</p>

                    </li>
                </ul>
                <i className="infodd_l" style={{transform: 'scale(0)', opacity: 0,}}>分享成功</i>
               
            </div>
        )
    }
}

const mapStateToProps = function(state){
    return{
        
    }
}   

export default connect(mapStateToProps,L_shareAction)(L_shareComponent)