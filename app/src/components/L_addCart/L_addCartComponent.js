

import React from 'react'
import { Link,hashHistory } from 'react-router';
import {connect} from 'react-redux';
import * as L_addCartAction from './L_addCartAction.js';
import $ from 'jquery';
import './L_addCart.scss';
import { Icon,} from 'antd';
import { Button, Tabs, WhiteSpace,Tag  } from 'antd-mobile';
//import { StickyContainer, Sticky } from 'react-sticky';


class L_addCartComponent extends React.Component{

  componentDidMount(){
     var selected_l_1=document.getElementById('selected_l_1');
     // console.log(selected_l_1);
  }
  select_a(e){

   var selected_l_1=document.getElementById('selected_l_1');
   var spans=selected_l_1.getElementsByTagName('span');
   var size = e.target.innerText;
   var color_size1 = document.getElementById('color_size1');
   color_size1.innerHTML = e.target.innerText;
   spans[0].className  = 'aa';
  
   for (var j=0;j<spans.length;j++ )
   {
     spans[j].className  = 'aa';
     spans[j].style.color  = '#666';
   }
    if(e.target.nodeName == "SPAN") {
      e.target.className  = 'on';
      e.target.style.color  = '#c00';

    }
  }  
  select_b(e){

   var selected_l=document.getElementById('selected_l');
   var spans=selected_l.getElementsByTagName('span');
   var spans=selected_l.getElementsByTagName('span');
   var size = e.target.innerText;
   var color_size2 = document.getElementById('color_size2');
   color_size2.innerHTML = e.target.innerText;
   spans[0].className  = 'aa';

   for (var j=0;j<spans.length;j++ )
   {
     spans[j].className  = 'aa';
     spans[j].style.color  = '#666';
   }
    if(e.target.nodeName == "SPAN") {
      e.target.className  = 'on';
      e.target.style.color  = '#c00';

    }
  }
  toCart(e){

    var toCart = document.getElementsByClassName('toCart')[0];
    var id = toCart.id;
    var color = document.getElementById('color_size2').innerHTML;
    var size = document.getElementById('color_size1').innerHTML;
    var option = color +';' + size;
      var user_id = localStorage.userId;
    // console.log(id,option)
    this.props.insertCart(id,option,user_id);
    hashHistory.push('/cart');
 
  }
  render(){
     var simg = {
        height:'140px',
        width:'130px',
        background:'#c00'
      }
      function onChange(selected) {
        // console.log(`tag selected: ${selected}`);
      }
      // console.log(this.props.dataset)
      return (

        <div id="L_ShowCart" >
          {
             this.props.dataset.map( item => {
                  return (
                                          
                       <div className="contents" key={item.id} >

                           <ul>
                              <li className="addimg"> <img src={item.sImage} style={simg} /></li>
                              <li className="fr">
                                  <p>{'￥'+item.nPrice}</p>
                                  <p>{item.storage}</p>
                                  <p>已选择 : <span id="color_size1">{item.size.split(';')[0]}</span><span id="color_size2">{item.color.split(';')[0]}</span></p>
                              </li>
                          </ul>
                          <div className="size" >
                            <div className="mag">尺寸</div>
                            <div id="selected_l_1"  onClick ={this.select_a.bind(this)}>
                              {
                                item.size.split(";").map(function(i,idx) {
                                    return (
                                      <span key={idx} className={idx} >{i}</span>
                                      )
                                })
                              }
                            </div>
                          </div>

                          <div className="color" >
                            <div className="mag">颜色</div>
                            <div id="selected_l"  onClick ={this.select_b.bind(this)}>
                              {
                                item.color.split(";").map(function(j,id) {
                                    return (
                                      <span key={id}>{j}</span>
                                      )
                                })
                              }
                            </div>
                          </div>
                          <Button type="warning" className="toCart" onClick={this.toCart.bind(this)}  id={item.id} >
                              添加到购物车
                            
                          </Button>



                      </div>
                  )
              })
          }

        </div>
          
      )
  }
}

const mapStateToProps = function(state){
  // console.log(state.L_detail.response)
    return {
         status: state.L_addCart.status,
         L_addCart: state.L_addCart.response || []
       }
}   

export default connect(mapStateToProps,L_addCartAction)(L_addCartComponent)
