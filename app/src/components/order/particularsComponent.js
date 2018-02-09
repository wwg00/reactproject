import React,{Component} from  'react'
import './particulars.scss'
import { ActionSheet, Button , Toast} from 'antd-mobile';


export default class Particulars extends Component{
    constructor(props){
        super(props);
        this.state = {
            address:{}
        }
    }
    successToast(str) {
        Toast.success(str,1);
      }
    componentWillMount(){
        this.props.parent.props.getUserAddress(this.props.item.user_id).then((res)=>{
                console.log(res);
                for(let item in res){
                        if(res[item].state == 1){
                            console.log(res[item]);
                                this.setState({
                                    address:res[item]
                                })
                        }
                }
        })
        
    }

    render(){
         let item = this.props.parent.state.item;
         let time = item.update_at.split('T');
        time[1] =  time[1].slice(0,-5)
         time =   time.join(' ');

         let goods = JSON.parse(item.goods_json);
         console.log(item,time,goods);
         
        return (
            <div id='yp_particulars'>
                    <header className='orderHeader'>
                        <span className=' yp_back iconfont icon-fanhui' onClick={()=>{
                                    console.log(this.props.parent.setState({
                                        pc:false
                                    }));
                        }}></span> <section> <span>订单详情</span>  </section> <span></span>
                    </header>
                    <div id='yp_pc_main'>
                        <ul className='yp_part_state'>
                            <li>
                                <h3><i className='iconfont icon-icon_order'></i> <span>
                                {item.state==0?'等待付款':''}
                                {item.state==1?'等待发货':''}
                                {item.state==2?'等待收货':''}
                                {item.state==3?'等待评价':''}
                                
                                </span></h3>
                                <p className='yp_small'> 包裹数量:<span>1</span> </p>
                                <p className='yp_small'> 下单时间:<span>{time}</span> </p>
                                
                            </li>
                            <li>
                                <div>
                                    <i  className='iconfont icon-04' ></i>
                                    <p><span>收货人:{this.state.address.consignee}</span> <span>{this.state.address.number}</span>  </p>
                                </div>
                                <p className='yp_small'>收货地址:{this.state.address.address}</p>

                            </li>
                        </ul>
                        <dl>
                            <dt>
                                包裹
                            </dt>
                            {goods.map(function(item){
                                    return (                            <dd key={item.id}>
                                        <div>
                                            <img src={item.sImage}/>
                                        </div>
                                        <ul>
                                            <li>
                              
                                            {item.description.slice(0,12)}...
                                            </li>
                                            <li>
                                            <span className='yp_small'> 颜色:{item.option.split(';')[0]}</span> <span>x{item.qty}</span>
                                            </li>
                                            <li>
                                            <span className='yp_small'> 尺码:{item.option.split(';')[1]}</span> <span className='yp_big'>￥{item.nPrice}</span>
                                            </li>
                                        </ul>
                                    </dd>)
                            })}

                    
                        </dl>

                        <ul className='yp_rows'>
                            <li><span>支付方式</span> <span>支付宝</span></li>
                        </ul>
                        
                        <ul className='yp_rows'>
                            <li>
                            <span>配送信息</span> <span>快递</span>
                            </li>
                            <li className='yp_small'>
                            <span>配送时间:工作日,双休日均可送货</span> 
                            </li>
                            
                        </ul>
                        <ul className='yp_rows'>
                            <li>
                            <span>  发票信息</span>
                            </li>
                            <li className='yp_small'>
                                <span>发票抬头:无</span>
                                <span>发票内容:无</span>
                                
                            </li>
                            
                        </ul>
                        <ul className='yp_rows'>
                            <li>
                                <p className='yp_small'>
                                    <span>商品金额</span>
                                    <span>￥{item.total-10}</span>
                                </p>
                                <p>
                                    <span>+运费</span>
                                    <span>￥10.00</span>
                                </p>
                                <p>
                                    <span>-红包</span>
                                    <span>￥00.00</span>
                                </p>
                            </li>
                            <li>
                            
                                    实付金额:   <span> ￥{item.total}  </span>
                            
                            </li>
                            
                        </ul>
                        {item.state==0?
                        <div id='yp_fukua'>
                            <button  onClick={()=>{
                                    this.props.parent.props.deleteOrder(this.props.item.order_id).then(()=>{
                                        this.props.parent.props.getUserOrder(this.props.item.user_id);
                                        this.successToast('删除订单成功')
                                        this.props.parent.setState({
                                            pc:false
                                        })


                                    })    


                            }}>取消订单</button>
                            <button  onClick={()=>{
                                    
                                   this.props.parent.props.updateOrderState(this.props.item.order_id,1).then(()=>{
                              
                                    this.props.parent.props.getUserOrder(this.props.item.user_id);
                                    this.successToast('支付成功')
                                    this.props.parent.setState({
                                        pc:false
                                    })
                                   })
                                    console.log();
                            }}>去付款</button>
                            
                        </div>
                        :''}
                    
                    
                    </div>
                
            </div>

        )
    }

}