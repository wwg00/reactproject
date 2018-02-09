  
import React from 'react'
// import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,Link} from 'react-router'
import {connect} from 'react-redux';
import $ from 'jquery';
import './mine.scss'
import {Icon} from 'antd'
import * as mineAction from './mineAction.js'
import CommonNalityFoot from '../commonalityFoot/footComponent'
import LoadingComponent from '../../components//loading/loadingComponent'
 class MineComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            userid : localStorage.getItem('userId') || ''
        }
    }
    set(){
        hashHistory.push('/set')
    }
    visit(){
      hashHistory.push('/visit');
    }
    componentDidMount(){
        if(this.state.userid==''){
          hashHistory.push('/login')
        }else{
         
              this.props.getuser(this.state.userid).then(res=>{
                $('.loading').removeClass('loading').remove();

            });
        }
        
       
    }
    render(){
         return(
    
            <div className="mine">
                
                            {
                        this.props.data.map(item=>{
                              return (
                                <div  className="mine_header"  key={item.id}>
                     <div className="mine_headertop">
                        <div className="left">
                            
                        </div>
                                <div className="center">
                                    <h1>{item.username}</h1>
                                    <h1>手机:{item.account}</h1>
                                </div>
                                   <div className="right" onClick={this.set.bind(this)}><Icon type="appstore" style={{fontSize:'0.5rem'}}/></div>                   
                                 </div>
                                 <ul className="mine_detail">
                                    <li><i>{item.integral}</i><span>我的积分</span></li>
                                    <li><i>0</i><span>我赞过的</span></li>
                                    <li><i>0</i><span>我喜欢的</span></li>
                                    <li onClick={this.visit.bind(this)}><Icon type="eye" style={{ fontSize: '0.5rem'}}/><span>浏览记录</span></li>
                                 </ul>
                               </div> 
                              )
                            })
                           
                            }                         
                        
                     

                     
              
               <div className="mine_order">
                   <Link to="/order" style={{display:'block'}}><div className="mine_ordertop"><span>全部订单</span><i></i></div>
                           <div className="mine_orderbottom">
                              <ul>
                                  <li><Icon type="book" style={{fontSize:'0.562rem'}}/><span>待付款</span></li>
                                  <li><Icon type="inbox" style={{fontSize:'0.562rem'}}/><span>待发货</span></li>
                                  <li><Icon type="car" style={{fontSize:'0.562rem'}}/><span>待收货</span></li>
                                  <li><Icon type="exception" style={{fontSize:'0.562rem'}}/><span>待评价</span></li>
                                  <li><Icon type="aliwangwang-o" style={{fontSize:'0.562rem'}}/><span>售后</span></li>
                              </ul>

                           </div>
                    </Link>
                </div>
                <div className="mine_contain">
                  <ul>
                     <li><Icon type="red-envelope" style={{height:'1.406rem',color:'#EA524E',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>红包</span></li>
                     <li><Icon type="code-o" style={{height:'1.406rem',color:'#55B2FF',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>包邮券</span></li>
                     <li><Icon type="tags" style={{height:'1.406rem',color:'#FF7300',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>打折券</span></li>
                     <li><Icon type="pay-circle-o" style={{height:'1.406rem',color:'#FFD833',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>邦购币</span></li>
                     <li><Icon type="idcard" style={{height:'1.406rem',color:'#FF6700',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>会员卡</span></li>
                     <li><Icon type="schedule" style={{height:'1.406rem',color:'#FFD833',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>签到</span></li>
                     <li><Icon type="customer-service" style={{height:'1.406rem',color:'#55B2FF',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>在线客服</span></li>
                     <li><Icon type="message" style={{height:'1.406rem',color:'#30D8B0',lineHeight:'1.906rem',fontSize:' 0.703rem'}}/><span>意见反馈</span></li>
                  </ul>
                </div>
                <div className="bottom">
                   <CommonNalityFoot color="mine"></CommonNalityFoot>
                </div>
                <LoadingComponent/>

     </div>
     
        )
    }  
}

const mapStateToProps = function(state){
    return {
         status: state.mine.status,
         data: state.mine.response || []
       }
}   

export default connect(mapStateToProps,mineAction)(MineComponent)

 // <Link to="">登录</Link>
 // <Link to="">注册</Link>