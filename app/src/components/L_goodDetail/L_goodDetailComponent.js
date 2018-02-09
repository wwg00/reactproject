
import $ from 'jquery';
import { Icon,} from 'antd';
import React from 'react'
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Button, Tabs, WhiteSpace  } from 'antd-mobile';
import yfImg from '../../assets/img/yf.jpg'
import cuImg from '../../assets/img/cu.jpg'
import './L_goodDetail.scss';
import * as L_goodDetailAction from './L_goodDetailAction.js'
import L_addCartComponent from '../L_addCart/L_addCartComponent.js'
import L_shareComponent from '../L_share/L_shareComponent.js'

class L_goodDetailComponent extends React.Component{
      constructor(props){
          super(props);
          this.state = {
              id:'',
              showCart: 'none',
              state:this.props.data

          };
      }
      goback(){
          this.props.router.goBack();
      }
      showCart(){
        // console.log(666)
        this.setState({showCart:'block'});
      }  
      closeCart(){
        
        this.setState({showCart:'none'});
      }
      render(){
          return (
              <div id="container_L_b">
                  <nav id="nav_L_b">
                     <Icon style={{fontSize:60}} className="i1"  onClick={this.goback.bind(this)} type="left-circle-o" />
                     <Link to="/home"><Icon style={{fontSize:60}} className="i2" type="home" /></Link>
                     <Link to="/cart"><Icon style={{fontSize:60}} className="i2" type="shopping-cart" /></Link>
                  </nav>
                  
                  <main id="main_L_b" >
                      <header id="header_L_b"></header>
                      <div className="main_L_content" style={{height:962}}>
                         {
                             this.props.data.map( function(item,i){
                                 return (
                                  <div className="goodContainer" key="i">
                                     <div >
                                         <p><img src={item.bImage} /></p>
                                         <div className="main_L_description">
                                           <h4>{item.description}</h4>
                                          </div>  
                                          <p><img src={item.bImage} /></p>
                                          <div className="main_L_description">
                                             <h4>{item.description}</h4>
                                          </div>
                                         <p><img src={yfImg} /></p>
                                         <p><img src={cuImg} /></p>  
                                     </div>  
                                    </div>

                                 )
                             })
                         }
                      </div>
                     
                  </main>
                  
                  <footer id="footer_L_B">
                    <span><Icon style={{fontSize:40}} className="i1" type="customer-service" />客服</span>
                    <span><Icon style={{fontSize:40}} className="i1"  type="share-alt" />分享</span>
                    <span className="fabulous"><Icon  style={{fontSize:40}} className="i1 fabulous_l" type="like-o" />点赞 <i className="infodd" style={{transform: 'scale(0)', opacity: 0,}}>点赞成功</i></span>
                    <span onClick={this.showCart.bind(this)}>加入购物袋</span>
                  </footer>

                 <div style={{display:this.state.showCart}}>
                     <div className=" L_cartBg"  onClick={this.closeCart.bind(this)}></div>
                     < L_addCartComponent  dataset={this.props.data}></L_addCartComponent>
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

export default connect(mapStateToProps,L_goodDetailAction)(L_goodDetailComponent)