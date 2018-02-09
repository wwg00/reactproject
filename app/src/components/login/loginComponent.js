
import React from 'react';

import {connect} from 'react-redux'
import {hashHistory} from 'React-router'  
import * as loginAction from './loginAction.js'
import loginScss from './login.scss'
import Font from '../fontcss/baseFont.css'
import animate from '../fontcss/animate.css'
import img from './login.png' 
import $ from 'jquery';
// 如果需要用到跳转就引入hashHistory Link from 'react-router'
// hashHistory.push('/home');
 

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            password:''
            
        }
    }
    stateChange(e){
    	const target = e.target
    	this.setState({
    		[target.name] : target.value
    	})
    }
    saveUser(){
    	const{account,password} = this.state

		if(!password || !account){
//			 return alert('内容不能为空')
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '内容不能为空',
			    style:'font-size:25px;',
			    btn:'OK',
			   	className:'layerAlert'
			});
			 return false
		}


    	$.post('http://10.3.136.73:88/geiUser', {

    		account:this.state.account,password:this.state.password
    	},function(result){

    		if(result.result == false){
//				alert('账户不存在或输入错误')
			layer.open({
				title: [
				    '提示',
				    'background-color: #FF4351; color:#fff;font-size:25px;'
			    ],
			    content: '账户不存在或输入错误',
			    style:'font-size:25px;',
			    btn:'OK',
			   	className:'layerAlert'
			});
				return false
			}else{
//				alert('正在登录....')
				layer.open({
					content: '正在登录.....'
					,style: 'background-color:#09C1FF; color:#fff; border:none;font-size:25px;' //自定风格
					,time: 1
				});				
				let userId = result.data[0].id
				let userName = result.data[0].username

				
				//loaclStorage储存登录用户id为userId和用户名userName
				localStorage.userId = userId
				localStorage.userName = userName
				hashHistory.push({

					pathname:'/'

				})
			}
    	},"json")
    	
    }

	click(){
		hashHistory.push({
			pathname:'/zhuce'
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
                		<span className="bounceInLeft animated" onClick={this.click.bind(this)}>注册</span>
                		<span className="bounceInRight animated">登录</span>
                	</div>				 
                </div>
               	<div className="tiao"></div>
                <div className="input">
                	<input type="text" id="username" placeholder="请输入手机号码" name="account" value={this.state.account} />

                	<input type="password" id="password" placeholder="请输入6位以上密码" name="password" value={this.state.password}/>


                </div>
                <div className="foot">
                	<div className="login2" onClick={this.saveUser.bind(this)}>登录</div>
                	<div className="img"><img src={img}/></div>
                </div>
               
                
            </div>
        )
    }
}

const mapStateToProps = function(state){

    return{
        
    }
}   

export default connect(mapStateToProps,loginAction)(LoginComponent)