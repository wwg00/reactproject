import React, {Component} from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'


import * as actions from './orderAction'
import * as cartActions from '../cart/cartAction'

import './order.scss'


import 'antd-mobile/dist/antd-mobile.css'; 

import { Tabs, WhiteSpace } from 'antd-mobile';
import { ActionSheet, Button , Toast} from 'antd-mobile';

import Particulars from './particularsComponent'

import Header from 'rmc-calendar/lib/calendar/Header';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


const OrderHeader = (props) => {

      return (
          <header className='orderHeader'>
             <span className=' yp_back iconfont icon-fanhui' onClick={()=>{
                 hashHistory.goBack()
             }}></span> <section> <span>三个月订单</span>   <i className='iconfont icon-xiala'></i> </section> <span></span>
          </header>
      )

}



class OrderList extends Component {
    constructor(props){
            super(props);
            this.state = {
                clicked: 'none',
     
              };
    }
     successToast() {
        Toast.success('支付成功!',1);
      }
     failToast() {
        Toast.fail('暂时不支持微信支付', 1);
      }
    showActionSheet(){
        const BUTTONS = ['支付宝', '微信支付','取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
        //   destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: '选择你的支付方式',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
            if(BUTTONS[buttonIndex]==='支付宝'){
                this.successToast()
                 this.props.data.props.updateOrderState(this.props.item.order_id,1).then(()=>{
                    console.log(this.props.data.props.getUserOrder(this.props.item.user_id))

                 })
                    
              
            }else if(BUTTONS[buttonIndex]==='微信支付'){
                this.failToast()

            }
       
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });

      
      }


   render(){
      let goods_json = JSON.parse(this.props.item.goods_json);
      let num = 0; 
      for(let _item in goods_json){
           num+= goods_json[_item].qty;
      }
       return (
          <div className='yp_orderList'>
              <div className='yp_order_header'>
                  <span> 订单编号:{this.props.item.orderNum}</span>
                  <span>
                  {this.props.item.state == 0 ?  '待付款':'' }
                  {this.props.item.state == 1 ?  '待发货':'' }
                  {this.props.item.state == 2 ?  '待收货':'' }
                  {this.props.item.state == 3 ?  '待评价':'' }
                  
                      
                  </span>
              </div>
              <div className='yp_order_main'>
                  <div className='yp_main_l'>
                    <img src={goods_json[0].sImage}  />
                  </div>
                  <div  className='yp_main_r' onClick={()=>{
                             this.props.data.setState({
                                 pc:!this.props.data.state.pc,
                                 item:this.props.item
                            });
                            

                  }}>
                    <h4><span>男童时尚树枝衬衫 {goods_json[0].description}</span> <span>￥{goods_json[0].nPrice}</span> </h4>
                    <p> <span>数量:{goods_json[0].qty}</span> </p>
                    <p>  <span>颜色:{goods_json[0].option.split(';')[0]}</span> <span>尺码:{goods_json[0].option.split(';')[1]}</span></p>
                  </div>
                  
              </div>
              <div className='yp_order_footer'>
                  <span>共{num}件商品</span>
                  <span>实付:￥{this.props.item.total.toFixed(2)}</span>
                  <div> 
                      {this.props.item.state == 0 ?  <button  onClick={this.showActionSheet.bind(this)}>去付款 </button>:'' }
                      {this.props.item.state == 2 ?  <button  >确认收货 </button>:'' }
                      {this.props.item.state == 3 ?  <button  >去评价</button>:'' }
                      
                    
                  </div>
              </div>
          </div>
       )
    }

}

const tabs = [
  { title: '全部' },
  { title: '待付款' },
  { title: '待发货' },
  { title: '待收货' },
  { title: '待评价' },
  

];

const TabsContent = { flex:'1' ,flexDirection:'column', alignItems: 'center', justifyContent: 'left', backgroundColor: '#f1f1f1',  }
const TabExample = (props) => (
  <div id='yp_tab_main'>
    <WhiteSpace />
    <div className='yp_tabs_main' >
      <Tabs tabs={tabs}
        initalPage={'t2'}
      >
        <div className='yp_content_root' style={TabsContent}>
        {props.data.props.userOrder.map(function(item){
                return <OrderList item={item} data={props.data} key={item.serial}></OrderList >
        })}
            {props.data.props.userOrder.length===0?
                <div id='yp_order_empty'>
                        <i className='iconfont icon-icon_order'></i>
                        <h3>你还没有相关订单</h3>
                        <p>可以去看看有哪些买的</p>
                        <button onClick={()=>{
                            hashHistory.push('')
                        }}>随便逛逛</button>

                </div>:''}
           
           
           
           

        </div>
        <div style={TabsContent}>
        {props.data.props.userOrder.map(function(item){
                return item.state==0?<OrderList item={item} data={props.data} key={item.serial}></OrderList >:''
        })}
        {((num)=>{
            let count = 0;
            for(let key in props.data.props.userOrder){
               let item =  props.data.props.userOrder
                  if(item[key].state==num){
                        count++
                  }
            }
            if(count==0){
                return (   <div id='yp_order_empty'>
                <i className='iconfont icon-icon_order'></i>
                <h3>你还没有相关订单</h3>
                <p>可以去看看有哪些买的</p>
                <button onClick={()=>{
                    hashHistory.push('')
                }}>随便逛逛</button>

          </div>)
            }

        })(0)}
        </div>
        <div style={TabsContent}>
        {props.data.props.userOrder.map(function(item){
                return item.state==1?<OrderList item={item}  data={props.data} key={item.serial}></OrderList >:''
        })}
        {((num)=>{
            let count = 0;
            for(let key in props.data.props.userOrder){
               let item =  props.data.props.userOrder
                  if(item[key].state==num){
                        count++
                  }
            }
            if(count==0){
                return (   <div id='yp_order_empty'>
                <i className='iconfont icon-icon_order'></i>
                <h3>你还没有相关订单</h3>
                <p>可以去看看有哪些买的</p>
                <button onClick={()=>{
                    hashHistory.push('')
                }}>随便逛逛</button>

          </div>)
            }

        })(1)}
        </div>
        <div style={TabsContent}>
        {props.data.props.userOrder.map(function(item){
                return item.state==2?<OrderList item={item} data={props.data} key={item.serial}></OrderList >:''
        })}
       {((num)=>{
            let count = 0;
            for(let key in props.data.props.userOrder){
               let item =  props.data.props.userOrder
                  if(item[key].state==num){
                        count++
                  }
            }
            if(count==0){
                return (   <div id='yp_order_empty'>
                <i className='iconfont icon-icon_order'></i>
                <h3>你还没有相关订单</h3>
                <p>可以去看看有哪些买的</p>
                <button onClick={()=>{
                    hashHistory.push('')
                }}>随便逛逛</button>

          </div>)
            }

        })(2)}
        </div>
        <div style={TabsContent}>
        {props.data.props.userOrder.map(function(item){
                return item.state==3?<OrderList item={item}  data={props.data} key={item.serial}></OrderList >:''
        })}
       {((num)=>{
            let count = 0;
            for(let key in props.data.props.userOrder){
               let item =  props.data.props.userOrder
                  if(item[key].state==num){
                        count++
                  }
            }
            if(count==0){
                return (   <div id='yp_order_empty'>
                <i className='iconfont icon-icon_order'></i>
                <h3>你还没有相关订单</h3>
                <p>可以去看看有哪些买的</p>
                <button onClick={()=>{
                    hashHistory.push('')
                }}>随便逛逛</button>

          </div>)
            }

        })(3)}        
        </div>
      </Tabs>
    </div>
  </div>
);







class orderComponent extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state =  {
            pc:false,
            item:{}
        }
   }
   componentWillMount(){
     if(!localStorage.userId){
      return  hashHistory.push('login')
     }
 
    
     this.props.getUserOrder(localStorage.userId);
  }

    render(){
        return    (
            <main id='yp_order'>
                {!this.state.pc?<div>
                    <OrderHeader></OrderHeader>
                <TabExample data={this}></TabExample>

                </div>:<div>

                                       
                <Particulars parent={this} item={this.state.item}></Particulars>

                </div>}

 
               
            </main>
        ) 
    }
}



let mapStateToProps = (state) => {
    return {
        userOrder:state.order.userOrder?state.order.userOrder:[],

    }
}

export default connect(mapStateToProps, {  
     ...actions,
     ...cartActions   
    })(orderComponent);
