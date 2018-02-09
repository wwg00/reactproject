
import React from 'react';
import { Link,hashHistory } from 'react-router';
import {connect} from 'react-redux'
import { Icon,} from 'antd';
import "./L_comment.scss"
import { Button, Tabs, WhiteSpace  } from 'antd-mobile';
import * as L_commentAction from './L_commentAction.js'
import cmImg from "../../assets/img/comment.png"


class L_commentComponent extends React.Component{

   componentDidMount(){
     this.props.getCommentsData();
   }
    goback(){
        this.props.router.goBack();
    }

    render(){
      
        if(!this.props.datas){
            return null
        }
        return (
            <div id="container_L_C">
                <nav id="nav_L_C">
                 <Icon style={{fontSize:50,marginTop:10}} className="i1"  onClick={this.goback.bind(this)} type="left-circle-o" />
                  <span className="comment_title">评论页<i className="comment_count" style={{color:'#c00'}}>{'('+this.props.datas.length+')'}</i></span>
                </nav>
                <main id="main_L_C" >
                   <header id="header_L_C"></header>
                   <section id="comment_content_C">
                        <div style={{padding:'27px'}}>
                           {
                              this.props.datas.map( item => {
                                 return(
                                      <div key={item.id} className="comment_list">
                                        <div className="L_comment_content_title2">
                                            <span className = "fl person"><Icon type="qq" /></span>
                                            <span className = "fl nickname">匿名评论</span>
                                            <ul className = "fr L_commemnt_start" >
                                              {
                                                item.grade.split(';').map( function(i,id) {
                                                  return (
                                                      <li  key={id}><img src={cmImg} /></li>
                                                    )
                                                }) 
                                              }  
                                            </ul>
                                           
                                        </div>
                                        <div style={{ display: 'flex'}}>默认好评</div>
                                        <div style={{ display: 'flex'}}><a>{item.create_at.slice(0,19).replace('T'," ")}</a><a>{'颜色'+item.color}</a><a>{'尺寸'+item.size}</a></div>
                                      </div>
                                  )
                              }) 
                           }
                        </div>
                   </section>

                </main>
            </div>
        )
    }
}

const mapStateToProps = function(state){
    // console.log( state.L_comment.res)
    return{

        datas: state.L_comment.res || []
    }
}   

export default connect(mapStateToProps,L_commentAction)(L_commentComponent)