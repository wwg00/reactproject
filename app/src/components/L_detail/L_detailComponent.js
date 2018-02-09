
import $ from 'jquery';
import './L_detail.scss';
import { Icon,} from 'antd';
import React from 'react'
import { Link } from 'react-router';
import {connect} from 'react-redux';
import * as L_detailAction from './L_detailAction.js';
import { Button, Tabs, WhiteSpace,WingBlank, Carousel  } from 'antd-mobile';
import L_addCartComponent from '../L_addCart/L_addCartComponent.js'
import L_detailMessageComponent from '../L_detailMessage/L_detailMessageComponent.js'
import L_shareComponent from '../L_share/L_shareComponent.js'

class L_detailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: 'none',
            showmsg: 'none',
            showshare: 'none',
            imgHeight: 176,
            slideIndex: 0,
            imgUrl:[],
            state:this.props.data

        };
    }

    componentWillMount(){
     
    }

    componentDidMount(){

      var goodsId = this.props.location.query.id;
      this.props.getDtail(goodsId);

      var user_id = localStorage.userId;
      // console.log(localStorage.userId );
      this.props.iu(user_id,goodsId);
      
      
     
     

    }
    fabulous(){
      var fabulous = document.getElementsByClassName('fabulous_l')[0];
      fabulous.style.color="#c00";
      var oInfo = document.getElementsByClassName('infodd')[0];
      oInfo.style.transform = "scale(1)";
      oInfo.style.opacity = 0.9;

      setTimeout(function(){
         oInfo.style.transform = "scale(0)";
         oInfo.style.opacity = 0;
      },1000);
    }
    
    show(){
      this.setState({show:'block'});
    }  

    showmsg(){
      this.setState({showmsg:'block'});
    }  

    closeCart(){
      this.setState({show:'none'});
    }
    closeMsg(){
          this.setState({showmsg:'none'});
    } 
    showshare(){
          this.setState({showshare:'block'});
    }
    closeshare(){
          this.setState({showshare:'none'});
    }
    cancel(){
          this.setState({showshare:'none'});
    }
    goback(){
        this.props.router.goBack();
    }
    render(){

        if(! this.props.data){
            return null
        }
       const tabs = [
           { title: '常见问题' },
           { title: '商品详情' },
           { title: '商品评论' },
           
       ];
        var show= this.state.show?"block":"none";
        var style = {
           display:show,
           fontSize: 85
        }
        return (

            <div id="container_L">
              
                <nav id="nav_L">
                   <Icon style={{fontSize:60}} className="i1"  onClick={this.goback.bind(this)}  type="left-circle-o" />
                   <Link to="/"><Icon style={{fontSize:60}} className="i2" type="home" /></Link>
                   <Link to="/cart"><Icon style={{fontSize:60}} className="i2" type="shopping-cart" /></Link>
                </nav>
                
                <main id="main_L" >
                    <header id="header_L"></header>

                    <div className="carousel" style={{height:730}}>
                        <WingBlank>
                           
                            <Carousel

                                dots={true}
                                autoplay={false}
                                infinite
                                selectedIndex={0}
                                autoplayInterval={3000}>

                                { this.props.data.map(val => (
                                    <a
                                        key={val}
                                      
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={val.bImage}
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>



                    <div className="main_L_content" >
                       {
                           this.props.data.map( item => {
                               return (
                                   <ul key={item.id}>
                                       
                                       <li>
                                         
                                           <div className="main_L_description">
                                             <h4>{item.description}</h4>
                                             <h3><span>{'￥'+item.nPrice}</span><span>吊牌价:&nbp<del>{'￥'+item.oPrice}</del></span><span>+vip加分</span></h3>
                                            </div>
                                       </li>
                                   </ul>
                               )
                           })
                       }
                    </div>
                    <div className = "main_L_B_content">
                      <p className="list1">
                        <span><Icon className="i1" type="check-circle-o" /> 14天退换</span>
                        <span><Icon className="i1" type="check-circle-o" /> 邦购自营</span>
                        <span><Icon className="i1" type="check-circle-o" /> 不可用红包</span>
                        <span><Icon className="i1" style={{color:'#ccc !important'}} onClick={this.showmsg.bind(this)} type="right" /></span>
                      </p>
                      <p className="list2 mt">
                        <span> 销量<em>4636</em></span>
                        <span> 评论<em>7</em></span>
                        <span> 积分<em>444</em></span>
                      </p>
                      <p className="list3 mt">
                        <span>选择尺寸&nbsp;&nbsp;颜色</span>
                        <span><Icon className="i1" onClick={this.show.bind(this)}  type="right"/></span>
                      </p>
                      <div className="list4 mt">
                          <div className="L_commemnt_tab">
                                 <WhiteSpace />
                                 <Tabs tabs={tabs} initialPage={2} animated={true} useOnPan={false}>
                                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '380px', backgroundColor: '#fff' }}>
                                       <div>
                                        <div>收货与配送</div>
                                        <div>全年无休,假日能发货,邦购为你提供商品:收到...</div>
                                      </div>
                                   </div>
                                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '380px', backgroundColor: '#fff' }}>
                                      <div>
                                        <div>
                                            <p>品牌信息</p>
                                            <p>“美特斯·邦威”是美特斯邦威集团自主创立的本土休闲服品牌。美特斯邦威集团公司于1995年创建于中国浙江省温州市，主要研发、生产、销售美特斯·邦威品牌休闲系列服饰。</p>
                                        </div>
                                        <div className="L_more"><Link to="goodsDetail" style={{ color:'#666'}}>查看更多</Link ></div>
                                      </div>
                                   </div>
                                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '380px', backgroundColor: '#fff' }}>
                                       
                                      <div className="comment_content" id="L_comment_content">
                                            <div className="L_comment_content_title">
                                              <span className = "fl person"><Icon type="qq" /></span>
                                              <span className = "fl nickname">匿名评论</span>
                                              <ul className = "fr L_commemnt_start" >
                                                <li><Icon type="star" /></li>
                                                <li><Icon type="star" /></li>
                                                <li><Icon type="star" /></li>
                                                <li><Icon type="star" /></li>
                                                <li><Icon type="star" /></li>
                                              </ul>
                                            </div>
                                            <div style={{ display: 'flex'}}>默认好评</div>
                                            <div style={{ display: 'flex'}}><a>2018-1-1 12:00:00</a><a>颜色:黑色</a><a>尺寸:L</a></div>
                                             <div className="L_more" style={{ borderTop: '1px solid #ccc '}}><Link to="comment">查看更多</Link ></div>
                                      </div>
                                   </div>
                                 </Tabs>
                                 <WhiteSpace />
                          </div>
                      </div>
                    

                    </div>
                </main>
                <footer id="footer_L">
                  <span><Icon style={{fontSize:40}} className="i1" type="customer-service" />客服</span>
                  <span><Icon style={{fontSize:40}} className="i1" onClick={this.showshare.bind(this)} type="share-alt" />分享</span>
                  <span className="fabulous" onClick={this.fabulous.bind(this)}><Icon  style={{fontSize:40}} className="i1 fabulous_l" type="like-o" />点赞 <i className="infodd" style={{transform: 'scale(0)', opacity: 0,}}>点赞成功</i></span>
                  <span onClick={this.show.bind(this)}>加入购物袋</span>
                </footer>

                <div style={{display:this.state.show}}>
                    <div className=" L_cartBg"  onClick={this.closeCart.bind(this)}></div>
                    < L_addCartComponent  dataset={this.props.data}></L_addCartComponent>
                </div> 

                <div style={{display:this.state.showmsg}}>
                     <div className=" L_cartBg"  onClick={this.closeMsg.bind(this)}></div>
                    < L_detailMessageComponent  ></L_detailMessageComponent>
                </div> 
                <div style={{display:this.state.showshare}}>
                     <div className=" L_cartBg"  onClick={this.closeshare.bind(this)}></div>
                    < L_shareComponent  ></L_shareComponent>
                     <Button className="L_cancel" onClick={this.cancel.bind(this)} >取消  </Button>
              
                </div>
              
            </div>
        )
    }

}

const mapStateToProps = function(state){
    // console.log(state.L_detail.response)
    return {
         status: state.L_detail.status,
         data: state.L_detail.response || []
    }
}   

export default connect(mapStateToProps,L_detailAction)(L_detailComponent)