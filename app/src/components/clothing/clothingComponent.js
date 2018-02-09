import React from 'react';

import $ from 'jquery'

import { Router, Link, hashHistory} from 'react-router';

//自定义方法
import p_Common from '../home/p_Common'

//引入loading组件
import LoadingComponent from '../loading/loadingComponent'


export default class ClothingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:['羽绒服','大衣','棉服','毛衣','夹克','卫衣','牛仔长裤','休闲长裤','衬衫','运动鞋'],
            bImg:['yrf','dy','mf','my','jk','wy','nzck','xxck','cs','ydx'],
            dataset:[],
            api: '/getGoodsByType3',
            impose: 12,
        }
    } 
    componentWillMount(){
        var len = this.state.data.length;
        for(let i=0;i<len;i++){

            //格式化url
            var params = {
                type3: this.state.data[i],
                impose:this.state.impose,
            }
            var url = p_Common.baseUrl + this.state.api ;
            var urlStr = p_Common.urlDecode(url, params)

            $.get({
                url:urlStr,
                async:true,
                success:(res)=>{
                    //打乱数组顺序
                    p_Common.shuffle(res);

                    //关闭loading
                    $('.loading').removeClass('loading').remove();

                    this.setState(()=>{
                        this.state.dataset.push(res);
                    })
                }
            })
        }
        
        
    }
    componentDidMount(){
        var $clothing = $('.clothing');
        var $sliderList = $('.slider-list');

        //传参
        
        $sliderList.on('click', '.slider-slide', function () {
            console.log($(this).find('img')[0].alt);
            hashHistory.push({
                pathname: '/goodslist/',
                query: {
                    type1: $(this).find('img')[0].alt
                }
            })
        })

        //在这里传羽绒服，大衣...
        $clothing.on('click','.bImg',function(){
            // console.log(this.children[0].alt);
            // console.log('-----------------------')
            hashHistory.push({
                pathname: '/goodslist/',
                query: {
                    type3: this.children[0].alt,
                }
            })
        })

        $clothing.on('click','.sImgBox',function(){
            console.log($(this).find('.sImg')[0].alt)
            hashHistory.push({
                pathname: '/details/',
                query: {
                    id: $(this).find('.sImg')[0].alt
                }
            })
        })

        $clothing.on('click', '.toList', function () {
            var type3 = $(this).parent('ul').prev().find('img')[0].alt;

            hashHistory.push({
                pathname: '/goodslist/',
                query: {
                    type3: type3
                }
            })
        })

    }
    render(){
       
        // console.log(this.state.dataset)
        return(
            <div className="clothing">
                {
                    this.state.dataset.map((item,idx)=>{
                        return(
                            <div className="son" key={idx}>
                                <div className="bImg">
                                    <img src={`./src/assets/images/${this.state.bImg[idx]}.png`} alt={this.state.data[idx]} />
                                </div>
                                <ul>
                                    {
                                        this.state.dataset[idx].map((article,index)=>{
                                            let len = this.state.dataset[idx].length;
                                            if(index == len-1){
                                                return <li key={article.id} className="toList"><a><span>更多</span></a></li>
                                            }   
                                            return(
                                                <li key={article.id} className="sImgBox">
                                                    {/* <Link to={{ pathname: 'classify', state: { id: article.id } }} > */}
                                                        <div>
                                                            <img src={article.sImage} className='sImg' alt={article.id} />
                                                        </div>
                                                        <div className="descriptionBox">
                                                            <div className="description">{article.description}</div>
                                                        </div>
                                                        <div>
                                                            <span className="nPrice">￥{article.nPrice}</span>
                                                            <span className="oPrice">￥{article.oPrice}</span>
                                                        </div>
                                                    {/* </Link> */}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>    
                            </div>
                        )
                    })
                }  
                <div className="footer">
                    <div className="footerSon borderSon"></div>
                    <div className="footerSon textSon">我是有底线的</div>
                    <div className="footerSon borderSon"></div>
                </div>    
                <LoadingComponent/>
            </div>
        )
    }
}