import React from 'react';
import { Link,hashHistory } from 'react-router';
import {connect} from 'react-redux'
import Font from '../fontcss/baseFont.css'
import FootScss from './foot.scss'
// hashHistory.push('/home');
class footComponent extends React.Component{
	componentDidMount(){
		console.log(this.props.color);
	}
	// color(){
	// 	// var index = document.getElementsByClassName("index")[0];
	// 	// if(this.props.color='classify'){
	// 	// 	console.log(666)
	// 	// 	var classify = document.getElementsByClassName("classify")[0];
	// 	// 	console.log(classify)
	// 	// 	classify.setAttribute('class', 'color');
	// 	// }
		
	// 	if(this.props.color=='home'){
		   
	// 	}

	// }

	componentDidMount(){

		  if(this.props.color=='home'){
		  	   var infoot = document.getElementsByClassName('index1')[0];
		   infoot.style.color='#c00';
		  }else if(this.props.color=='classify'){
		   var classify = document.getElementsByClassName('classify1')[0];
		   classify.style.color='#c00';
		}else if(this.props.color=='mine'){
		   var mine = document.getElementsByClassName('mine1')[0];
		   console.log(mine)
		   mine.style.color='#c00';
		}else if(this.props.color=='cart'){
			var cart1 = document.getElementsByClassName('cart1')[0];
			// console.log(mine)
			cart1.style.color='#c00';
		 }
	}

	render(){
		return (
			<div id="foot">
				<ul className="foot">
					<li ><Link to="/"><i className="iconfont icon-home index1"></i><span>首页</span></Link></li>
					<li ><Link to="/classify"><i className="iconfont icon-fenlei classify1"></i><span>分类</span></Link></li>
					<li ><Link to="/cart"><i className="iconfont icon-shopping-bag cart1"></i><span>购物袋</span></Link></li>
					<li ><Link to="mine"><i className="iconfont icon-wode mine1"></i><span>我的</span></Link></li>
				</ul>
			</div>
		)
	}
}

export default footComponent
