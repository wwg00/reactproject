import React from 'react';
import DataGridComponent from '../datagrid/datagridComponent';

const data = {
    url:'getGoods',
    filerSet:['bImage','sImage','description','discount','create_at','update_at'],
    states:1,
    status:'query',
    languageExchange:{
        id:'编号',
        // gid:'商品编号',
        sale:'销售量',
        details:'描述',
        oPrice:'原价',
        nPrice:'现价',
        // images:'图片路径',
        description:'名称',
        storage:'库存',
        size:'尺码',
        color:'颜色',
        type1:'类型1',
        type2:'类型2',
        type3:'类型3',
    }
}

export default class ProductsComponent extends React.Component{
    render(){
        return(
            <DataGridComponent 
                url={data.url}
                filerSet={data.filerSet}
                states={data.states}
                status={data.status}
                languageExchange={data.languageExchange}
            ></DataGridComponent>
        )
    }
}
