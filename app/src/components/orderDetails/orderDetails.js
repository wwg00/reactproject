import React,{Component}  from 'react'
import './orderDetails.scss'
import { List, Switch } from 'antd-mobile';
import {hashHistory} from 'react-router'
export default class orderDetails  extends Component {
        constructor(props){
                super(props)
             this._parent =    this.props.data.props;
             this.state ={
                 methods:'1',
                 state:'0'
             }
        }

        createOrder(_qty){

                let userID =  this.props.data.props.userID;
                let qty = _qty;
                let arr = [];
                let _arr = [];
             for(let item in this.props.data.props.selected){
                if(this.props.data.props.selected[item] && item !='all'){
                    for(   let  _item in this.props.data.props.cartList){
                        if( this.props.data.props.cartList[_item]['id'] == item){
                                  arr.push(this.props.data.props.cartList[_item]);      
                                  _arr.push(item);
                        }
                    }
                }                
             }   
            let  goods_json = JSON.stringify(arr);
            this.props.data.props.createOrder(userID,goods_json,qty,this.state.methods,this.state.state).then(function(){

                      for( let item in _arr){
                        this.props.data.props.deleteCartGoods(_arr[item]).then(()=>{

                            this.props.data.props.getCartListData(userID);

                        });
                      }
                      this.props.data.props.changePages(0)
                      hashHistory.push('order')
                      


            }.bind(this))
        

        }


        render(){
            let _change  = []
            if(this.props.show===true){
                _change=[ 'animated','bounceInRight','show'];
            }else if(this.props.show===false){
                _change=[ 'animated','bounceOutRight','show'];
                
            }

            let number = 0;
            let qty = 0;
            let oldqty = 0;
            this.props.data.props
             for(let item in this.props.data.props.selected){
                       if(this.props.data.props.selected[item] && item !='all'){
                            for(   let  _item in this.props.data.props.cartList){
                                if( this.props.data.props.cartList[_item]['id'] == item){
                                     qty+=   this.props.data.props.cartList[_item].nPrice * this.props.data.props.cartList[_item].qty;
                                     oldqty+=   this.props.data.props.cartList[_item].oPrice * this.props.data.props.cartList[_item].qty;
                                     number+= this.props.data.props.cartList[_item].qty;
                                }
                            }
                           
                              
                           
                       }
             }
             let address = {};
             for (let item in this.props.data.props.UserAddress){
                if(this.props.data.props.UserAddress[item].state === 1){
                    address = this.props.data.props.UserAddress[item];
                }
             }
         
            return (
                
                <div id='yp_orderDetails' className={_change.join('  ')}   >
                        <div className='yp_od_header'>
                            <span onClick={()=>{   this.props.data.props.changePages()  }}>取消</span> <section>确认订单</section> <span></span>
                        </div>



      
                        <div className='yp_od_body'>
                           <div className='yp_body_address' onClick={()=>{
                                hashHistory.push('site')
                           }}>
                                <h2> <span>{address?address.consignee:''}  </span> <span>{address?address.number:''} </span> </h2>
                                <div> <i className='iconfont icon-qianjin1'></i></div>
                                <p> {address?address.address:''}   </p>
                                
                           </div>
                           <ul className='yp_body_method'>
                             <li><span>支付方式</span> <span> 支付宝 <i className='iconfont icon-qianjin1'></i></span></li>
                             <li >
                                    <div>
                                        <span>配送方式</span>
                                        <span>邦购$10.00</span>
                                    </div> 
                                    <div>
                                        <span>快递</span>
                                        <span>$10.00</span>
                                        
                                    </div> 
                            </li>
                             
                            <li><span>共{number}件商品</span> <span> <span> {(()=>{ console.log(  this.props.data.props)  })()} ￥{qty.toFixed(2)}</span> <i className='iconfont icon-qianjin1'></i></span></li>
                             
                           </ul>

                           <ul className='yp_body_discount'>
                             <li><span>红包</span> <span>  0 <i className='iconfont icon-qianjin1'></i></span></li>
                             <li><span>包邮</span> <span>  0 <i className='iconfont icon-qianjin1'></i></span></li>
                             <li><span>无可用积分</span> <span>                           
                             <Switch  checked={false} onClick={(checked) => {  console.log(this)}}/>
                                 
                                                                   </span></li>
                             <li><span>邦购币 <span>(可用:$0.00)</span></span> <span>
                             <Switch  checked={false} onClick={(checked) => {  console.log(this)}}/>
                                 
                                 </span></li>
                             <li><span>发票</span> <span>
                             <Switch  checked={false} onClick={(checked) => {  console.log(this)}}/>   
                                 
                                  </span></li>
                             

                             
                           </ul>
                       </div> 
                        <div className='yp_od_footer'>
                            <div>
                                <h4>
                                    订单合计:<span>￥{(qty+10).toFixed(2)}</span>
                                </h4>
                                <span>
                                为您节省:￥{oldqty.toFixed(2)-qty.toFixed(2)}
                                    
                                </span>
                                
                            </div>
                            <div>
                                <button onClick={this.createOrder.bind(this,qty+10)}>提交订单</button>
                            </div>
                        </div>
                </div>
            )
        }
}