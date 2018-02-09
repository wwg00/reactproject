import React from 'react';
import {Router, Route, hashHistory, IndexRoute } from 'react-router';

import MainComponent from '../components/main/mainComponent';//引入主页面组件
import GoodsComponent from '../components/goods/goodsComponent.js';//引入产品表组件
import LoginComponent from '../components/login/loginComponent';//引入登录页面组件
import UserComponent from '../components/user/userComponent.js'
import CartComponent from '../components/cart/cartComponent.js'
import CommentComponent from '../components/comment/commentComponent.js'
import OrderComponent from '../components/order/orderComponent.js'

export default(
    <div>
        <Route path='/login' component={LoginComponent} ></Route>
        <Route path='/' component={MainComponent} >
            <IndexRoute component={GoodsComponent} ></IndexRoute>
            <Route path='goods' component={GoodsComponent} ></Route>
            <Route path='user' component={UserComponent} ></Route>
            <Route path='cart' component={CartComponent} ></Route>
            <Route path='comment' component={CommentComponent} ></Route>
            <Route path='order' component={OrderComponent} ></Route>
        </Route>
    </div>
)