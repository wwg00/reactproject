import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as mainAction from './mainAction';
import { Icon, Modal } from 'antd';

import './main.scss'; //引入主模板样式  

class MainComponent extends React.Component{
    componentWillMount(){
        if(!window.localStorage.getItem('userInfo')){
            return false;
        }
        this.setState({
            userInfo:JSON.parse(window.localStorage.getItem('userInfo')),
            visible: false,
        });
        this.setState({
            items:[
                {icon:"team", text:'管理员',path:'#/administrator'},
                {icon:"edit", text:'评论',path:'#/comment'},
                {icon:"bars",text:'商品',path:'#/goods'},
                {icon:"wallet",text:'订单',path:'#/order'},
                {icon:"shopping-cart",text:'购物车',path:'#/cart'},
                {icon:"user",text:'用户',path:'#/user'}
            ]
        })
    }
    createItem(){
        var items = [];
        for(var i=0;i<this.state.items.length;i++){
            items.push(<li id={i} key={i} ><Icon className={i == this.props.currentHighLight ? "activeItem" : ''} type={this.state.items[i].icon} id="itemAnticon" />
            <a onClick={this.highLight} className={i == this.props.currentHighLight? "activeAside": ''} href={this.state.items[i].path}>{this.state.items[i].text}</a></li>)
        }
        if(this.state.userInfo.type !== '1'){
            items.shift();
        }
        return items;
    }
    createBtnOut(){
        if(!this.state.status){
            return null;
        }
        return (<ul><li><a onClick={this.clickOut} ><Icon type="poweroff" /><span>退出</span></a></li></ul>);
    }
    highLight = (e) =>{
        this.props.jump(e.target.parentNode.id);
    }
    mouseEnter=(e)=>{
        this.setState({
            status:'exist',
        })
    }
    mouseLeave=(e)=>{
        this.setState({
            status:null,
        })
    }
    clickOut=()=>{
        this.setState({
            visible: true,
        })
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            confirmLoading:true,
        })
        setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            // window.localStorage.removeItem(this.state.userInfo);
            window.localStorage.removeItem('userInfo');        
            hashHistory.push('/login');
        }, 2000);
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }
    render() {
        return (
            <div id="main">
                <header className="headerMain" >
                    <h1 className="imgContainer" ><a>banggo</a></h1>
                    <dl className="userInfo">
                        <dd><a><img src="./src/assets/imgs/2.jpg" /></a></dd>
                        <dd><a>{this.state.userInfo.username}</a></dd>
                        <dd onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                            <a><Icon type="setting" /></a>
                            {this.createBtnOut()}
                        </dd>
                    </dl>
                </header>
                <main className="mainContent">
                    <aside className="mainAside" >
                        <ul>
                            {this.createItem()}
                        </ul>
                    </aside>
                    <div className="content">{this.props.children}</div>
                </main>
                <Modal title="消息提示" visible={this.state.visible} confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消">
                    <p>您确定要离开本页面吗?</p>
                </Modal>
            </div>
        )
    }
}

const mapToState = function(state){
    return {
        currentHighLight:state.main.currentHighLight || 2,
    }
}

export default connect(mapToState, mainAction)(MainComponent);