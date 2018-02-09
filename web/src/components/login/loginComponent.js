import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as loginAction from './loginAction';
import Spinner from '../spinner/spinnerComponent';
import './login.scss';
import { Icon, Input, Button, notification,message} from 'antd';
import $ from 'jquery'

//消息提示框全局设置
message.config({
    placement: 'topCenter',
});

class LoginComponent extends React.Component{
    componentDidMount(){
        this.setState({
            url:'login',
        })
        document.addEventListener('keydown',this.loginHandler);
    }
    componentDidUpdate(){
       if(this.props.response){
            if(this.props.status == '1' && this.props.response.data.length>0 ){
                var str = JSON.stringify(this.props.response);
                window.localStorage.setItem('userInfo', str);
                hashHistory.push('/');
            }else{
                message.error('用户名或密码不正确');
            }
        
       }
    }
    componentWillUnmount(){
        this.setState({
            userName:'',
            passWord:''
        })
        this.props.login(
            this.state.url,
        )
    }
    loginHandler =(e) => {
        if(e.keyCode == '13'){
            this.yLogin()
        }
    }
    // 点击登陆
    loginBtn(){
        this.yLogin()
    }
    // 登陆函数
    yLogin(){
        if($('.ant-input')[0].value == '' || $('.ant-input')[1].value == ''){

            message.error('用户名和密码不能为空');
            return false;
        }else{
            var params = {
                username:$('.ant-input')[0].value,
                password:$('.ant-input')[1].value
            }
            this.props.login(
               this.state.url,
               params
            )
            
        }

    }
    render(){
        return(
            <div id="login-box">
                <Spinner show={this.props.loading} ></Spinner>
                <div className="login-main" >
                    <h3 className="login-title">banggo</h3>
                    <div id="login-from" >
                        <div className="form-group">
                            <label className="from-label" >用户名：</label>
                            <Input className="username" prefix={<Icon type="user" style={{ fontSize: 14 }} />} type="text" name="username" placeholder="请输入用户名"  />
                        </div>
                        <div className="form-group">
                            <label className="from-label" >密码：</label>
                            <Input className="password" prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" name="password" placeholder="请输入密码"  />
                        </div>
                        <div className="form-btn">
                            <Button type="primary" className="btnSubmit" onClick={this.loginBtn.bind(this)} >登录</Button>
                        </div>
                    </div>
                </div>
                <div className="copyright">2018 © team two</div>
            </div>
        )
    }
}

const mapToState = function(state){
    console.log(state.login)
    return{
        response:state.login.response,
        loading:state.login.loading || false,
        status:state.login.status,
    }
}

export default connect(mapToState, loginAction)(LoginComponent);

