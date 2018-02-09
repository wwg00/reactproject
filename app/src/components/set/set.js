
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,Link} from 'react-router'
import './set.scss'
// import { List, Switch } from 'antd-mobile';
// import {Icon} from 'antd'
import { NavBar, Icon,List, Switch } from 'antd-mobile';

export default class SetComponent extends React.Component{
    
    exit(){
       localStorage.userId = '';
       hashHistory.push('/login');
    }
   return_mine(){
        hashHistory.push('/mine');
    }
    site(){
       hashHistory.push('/site');
    }
   
    render(){
        return(
              <div className="set">
                  <div className="setnav">
                     <div onClick={this.return_mine.bind(this)} >
                        <Icon type="left" style={{fontSize:'0.469rem',height:'100%',width:'1.25rem' }} />
                     </div> 
                     <span>设置</span>
                  </div>
                  <ul className="setthing">
                  <li><span>我的收货地址</span><div onClick={this.site.bind(this)}><Icon type="right" style={{fontSize:'0.469rem',width:'1.562rem',height:'100%'}}/></div></li>
                      <li><span>账户安全</span><Icon type="right" style={{fontSize:'0.469rem',width:'1.562rem'}}/></li>
                      <li><span>内部绑定</span><Icon type="right" style={{fontSize:'0.469rem',width:'1.562rem'}}/></li>
                      <li>
                         <span>开启流量模式</span>

                      </li>
                  </ul>
                  <div className="exit" onClick={this.exit.bind(this)}>退出登录</div>
              </div> 
        )
    }
}

