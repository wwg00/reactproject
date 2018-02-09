import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, browserHistory, Link, IndexRoute} from 'react-router'

import {Provider} from 'react-redux'
import store from './redux/configStore.js'

// 引入蚂蚁金服
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import './basescss/base.scss'
import Rem from './getRem/getRem.js'
import Layer from './layer/layer_mobile/layer.js'

import route from './router/rootRouter'


Rem.rem();
ReactDOM.render(
    <Provider store={store}>
        <Router routes={route} history={hashHistory}></Router>
    </Provider>
    ,document.getElementById('app'))


     


