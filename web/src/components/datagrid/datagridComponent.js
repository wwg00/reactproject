import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery'

import * as dataGridAction from './datagridAction';

import Spinner from '../spinner/spinnerComponent';

import { Modal, Button, Input, Select, message,Pagination } from 'antd';
import './datagrid.scss';

//消息提示框全局设置
message.config({
    placement: 'topCenter',
});


class DataGridComponent extends React.Component{
    componentWillMount(){
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        this.setState({
            url:this.props.url,
            filerSet:this.props.filerSet || [],
            states:this.props.states || 1,
            status:this.props.status || 'query',
            languageExchange:this.props.languageExchange,
            type:1,
            page:1,
        })
        document.addEventListener('keydown' ,this.sendCondition);
        document.addEventListener('keydown' ,this.getInputValue);
    }
    componentDidMount(){
        var params = {
            status:'origin',
        }
        this.props.getData(
            this.state.url,
            params
        );
        var self = this;
        $('.tabBody').on('click','.ant-btn',function(){
            var tr = this.parentNode.parentNode
            var _id = tr.id
            self.props.getData(
                self.state.url,
                {id:_id,status:'delete'}
            )
            // tr.parentNode.removeChild(tr)
        })
        $('.fenye').on('click','.ant-pagination-item',function(){
            var page = this.title;
            var impose = 6 ;
            var skip = page * impose;
             self.props.getData(
                self.state.url,{skip:skip,status:'origin'}
            )
        })
    }
    getKeys(item){
        return item ? Object.keys(item) : []
    }
    //编辑框的内容修改时触发
    setValue(e){
        var newEdtData = JSON.parse(JSON.stringify(this.state.dataAlter));
        newEdtData[0][e.target.id] = e.target.value;
        this.setState({
            dataAlter:newEdtData
        })
    }
    //生成查询的选项框
    createSelect(){
        let optSelect = [];
        var Option = Select.Option;
        this.getKeys(this.props.dataset[0]).map(function(key, index){
            if(this.state.filerSet.indexOf(key) < 0){
                optSelect.push(<Option value={key} key={index} id={index} >{this.state.languageExchange[key]}</Option>)
            }
        }.bind(this))
        return optSelect;
    }
    //获取选项框的内容的函数
    getSelectValue(value){
        this.setState({optType:value});
    }
    //获取输入框的内容的函数
    getInputValue=(e)=>{
        this.setState({optContent:e.target.value});
        if(e.keyCode == '13'){
            e.target.blur();
        }
    }
    //发起查询的条件
    sendCondition=(e)=>{

        if(e.keyCode == '13'){
            var params = {
                status:'search',
                
            };
            if(this.state.optContent && this.state.optType){
                params.choice = this.state.optType
                params.keyword = this.state.optContent;
            }
            this.props.getData(
                this.state.url,
                params
            )
        }
    }

    // // 删除
    // del(_id){
    //     // this.props.getData(
    //     //     this.state.url,
    //     //     {id:_id,status:'delete'}
    //     // )
    //     $('.tabBody #'+_id).remove();
    //     console.log(_id)
        
    // }
    render(){
        if(!this.props.dataset){
            return null;
        }
        return (
            <div id="Tab" >
                <Select onSelect={this.getSelectValue.bind(this)}>
                    {this.createSelect()}
                </Select>
                <Input type="text" onChange={this.getInputValue} className="SearchIpt" />
                <Button type="primary" shape="circle" icon="search"  onClick={this.sendCondition} ></Button>
                <Button disabled={this.state.type == '1' ? '' : 'true' } type="primary" shape="circle" icon="plus-circle-o" ></Button>
                <table className="tabBox" >
                    <thead className="tabHead" >
                        <tr>
                            {
                                this.getKeys(this.props.dataset[0]).map((key, index) => {
                                    if(this.state.filerSet.indexOf(key) < 0 ){
                                        return <th key={index}>{this.state.languageExchange[key]}</th>
                                    }
                                })
                            }
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody  className="tabBody">
                        {
                            this.props.dataset.length>0 ?
                            this.props.dataset.map(function(obj, index){
                                return <tr key={index} id={obj.id} className="dataTr" >{this.getKeys(obj).map((key, idx) => {
                                        if(this.state.filerSet.indexOf(key) < 0 ){
                                            return <td key={idx}>{obj[key]}</td>
                                        }
                                    })}<td><Button type="primary" className='show'>编辑</Button><Button disabled={this.state.type == '1' ? '' : 'true' } type="danger" className="del">删除</Button></td></tr>
                            }.bind(this)) : null    
                        }
                    </tbody>
                </table>
                <Spinner show={this.props.loading}></Spinner>
                <ul className="pagination clearfix" >
                   
                </ul>
                <div className="fenye" style={{marginTop:10}}>

                    <Pagination defaultCurrent={6} total={1100}/>
                </div>
                
            </div>
        )
    }

}

const mapToState = function(state){
    console.log(state);
    return {
        dataset: state.dataGrid.response || [],
    }
}

export default connect(mapToState, dataGridAction)(DataGridComponent)