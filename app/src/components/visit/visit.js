
import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,Link} from 'react-router'
import './visit.scss'
// import { List, Switch } from 'antd-mobile';
// import antd from 'antd'
// let icon=antd.Icon;
import {connect} from 'react-redux';
import { NavBar, Icon,List, Switch } from 'antd-mobile';
import * as visitAction from './visitAction.js'
 import http from '../../utils/httpClient.js'
class visitComponent extends React.Component{
   constructor(props){
        super(props);
        this.state={
            name:'no',
            goods:[],
            user_id : localStorage.getItem('userId') || ''
        }
    }
    set(){
        hashHistory.push('/set');
    }
    mine(){
      hashHistory.push('/mine');
    }
    tohome(){
        hashHistory.push('/');
    }
    clear(){
      // console.log(666);
       http.get('clearhistory',{id:this.state.user_id}).then(res=>{
               
                if(res.res=='ok'){
                    this.setState({goods:[]});
                }
              
       });
    }
    componentDidMount(){
        
        this.props.getuser(this.state.user_id).then(res=>{
            console.log('111',res[0]);
            var res=res[0].history;
 
            if(res==''){
              this.setState({name:'no'})
            }else{
                this.setState({name:'yes'});
                var array=res.split(';');

                array=Array.from(new Set(array));
                let arr = []
                array.map((item,idx)=>{
                     this.props.getgood(item).then(result=>{
                         console.log('11111',result);
                         arr.push(result[0]);
            
                         this.setState({
                             goods:arr
                         })
                         
                     });
                     
                })
      
               
                
            }
        });

    }
    getcomponents(){
        let html;
        let self=this;
    //    console.log(self.state.goods,'-----------------------------------');
    //    for(let i=0;i<=self.state.goods.length;++i){
    //     console.log(self.state.goods[i],'11111111111111----------------------')
    //     }
        switch(self.state.name){
                     case 'yes':
                      html= (
                       
                        self.state.goods.map(item=>{
                           return  <div className="my_site" key={item.id}>
                     <ul>
                        <li>
                          <div>
                             <img src={item.sImage}/>
                          </div>
                          <div>
                             <h1>{item.description}</h1>
                             <p>￥{item.nPrice.toFixed(2)}</p>
                          </div>
                        </li>
                     </ul>
                  </div> 
                           
                        })

                        );break;
                     case 'no':
                      html= (<div className="no_site">
                
                     <div>暂无浏览记录</div>
                     <div className="return" onClick={self.tohome}>随便逛逛</div>
                  </div>);break;
                  }
        return html;
    }
    render(){
        return(
              <div className="site">
                  <div className="sitenav">
                  <div onClick={this.mine.bind(this)}><Icon type="left" style={{fontSize:'0.469rem',height:'100%',width:'1.25rem' }} /></div>
                     <span className="record">浏览记录</span>
                     <span className="empty" onClick={this.clear.bind(this)}>清空</span>
                  </div>
                  
                 {this.getcomponents()}
                  
              </div> 

        )
    }
}

const mapStateToProps = function(state){
    return {
         status: state.visit.status,
         data: state.visit.response || [],

       }
}   

export default connect(mapStateToProps,visitAction)(visitComponent)


{/* <icon type="inbox"  style={{fontSize:'2.188rem'}}/> */}