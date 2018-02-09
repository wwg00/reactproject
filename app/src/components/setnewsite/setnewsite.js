
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,Link} from 'react-router'
import './setnewsite.scss'
import $ from 'jquery';
import {connect} from 'react-redux';
import * as newAction from './setnewsiteAction.js'
// import { List, Switch } from 'antd-mobile';
import antd from 'antd'
import { NavBar, Icon,List, Switch } from 'antd-mobile';
import http from '../../utils/httpClient.js'

 class newComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           data:'',
           html:'',
           pro:'',
           city:'',
           region:'',
           show:'none',
           dis:'block',
           user_id : localStorage.getItem('userId') || ''
        }
    }
    set(){
        hashHistory.push('/site');
    }
   save(){
        var address=this.state.pro+this.state.city+this.state.region+this.refs.detail.value;
        console.log(address);
       this.props.setsite({address:address,receivers:this.refs.receivers.value,number:this.refs.number.value,code:this.refs.code.value});
       
       http.get('setaddress',{user_id:this.state.user_id,address:address,receivers:this.refs.receivers.value,number:this.refs.number.value,postcode:this.refs.code.value}).then(res=>{
              //建立之后如果只有这条则设为默认地址;
              http.get('exist',{user_id:this.state.user_id}).then(res=>{
                 console.log(res[0].count);
                  if(res[0].count==1){
                       http.get('firstAddress',{user_id:this.state.user_id}).then(res=>{
                            console.log(res);
                       })
                  }
               });
       })
       
      
       hashHistory.push('/site');
    }
    selectregion(e){
        this.setState({region:e.target.innerText});
        this.setState({html:''});
        this.setState({dis:'none'});
        this.setState({show:'block'}); 
    }
    getregion(city,pro){
        this.setState({html:
             this.state.data.map(item=>{
                if(item.name==pro){
                          return item.regions.map(ite=>{
                            return  ite.regions.map(it=>{
                             return <li key={it.id} onClick={this.selectregion.bind(this)}>{it.name}</li>
                            })
                        })
                                  
                }     
                        
             })
        })
    }
    selectcity(pro,e){
      console.log(pro,e);
        this.setState({city:e.target.innerText});
        this.getregion(e.target.innerText,pro)

    }
    getcity(pro){
      this.setState({html:
             this.state.data.map(item=>{
                if(item.name==pro){

                      if(item.name==='台湾'||item.name=='香港'||item.name=='澳门'){
                            this.setState({show:'block'})
                      }else{
                          return item.regions.map(ite=>{
                             return  <li key={ite.id} onClick={this.selectcity.bind(this,pro)}>{ite.name}</li>
                        })
                      }
                     
                }     
                        
             })
        })
    }
    selectpro(e){
        
        this.setState({pro:e.target.innerText});
        this.getcity(e.target.innerText)
    }
    componentDidMount(){
      $.getJSON('./src/data/region.json',data=>{
          this.setState({data:data.regions});
          console.log(this.state.data);
          this.setState({html:
             this.state.data.map(item=>{
                            return  <li key={item.id} onClick={this.selectpro.bind(this)}>{item.name}</li>
                        
             })
        })
         
     }); 
    }
    render(){
        return(
              <div className="new_site">

                  <div className="before"></div>
                  <div className="sitenav">
                  <div onClick={this.set.bind(this)}><Icon type="left" style={{fontSize:'0.469rem',height:'100%',width:'1.25rem' }} /></div>
                     <span>新增收货地址</span>
                  </div>
                
                  <ul className="select_site" style={{display:this.state.dis}}>
                   {this.state.html}
                  </ul>

                  <ul className="detail" style={{display:this.state.show}}>
                    <li>{this.state.pro} {this.state.city} {this.state.region}</li>
                    <li><span>详细地址</span><input type="text" ref="detail"/></li> 
                    <li><span>收货人</span><input type="text" ref="receivers"/></li>
                    <li><span>手机号码</span><input type="text" ref="number"/></li>
                    <li><span>邮政编码</span><input type="text" ref="code"/></li>
                  </ul>
                
                  <div className="save" style={{display:this.state.show}}>     
                     <div className="newsite" onClick={this.save.bind(this)}>保存</div>
                  </div>

                </div>

        )
    }
}

const mapStateToProps = function(state){
    return {
         
    
         detail:state.setnewsite.detail||'',
         code:state.setnewsite.code,
         number:state.setnewsite.number,
         receivers:state.setnewsite.receivers,

          
       }
}   

export default connect(mapStateToProps,newAction)(newComponent)