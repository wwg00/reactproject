import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from './cartAction'
import './cart.scss'
import OrderDetails from '../orderDetails/orderDetails' 
import { Toast } from 'antd-mobile';
import {hashHistory} from 'react-router'
import CommonFoot from '../commonalityFoot/footComponent'

class  CartHender extends Component{
        constructor(props){
                super(props);
                this.state =  {
                    editClass:'',
                    text:'编辑'
                }
                this.editChangeClass =  this.editChangeClass.bind(this)
                this.parent =  this.props.data;
        }
        editChangeClass(){
         this.parent.props.setChangeEdit() ;
         this.parent.props.selectGoods(undefined,true) ;
         
            this.setState(
                {
                    editClass:this.parent.props.changeEdit==""?'focus':'',
                    text:this.parent.props.changeEdit?'编辑':'完成',
                    
                }
            )
          
        }
        render(){
            return (
                    <header>
                        {this.props.headType? <i className='iconfont icon-fanhui' onClick={()=>{
                                hashHistory.goBack()
                        }}> </i>:'' }
                        
                                 <section>购物袋</section>

                       {this.props.headType?  <button onClick={this.editChangeClass} className={this.state.editClass} >{this.state.text}</button>  :'' }         
                        
                   </header>
                
            )
      }
}
function  CartFoot(props){
    return (
            <footer>
   <CommonFoot color="cart"></CommonFoot>
            </footer>      
    )
}

function CartVacant(props){
    const CartVacantClass = [
        'iconfont',
        'icon-12gouwudai'
    ]
    if(props.btnType){
        CartVacantClass.push('focus')
    }

    return (
           <div id='yp_cartVacant'>
                    <i  className={CartVacantClass.join(' ')}  ></i>
                    <h3>哎呀!购物车还是空的</h3>
                    <p>{props.btnType?'赶快去挑点心仪的宝贝吧':'登陆后关联电脑与手机购物袋的商品哦!'}</p>
                    {
                        (function(){
                            if(props.btnType){
                                return (
                                    <button id='yp_cartVacant_goplay' onClick={()=>{
                                        hashHistory.push('')
                                    }}>随便逛逛</button>                   
                                )
                            }else{
                                return (
                                    <button id='yp_cartVacant_login' onClick={()=>{
                                        hashHistory.push('login')
                                    }}>登陆</button> 
                                )
                            }
                        })()
                    }
     
                         
           </div>
    )
} 


class CartList extends Component{

        constructor(props){
            super(props);
            this.GoodsItem =  this.GoodsItem.bind(this)
            this.CountPanel=  this.CountPanel.bind(this)
            this._parent = props.data;
            
            // this.setState(this._parent.state,{})
      
        }

          
       Checkbox(props){
          
         
            let _class = props.focus?['iconfont','icon-xuanzhong','focus']:[];
          
           return (<div id='cartCheckbox' className={_class.join(' ')}  onClick={props.parent.props.selectGoods.bind(this,props._id,false)}></div>)
       }
        setQty(id,goods_id,qty){
           let    user_id =  this.props.data.props.userID ;
         
           this._parent.props.setCartGoodsQty(id,user_id,goods_id,qty<1?1:qty).then(function(res){

                 this._parent.props.getCartListData(user_id);
           }.bind(this));
        }
 
        GoodsItem(props){
            return (
                    <div className='yp_GoodsItem'>
                        <this.Checkbox _id={props._id}  parent={props.parent} focus={props.focus} ></this.Checkbox>
                        <div className='yp_goods'>
                            <div className='yp_goods_img'>
                                    <img src={props.data.sImage} />
                            </div>
                            <ul>
                                <li className='yp_tandn'>
                                    {props.status?<div id='yq_qtyip'>
                                        <button className='sub' onClick={this.setQty.bind(this,props.data.id,props.data.goods_id,props.data.qty-1)} >-</button>
                                        <input type='number'disabled="disabled" onChange={function(){}} value={props.data.qty}/>
                                        <button className='add' onClick={this.setQty.bind(this,props.data.id,props.data.goods_id,props.data.qty+1)} >+</button>
                                    </div>:<p>{props.data.description}</p>} 
                                </li>
                                <li className='yp_op'>
                                    {props.data.option.split(';').join('    ')}
                                    </li>
                                    <li className='yp_price'>
                                    
                                        <span className='yp_nprice'>￥{props.data.nPrice}</span>
                                        <del>￥{props.data.oPrice}</del>
                                  
                                        {props.status?'':   <div className='yp_qty'>
                                            x{props.data.qty}
                                        </div> }
                                    </li>
                            </ul>
                            {props.status?'': <div className='yp_bz'>
                                <i className='iconfont icon-14'></i> 
                                <span>改商品支持14天退换货 </span>
                            </div>}
                           
                        </div>



                    </div>               
            )
        }
        CountPanel(props){

            let constPrice = 0
            let oldPrice  = 0;
            let qty = 0;
            let  cartList = props.parent.props.cartList;
            let  selected = props.parent.props.selected;
            let  changeEdit=  props.parent.props.changeEdit;
            for(let item  in selected){
                    if(item!= 'all' &&  selected[item] ){
          
                            for(const _item in cartList){
                                if(cartList[_item].id == item){
                                    constPrice += cartList[_item]['nPrice'] *  cartList[_item]['qty'];
                                    oldPrice += cartList[_item]['oPrice'] *   cartList[_item]['qty'];
                                    qty += cartList[_item]['qty'];
                                    
                                }
                            }
        
                          
                    }
            }
            return (
              

                <div id='CountPanel'>
                            <div className='yp_ct_l'>
                            <this.Checkbox parent={props.parent}   focus={props.parent.props.selected['all']}></this.Checkbox> <span>全选</span>
                            </div>
                            {changeEdit?<div className='yp_ct_edit'>
                             {/**<button className='yp_ct_like' >点赞</button>**/}
                                    <button className='yp_ct_del' onClick={(e)=>{
                                                 for(let item  in selected){
                                                    
                                                        if(item!='all' && selected[item]){
                                                            props.parent.props.deleteCartGoods(item).then(function(res){
                                                                props.parent.props.getCartListData(props.parent.props.userID);
                                                            })   
                                                        }
                                                 }
                                                   
                                        }
                                        }>删除</button>
                                    
                               </div>:
                             <div className='yp_ct_c'>
                                <p>合计:￥{constPrice.toFixed(2)}</p>
                                <p>合计:￥{constPrice.toFixed(2)} 优惠 {oldPrice.toFixed(2)-constPrice.toFixed(2)}</p>                                
                            </div>}
                            {changeEdit?<div></div>:          
                             <div className='yp_ct_r'>
                                    <button onClick={()=>{
                                        
                                         let key = false;
                                         for(let item  in this._parent.props.selected ){
                                                if(item!='all'){
                                            
                                                    if(this._parent.props.selected[item]){
                                                        key = true;
                                                        break;
                                                    }
                                                }
                                              
                                         }
                                         if(!key){
                                                 Toast.info('请选择至少一种商品', 1.5);
                                                 return false;
                                            
                                         }
                                         this._parent.props.getUserAddress(this._parent.props.userID).then((res)=>{
                                             if(res.length === 0){
                                                hashHistory.push('site')
                                             }else{
                                                this._parent.props.changePages()
                                                this._parent.props.orderDetailsShow;
                                             }
                                         })

                                      }}>
                              
                                去结算({qty})
                              </button>
                      
                            </div>}
                  

                </div>
                
            )
        }
        render(){
            
            return (
               
                <div id='yp_cartList'>
                    <header>
                        
                            <this.Checkbox parent={this._parent}  focus={this._parent.props.selected['all']} ></this.Checkbox>
                            <h3>邦购</h3>
                            <span>全场199元包邮</span>
                    </header>
                    {
                        (this._parent.props.cartList?this._parent.props.cartList:[]).map(function(item){
                         
                            return (   <this.GoodsItem status={this._parent.props.changeEdit} parent={this._parent} data={item} key={item.id} _id={item.id}  focus={this._parent.props.selected[item.id]} >
                                </this.GoodsItem>)
                           
                        }.bind(this))
                    }
    
                    <this.CountPanel data={this._data} parent={this._parent} >
                    </this.CountPanel>
                </div>
            )
        }
}
class cartComponent extends Component{
    constructor(props){
        super(props);
        this.state =  {
            status:'empty',
            btnType:false,
            headerBtn:false,
       
        }
   }
   componentWillMount(){
    if(!localStorage.userId){
            this.setState({
                btnType:false
            })
       }else{
           this.props.getCartListData(localStorage.userId).then((res)=>{
         
                if(res.length>0){
                 
                    this.setState({
                        status:'cartList',
                        headerBtn:true
                    })
                    console.log(this.state.status);
                }else{
                    this.setState({
                        status:'empty',
                        btnType:true,
                        

                    })
                }
           })
       }
   
      


      
    //    console.log(this,'123213');
   }

    render(){
        
        return (

            <main id='yp_cart'>
                <OrderDetails  data={this} show={this.props.orderDetailsShow} ></OrderDetails> 
                <CartHender data={this}  headType={this.state.headerBtn}>
               </CartHender>
                <section>
                    
                   {this.state.status=='empty'?<CartVacant btnType={this.state.btnType}>   </CartVacant>:''} 
                   {this.state.status=='cartList'?<CartList data={this} >   </CartList>:''} 
                 
                </section>
                <CartFoot >
           
                        
                </CartFoot>    
            </main>
    
   
        )
    }
}

let mapStateToProps = (state) => {
    return {
          _number: 0,
          cartList:state.cart.cartList,
          selected:state.cart.selected?state.cart.selected:[],
          changeEdit:state.cart.changeEdit?state.cart.changeEdit:false,
          userID:state.cart.userID?state.cart.userID:0,
          orderDetailsShow:state.cart.orderDetailsShow,
          UserAddress:state.cart.UserAddress?state.cart.UserAddress:[]
          
          
    }
}

export  default 
   connect(mapStateToProps, actions)(cartComponent)

  


