import React from 'react'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'



import GoodsListComponent from '../components/y_goodsLists/goodsListComponent.js'

import CartComponent from '../components/cart/cartComponent.js'
import OrderComponent from '../components/order/orderComponent.js'

import mineComponent from '../components/mine/mine.js'
import setComponent from '../components/set/set.js'
import siteComponent from '../components/mine_site/mine_site.js'
import visitComponent from '../components/visit/visit.js'

import LoginComponent from '../components/login/loginComponent.js'//登录
import ZhuceComponent from '../components/login/zhuceComponent'//注册




import SeekComponent from '../components/seek/seekComponent'//搜索页面
import FootComponent from '../components/commonalityFoot/footComponent'//公共底部
import HomeSeekComponent from '../components/commonalitySeek/homeSeekComponent'//公共首页搜索
import HomeComponent from '../components/home/homeComponent.js'
import ClassifyComponent from '../components/classify/classifyComponent.js'
import ClassifyTabsComponent from '../components/classifyTabs/classifyTabsComponent.js'

import L_detailComponent from '../components/L_detail/L_detailComponent.js' //商品
import L_addCartComponent from '../components/L_addCart/L_addCartComponent.js' //购物车弹窗
import L_commentComponent from '../components/L_comment/L_commentComponent.js' //评论
import L_detailMessageComponent from '../components/L_detailMessage/L_detailMessageComponent.js' //评论
import L_shareComponent from '../components/L_share/L_shareComponent.js' //评论
import L_goodDetailComponent from '../components/L_goodDetail/L_goodDetailComponent.js' //详情


import setnewsiteComponent from '../components/setnewsite/setnewsite.js'

export default (
    <Route path="/">

        <Route path="/goodslist" component={GoodsListComponent}></Route>

        <IndexRoute component={HomeComponent}/>//首页


       <Route path="mine" component={mineComponent}></Route>
       <Route path="set" component={setComponent}></Route>
       <Route path="site" component={siteComponent}/>
       <Route path="setsite"  component={setnewsiteComponent}/>


        <Route path="/details" component={L_detailComponent}>//商品详情
            <Route path="/shares" component={L_shareComponent}></Route>//购物分享
            <Route path="/addCart" component={L_addCartComponent}></Route>//购物车弹窗
            <Route path="/message" component={L_detailMessageComponent}></Route>//购物车弹窗
        </Route>
        <Route path="/goodsDetail" component={L_goodDetailComponent}></Route>
        <Route path="/comment" component={L_commentComponent}></Route>

        <Route path="/cart" component={CartComponent}>  </Route>
        <Route path="/order" component={OrderComponent}>  </Route>
        <Route path="/classify" component={ClassifyComponent}>//分类页
            <IndexRoute component={ClassifyTabsComponent}/>
        </Route>
       	<Route path="/login" component={LoginComponent} />//登录
        <Route path="/zhuce" component={ZhuceComponent} />//注册
        <Route path="/seek" component={SeekComponent} />//搜索页面

        <Route path="/foot" component={FootComponent} />//公共底部
        <Route path="/homeSeek" component={HomeSeekComponent} />//公共首页搜索
        <Route path="/visit" component={visitComponent}/>

    </Route>





)


