
import React from 'react';

import {connect} from 'react-redux'
import * as loginAction from './loginAction.js'
import {hashHistory} from 'React-router'  
import Font from '../fontcss/baseFont.css'
import loginScss from './login.scss'
//import zhuceScss from './zhuce.scss'
import animate from '../fontcss/animate.css'
import img from './login.png' 
import http from 'superagent';
import axios from 'axios'
import layer from './layer/layer_mobile/layer'

import $ from 'jquery';

class zhuceComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account:'',
            password:'',
            
        }

    }

    stateChange(e){
    	const target = e.target;
    	this.setState({
    		[target.name] : target.value
    	})
    	
    }

	saveUser(){
		const{account,password} = this.state


		//电话正则
		if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(account))){
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '不完整的11位手机号或者正确的手机号前七位',
			    style:'font-size:25px;',
			    btn:'OK',
			   	className:'layerAlert'
			});
			return false
			
		}
		if(!(/^[a-zA-Z0-9_-]{6,16}$/.test( password ))){
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '密码格式不正确',
			    style:'font-size:25px;',
			    btn:'OK',
			   	className:'layerAlert'
			});
			return false
    	}

		//post请求

		$.post('http://10.3.136.73:88/inUser',{

			account:this.state.account,password:this.state.password
		},function(result){

			if(result.result == false){
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '该账户密码已注册',
			    style:'font-size:25px;',
			    btn:'OK',
			   	className:'layerAlert'
			});
				return false
			}else{
//				alert('注册成功')
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '注册成功',
			    style:'font-size:25px;',
			    btn:'马上登录',
			   	className:'layerAlert'
			});
				hashHistory.push({
					pathname:'/login'
				})
			}

		},"json")

		
		
	}
	click(){
		hashHistory.push({
			pathname:'/login'
		})
	}
	tuichu(){
		hashHistory.push({
			pathname:'/'
		})
	}
	

    
    render(){
        return (
            <div id="home" onChange={(e) => this.stateChange(e)}>
                <div className="head">
                	<div className="font"><i className="iconfont icon-shanchuguanbiquxiaowubiankuang" onClick={this.tuichu.bind(this)}></i></div>
                	<div className="title">
                		<div className="title2">
                			<p className="bounce animated">喜欢TA, 就穿TA.</p>
                			<span>if you like it,Wear it.</span>
                		</div>
                	</div>
                	<div className="login">
                		<span className="bounceInLeft animated">注册</span>
                		<span className="bounceInRight animated" onClick={this.click.bind(this)}>登录</span>
                	</div>				 
                </div>
               	<div className="tiao"></div>
                <div className="input">
                	<input type="text" id="username" placeholder="请输入手机号码" name="account" value={this.state.account}/>
                	<input type="password" id="password" placeholder="请输入6位以上密码" name="password" value={this.state.password}/>
                </div>
                <div className="foot">
                	<div className="login2" onClick={this.saveUser.bind(this)}>下一步</div>
                	<div className="img"><img src={img}/></div>
                </div>
               
                
            </div>
        )
    }
}

const mapStateToProps = function(state){
	return (
		state = {}
	)
}   

export default connect(mapStateToProps,loginAction)(zhuceComponent) 