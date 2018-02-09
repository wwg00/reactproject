
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,Link} from 'react-router'
import './mine_site.scss'
import {connect} from 'react-redux';
// import { List, Switch } from 'antd-mobile';
import {Icon} from 'antd'
import $ from 'jquery';
// import { NavBar, Icon,List, Switch } from 'antd-mobile';
import * as siteAction from './mine_siteAction.js'
import http from '../../utils/httpClient.js'
class siteComponent extends React.Component{
   constructor(props) {
        super(props);
        this.state = {
           data:'',
           checked:true,
           select:'',
           show:'block',
           user_id : localStorage.getItem('userId') || ''
                      
        }
    }
    deletesite(id,event){
      console.log(id);
      http.get('deleteAddress',{address_id:id}).then(res=>{
            this.getaddress();
      })
      // console.log(event.currentTarget);
      // var e=event.target.parentNode.parentNode.parentNode;
      //     e.parentNode.removeChild();
        
    }
    setsite(id,event){
      // console.log(id)
      http.get('selectAddress',{address_id:id,user_id:this.state.user_id}).then(res=>{
          console.log(res);
      });
      

    }   
    set(){
        hashHistory.push('/set');
    }
    newsite(){
      hashHistory.push('/setsite');
    }
    gethtml(){
      let html;
      
          console.log(this.state.data);
          if(this.state.data){
              html =this.state.data.map((item,idx)=>{
              
                         return (
                            
                                 <li key={item.id} id={item.id}>
                                        <div>
                                           <h1>{item.consignee}</h1>
                                           <p>{item.address}</p>
                                        </div>
                                        <div>
                                           <h1>{item.number}</h1>
                                           <div className="select">
                                             <span>选为默认地址:</span>
                                             <input type={"radio"} className="box" onClick={this.setsite.bind(this,item.id,event)} name="address" defaultChecked={this.state.checked}/>
                                             <div onClick={this.deletesite.bind(this,item.id,event)}>删除</div>
                                            </div>
                                        </div>
                                 </li>
                            
                         )
                })
            
             return html
          }
             

     

       
       
    }
    getaddress(){
      http.get('getaddress',{user_id:this.state.user_id}).then(res=>{
             // var result=JSON.parse(res);
            
               console.log('.......................')
               console.log(res);
             if(typeof(res[0]) != "undefined"){
              
              this.setState({show:'none'})
                this.setState({data:res});
               this.state.data.map((item,idx)=>{

                    if(item.state==1){
                        this.setState({select:idx})
                      
                    }
               })
             }else{
                  
                  this.setState({show:'block'});
                  this.setState({data:''});
             }
             
         });
    }
    componentDidMount(){
         
         
         // window.addEventListener('scroll', function () {
         //      var sitenav=document.getElementsByClassName('sitenav')[0];
         //      sitenav.style.position='fixed';
         //      if(window.scrollY==0){
               
         //          sitenav.style.position='relative';
         //      }
         // })
      
       this.getaddress();
    }
   
    render(){
        return(
              <div className="mysite">
                 
                  <div className="sitenav">
                  <div onClick={this.set.bind(this)}><Icon type="left" style={{fontSize:'0.469rem',height:'100%',width:'1.25rem' ,marginTop:'0.25rem',fontSize:'0.938rem'}} /></div>
                     <span>配送地址</span>
                  </div>
                  <div className="my_site" >
                      <ul>
                          {this.gethtml()}
                        <div className="no_site" style={{display:this.state.show}}>
                              <Icon type="environment-o"  style={{fontSize:'2.188rem'}} />
                              <div>暂无收货地址</div>
                         </div>
                      </ul>
                  </div>
                  
                  <div className="newsite" onClick={this.newsite.bind(this)}>添加新地址</div>
              </div> 
        )
    }
}

const mapStateToProps = function(state){
    return {
         
    
         params:state.minesite.params
         
          
       }
}   
export default connect(mapStateToProps,siteAction)(siteComponent)