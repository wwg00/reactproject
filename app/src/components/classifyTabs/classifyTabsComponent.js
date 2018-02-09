import React from 'react';

import $ from 'jquery';

import { Router, Link, hashHistory } from 'react-router';

import p_Common from '../home/p_Common'
import LoadingComponent from '../loading/loadingComponent'

export default class classifyTabsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:['男装','女装','童装','鞋履','箱包','配饰'],
            api:'/getClassifyImg',
            dataset:[],
            bImg:{
                imgUrl:'',
                alt:''
            },
            params:{
                type1: '男装'
            },
        }
    }
    componentWillMount() {
        //http://127.0.0.1:88/getClassifyImg?type1=男装;

        //格式化url
        var url = p_Common.baseUrl + this.state.api;
        var urlStr = p_Common.urlDecode(url,this.state.params);
        console.log(urlStr);

        $.get(urlStr,res=>{
            // console.log(res);
            //关闭loading
            $('.loading').removeClass('loading').remove();

            //赋值bImg
            this.setState(()=>{
                this.state.bImg.imgUrl = res[0].bImg;
                this.state.bImg.alt = res[0].type1;
            });

            //格式化res
            this.foramtData(res);

            //修改css
            this.refreshCss();
        })

        //接收上个路由传递过来的参数
        // console.log(this.props.location.state.id);
        // console.log('------------------------')
    }
    componentDidMount() {

        var $classifyTabs = $('.classifyTabs');

        $classifyTabs.on('click', '.bImg', function () {
            console.log(this.children[0].alt);
            hashHistory.push({
                pathname: '/goodslist/',
                query: {
                    type1: this.children[0].alt
                }
            })
        })

        $classifyTabs.on('click', '.sImg', function () {
            console.log(this.children[0].alt, this.children[1].innerText);
            hashHistory.push({
                pathname: '/goodslist/',
                query: {
                    type3: this.children[1].innerText,
                    type1:this.children[0].alt,
                }
            })
        })

        this.refresh();
    }
    foramtData(_res) {
        //找出分组长度len
        var arr1 = [];
        var len = 0;
        for (let i = 0; i < _res.length; i++) {
            arr1.push(_res[i].type2);
            $.unique(arr1);
            len = arr1.length;
        }

        //临时存放
        var dataset = [];
        //控制变量
        var type2 = _res[0].type2;//上装
        var temp = 0;

        for (let i = 0; i < len; i++) {
            var arr2 = [];
            for (let j = temp; j < _res.length; j++) {
                if (_res[j].type2 == type2) {
                    arr2.push(JSON.parse(JSON.stringify(_res[j])));
                    continue;
                } else if (_res[j].type2 != type2 && j * 2 > _res.length - 1) { //重新赋值 && j*2>_res.length 
                    // console.log(type2,_res[j].type2,j,temp)
                    type2 = _res[j].type2;
                    temp = j;
                    break;
                }
            }
            dataset.push(arr2);
        }
        // console.log(dataset);
        this.setState({ dataset: JSON.parse(JSON.stringify(dataset)) })
        return ;
    }
    refreshCss(_type1){
        let $contBox = $('.contBox');

        let arr = [];
        let len = this.state.dataset.length;
        for(let i=0;i<len;i++){
            arr.push(this.state.dataset[i].length);
        }

        //给type2动态高度
        $contBox.each(function(idx,ele){
            let height = 84 + 254 * Math.ceil(arr[idx]/3);
            $(ele).css({height:height});
        })

        let $type1 = $('.type1');
        $type1.each(function(idx,ele){
            _type1 === $(ele).text() && 
                $(ele).addClass('active').siblings().removeClass('active')
        })
        
    }
    refresh(){
        
        var $leftUl = $('.leftUl');
        
        //绑定react
        var self = this;

        $leftUl.on('touchend','.type1',function(e){
            var type1 = $(this).text()

            //把type1传给refreshCss
            self.refreshCss(type1);

            self.setState(()=>{
                self.state.params.type1 = type1 ;
            })
            var url = p_Common.baseUrl + self.state.api;
            var urlStr = p_Common.urlDecode(url, self.state.params);
            console.log(urlStr);

            //开loading
            $('<div/>').addClass('loading').appendTo($(document.body));

            $.get(urlStr,res=>{
                //关闭loading
                $('.loading').removeClass('loading').remove();
                // console.log(res)

                //赋值bImg
                self.setState(() => {
                    self.state.bImg.imgUrl = res[0].bImg;
                    self.state.bImg.alt = res[0].type1;
                });
                
                //格式化res
                self.foramtData(res);

                //修改css
                self.refreshCss();
            })
        })

    }
    render() {
        // console.log(this.state.dataset)
        return (
            <div>
                <div className="left">
                    <ul className="leftUl">
                        {
                            this.state.data.map((article)=>{
                                return(
                                    <li className="type1" key={article}>{article}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="right" >
                    <div className="bImg">
                        <img src={this.state.bImg.imgUrl} alt={this.state.bImg.alt}/>
                    </div>
                    {
                        this.state.dataset.map((item,idx)=>{
                            return(
                                <div className="contBox" key={item[0].length}>
                                    <p className="type2">{item[0].type2}</p>
                                    {
                                        item.map((article,index)=>{
                                            // console.log(article.id)
                                            return(
                                                <div className="sImg" key={article.id}>
                                                    <img src={article.sImg} alt={item[0].type1}/>
                                                    <p className="type3">{article.type3}</p>
                                                </div>                                            
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <LoadingComponent/>
            </div>
        )
    }
}
