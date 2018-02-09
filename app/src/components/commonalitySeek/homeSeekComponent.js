import React from 'react';

import {connect} from 'react-redux'
import Font from '../fontcss/baseFont.css'
import homeSeekScss from './homeSeek.scss'


class homeSeekComponent extends React.Component{
	
	render(){
		return (
			<div id="seek">
				<div className="input">
					<input type="text" id="input" placeholder="时尚潮流风向看这里"/>
				</div>
				<i className="iconfont icon-ai219"></i>
			</div>
			
		)
	}
}

export default homeSeekComponent
