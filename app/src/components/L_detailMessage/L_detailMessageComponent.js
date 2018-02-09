

import React from 'react'
import { Link,hashHistory } from 'react-router';
import {connect} from 'react-redux';
import * as L_detailMessagetAction from './L_detailMessageAction.js';
import $ from 'jquery';
import './L_detailMessage.scss';
import { Icon,} from 'antd';
import { Button, Tabs, WhiteSpace,Tag  } from 'antd-mobile';
//import { StickyContainer, Sticky } from 'react-sticky';


class L_detailMessagetComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        show: 'none',
        showmsg: 'none',
        state:this.props.data,
        closeMsg:'block'

    };
  }
  closeMsg(){
     this.setState({closeMsg:'none'});
  }

  render(){

      return (
      
        <div id="L_Showmsg" >
          <ul>
              <li>
                <p><span><Icon className="i1" type="check-circle-o" /> 梆营自购</span></p>
                <p className="msgText">有邦购官网商城提供</p>
              </li>
              <li>
                <p><span><Icon className="i1" type="check-circle-o" /> 不可用红包</span></p>
              </li>  
              <li>
                <p><span><Icon className="i1" type="check-circle-o" /> 不可用积分</span></p>
              </li> 
              <li>
                <p><span><Icon className="i1" type="check-circle-o" /> 支持14天无理由退货</span></p>
              </li>  
              <li>
                <p><span><Icon className="i1" type="check-circle-o" /> 正品保障</span></p>
                <p className="msgText">邦购商城作为美特斯邦品牌唯一官方网上商城,所售商品均从珍正规品牌渠道进货并授权,正品保障.</p>
              </li> 
              <li>
                <Button type="warning" className="determine" onClick={this.closeMsg.bind(this)}  >
                     确定</Button>

              </li>
           
          </ul>

        </div>
          
      )
  }
}

const mapStateToProps = function(state){

    return {
       
       }
}   

export default connect(mapStateToProps,L_detailMessagetAction)(L_detailMessagetComponent)
