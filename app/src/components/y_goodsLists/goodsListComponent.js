import React from 'react'
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Input, Button, Icon, Layout, Row, Col } from 'antd';
import * as GoodslistAction from './goodsListAction.js'
import './goodsList.scss'
import $ from 'jquery'
import {hashHistory} from 'react-router'
var fenlei=[
                {   
                    des:"价格",
                    choo:"",
                },{   
                    des:"尺寸",
                    choo:"",
                },{   
                    des:"颜色",
                    choo:"",
                },{   
                    des:"性别",
                    choo:"未考虑",
                },{   
                    des:"季节",
                    choo:"未考虑",
                },{   
                    des:"场合",
                    choo:"未考虑",
                },{   
                    des:"系列",
                    choo:"未考虑",
                },{   
                    des:"版型",
                    choo:"未考虑",
                },{   
                    des:"面料",
                    choo:"未考虑",
                }
            ]


class Goodslist extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            qiehuan:false,
            priColor:false,
            priCol:'',
            goodsList:[],
            // type1:'',
            // type3:'大衣',
            type1:'',
            type3:'',
            choose:false,
            chooseContent:[],
            inText:'',
            erji:false,
            fenlei:[
                {   
                    des:"价格",
                    choo:"",
                },{   
                    des:"尺寸",
                    choo:"",
                },{   
                    des:"颜色",
                    choo:"",
                },{   
                    des:"性别",
                    choo:"未考虑",
                },{   
                    des:"季节",
                    choo:"未考虑",
                },{   
                    des:"场合",
                    choo:"未考虑",
                },{   
                    des:"系列",
                    choo:"未考虑",
                },{   
                    des:"版型",
                    choo:"未考虑",
                },{   
                    des:"面料",
                    choo:"未考虑",
                }],
            chooseOk:'',
        }
    }
    // componentWillMount(){
    //      var type1 = this.props.location.query.type1
    //      var type3 = this.props.location.query.type3
    //     // 请求数据
    //     this.props.ygetGoodsInfo({type3:this.state.type3,type1:this.state.type1})
    // }
    // 页面加载使上下箭头呈现灰色
    componentDidMount(){
        var type1 = this.props.location.query.type1
        var type3 = this.props.location.query.type3
        console.log(type1,type3)
        // var type1 = ''
        // var type3 = '大衣'
        this.setState({priCol:  '#898989',type1:type1,type3:type3})

        this.props.ygetGoodsInfo({type3:type3,type1:type1})
    }
    // 回顶部
    HbackTop(){
        $('#main').stop().animate({ scrollTop: 0 }, 200);
    }
    // 切换右上角的图标
    qiehuan(){
        this.setState({qiehuan: !this.state.qiehuan})
    }
    // 切换上下箭头的颜色
    priColor(){
        this.setState({priColor: !this.state.priColor})
        if(this.state.priColor){
            this.props.ypriceU({type3:this.state.type3,type1:this.state.type1})
        }else{
            this.props.ypriceD({type3:this.state.type3,type1:this.state.type1})
        }

    }
    // 切换各个tab的颜色
    active(e){
        for(var i=0;i<$('#nav li').length;i++){
            $('#nav li').get(i).style.color = '#898989'
            $('#nav li span').get(0).style.color = '#898989'
            this.setState({priCol:  '#898989'})

        }
        e.target.style.color = '#f00'
        // 如果点击价格,才使得上下箭头有改变颜色的机会
        if(e.target.innerText == '价格'){
            this.setState({priCol: '#f00'})
        }
    }
    // 点击li到详情页

    toGoodsDetail(_id){
        this.props.router.push({ pathname :'/details',query:{id:_id}})
    }
    // 综合
    zonghe(){
        this.props.ygetGoodsInfo({type3:this.state.type3,type1:this.state.type1})

    }
    // sale销量
    sale(){
        this.props.ysale({type3:this.state.type3,type1:this.state.type1})

    }
    // 筛选
    choose(){
        $('#y-alert').show(500);
        
    }
    // 移除弹出框
    remove(){
        $('#y-alert').hide(500);
    }
    // 点击筛选中的内容
    zaiShai(e){
        var sSize = []
        var sColor = []
        var sPrice = []
        var self = this
        this.props.goodsList.map(function(item,idx){
            // size
            item.size.split(';').map(function(size){
                if(sSize.indexOf(size)<0){
                    sSize.push(size)
                }
            })
            // color
            item.color.split(';').map(function(color){
                if(sColor.indexOf(color)<0){
                    sColor.push(color)
                }
            })
            // price
            if(sPrice.indexOf(item.nPrice)<0){
                sPrice.push(item.nPrice)
            }
            
        })
        sPrice = sPrice.sort(function(a,b){return a-b})
        if($(e.target).find('.fenlei').text() == '价格'){
            this.setState({chooseContent:sPrice})
        }else if($(e.target).find('.fenlei').text() =='尺寸'){
            this.setState({chooseContent:sSize})
        }else if($(e.target).find('.fenlei').text() =='颜色'){
            this.setState({chooseContent:sColor})
        }
        // 点谁谁就是inText
        if(e.target.tagName == 'LI'){
            this.setState({inText:e.target.children[0].innerText})    
            $('#erji').show(500); 
        }
    }
    // clear选中的
    clear(){
        for(var i=0;i<3;i++){
            fenlei[i].choo = ''
        }
        this.setState({fenlei:fenlei})
    }
    // 返回第一个弹窗
    backToAlert(){
        $('#erji').hide(500);
    }
    // 选好尺码,颜色之类的...
    choosed(e){
        
        console.log(this.state.fenlei)
        this.state.fenlei.map(function(item,idx){
            if(item.des == this.refs.ccc.innerText){
                item.choo = e.target.innerText
            }
        }.bind(this))
        this.setState({fenlei:this.state.fenlei})
        // console.log(fenlei)
        $('#erji').hide(500);
        
    }
    // 选好之后,点确认
    queren(){
        $('#y-alert').hide(500);
        if(this.state.fenlei[0].choo != '' || this.state.fenlei[1].choo != '' || this.state.fenlei[2].choo != ''){

            var params ={nPrice:this.state.fenlei[0].choo,size:this.state.fenlei[1].choo,color:this.state.fenlei[2].choo,type3:this.state.type3,type1:this.state.type1}
            this.props.shaixuan(params)
            
        }else{
            this.props.ygetGoodsInfo({type3:this.state.type3,type1:this.state.type1})
        }

    }
    // 返回前一页
    goback(){
        this.props.router.goBack()
    }
    render(){
        if(!this.props.goodsList){
            return null
        }
        return (
            <div className="list-container">
                <div id="header">
                    <div className="ziti" ><Icon type="left"   onClick={this.goback.bind(this)}  /></div>
                    <Link to="/seek"><div className="Search"><Icon type="search" style={{color:'#ccc'}}/></div></Link>
                    <div  className="ziti" onClick={this.qiehuan.bind(this)}>
                        <Icon type="appstore-o" style={{display:this.state.qiehuan ? 'block' : 'none'}}/>
                        <Icon type="bars" style={{display:this.state.qiehuan?'none' : 'block'}}/>
                    </div>
                </div>
                <ul id="nav" onClick={this.active.bind(this)}>
                    <li className="zonghe" style={{color:'#f00'}}  onClick={this.zonghe.bind(this)}>综合</li>
                    <li onClick={this.sale.bind(this)}>销量</li>
                    <li>
                        <span onClick={this.priColor.bind(this)}>价格</span>
                        <div className="arrow">
                            <Icon type="caret-up" style={{color: this.state.priCol == '#898989' ? '#898989': (this.state.priColor?'#f00':'#898989'),display:'inline'}}/>
                            <Icon type="caret-down" style={{color: this.state.priCol == '#898989' ? '#898989': (this.state.priColor?'#898989':'#f00'),display:'inline'}} />
                        </div>
                    </li>
                    <li onClick={this.choose.bind(this)}>筛选</li>
                </ul>
                <div id="main">
                    
                    <ul className="heng" style={{display:this.state.qiehuan?'flex':'none'}}>
                        {
                            this.props.goodsList.length > 0 ?
                            this.props.goodsList.map(function(item,idx){
                                return (
                                    <li key={item.id} onClick={this.toGoodsDetail.bind(this,item.id)}>
                                        <div className="hImage">
                                            <img src={item.bImage}/>
                                        </div>
                                        <div className="hdiscript">{item.description}</div>
                                        <div className="hPrice">
                                            <div className="nPrice price">￥<span>{item.nPrice}</span></div>
                                            <div className="oPrice price" style={{display:item.oPrice == item.nPrice?'none':'inline-block'}}>￥<span>{item.oPrice}</span></div>
                                        </div>
                                    </li>
                                )
                            }.bind(this)) : <p className="ao">啊哦，出错咯~</p>
                        }
                    </ul>


                    <ul className="shu" style={{display:this.state.qiehuan?'none':'inline-block'}}>
                        {
                            this.props.goodsList.length > 0 ?
                            this.props.goodsList.map(function(item,idx){
                                return (
                                    <li key={item.id} onClick={this.toGoodsDetail.bind(this,item.id)}>
                                        <div className="bImage">
                                            <img src={item.bImage}/>
                                        </div>
                                        <div className="goodsInfo">
                                            <div className="discript">{item.description}</div>
                                            <div>
                                                <div className="nPrice price">￥<span>{item.nPrice}</span></div>
                                                <div className="oPrice price" style={{display:item.oPrice == item.nPrice?'none':'inline-block'}}>￥<span>{item.oPrice}</span></div>

                                            </div>

                                        </div>
                                    </li>
                                    )
                            }.bind(this)) : <p className="ao">啊哦，出错咯~</p>
                        }
                    </ul>
                </div>
                <div>
                    <div id="H_ToTop"  onClick={this.HbackTop.bind(this)}>
                        <span>
                            <Icon type="arrow-up" />     
                        </span>
                    </div>
                </div>
                <div id="y-alert" style={{display:this.state.choose ? 'block' : 'none'}}>
                    <div className="kong" onClick={this.remove.bind(this)}></div>
                    <div className="shaixuan">
                        <ul className="s-header">
                            <li onClick={this.clear.bind(this)}>清除</li>
                            <li style={{fontSize:'0.55rem'}}>筛选</li>
                            <li onClick={this.queren.bind(this)}>确认</li>
                        </ul>
                        <ul className="s-main" onClick={this.zaiShai.bind(this)}>
                            {
                                this.state.fenlei.map(function(item,idx){
                                    return (<li key={idx}>
                                                <span className="fenlei">{item.des}</span>
                                                <span style={{color:'#f00'}}>{item.choo}</span>
                                                <Icon type="right" />
                                            </li>)
                                }.bind(this)) 
                            }
                        </ul>
                    </div>
                </div>
                <div id="erji" style={{display:this.state.erji ? 'block' : 'none'}}>
                    <div className="kong" onClick={this.backToAlert.bind(this)}></div>
                    <div className="xuanze" style={{overflow:'hidden'}}>
                        <ul className="z-header">
                            <li><Icon type="left"  onClick={this.backToAlert.bind(this)}/></li>
                            <li className="inText" ref="ccc" style={{fontSize:'0.55rem'}}>{this.state.inText}</li>
                            <li></li>
                        </ul>
                        <ul className="z-main">
                            <li className="chooseAll">
                                <span>全部</span><Icon type="check" />
                            </li>
                            {
                                this.state.chooseContent.length>0 ? 
                                this.state.chooseContent.map(function(item,idx){
                                   return (
                                        <li key={idx} onClick={this.choosed.bind(this)}>
                                            {item}
                                        </li>
                                   ) 
                                }.bind(this)) : <p className="ao">啊哦，出错咯~</p>
                            }
                        </ul>
                    </div>
                </div>
                
            </div>
            
        )
    }
}

const mapToState=function(state){
    console.log(state.ygoodsList.res)
    return {
        goodsList:state.ygoodsList.res
    }
}
export default connect(mapToState,GoodslistAction)(Goodslist)
