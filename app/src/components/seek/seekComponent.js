import React from 'react';
import * as loginAction from './seekAction.js'
import {connect} from 'react-redux'
import font2 from '../fontcss/baseFont2.css'
import seekScss from './seek.scss'
import font from '../fontcss/baseFont.css'


class SeekComponent extends React.Component{

	render(){
		return (
			<div id="home">
				<div className="top">
					<i className="iconfont icon-fanhui fanhui"></i>
					<i className="iconfont icon-ai219"></i><input type="text" id="seek"  placeholder="时尚潮流风向看这里"/>				
					<i className="iconfont icon-iconfontsaoyisao ma"></i>
					
				</div>
				<div className="center">
					<span>大家都在搜:</span>
				</div>
				<div id="ccc"></div>
				<div className="history">
					<div className="eek">搜索历史:</div>
					<ul>
						<li>黑色帽子</li>
					</ul>
					<div id="clear">清空搜索历史</div>
				</div>
				<ul id="ul">
					<li>
						
					</li>
				</ul>
			</div>
			
		)
	}
}


export default SeekComponent
