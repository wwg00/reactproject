import React from 'react';
import DataGridComponent from '../datagrid/datagridComponent';

const data = {
    url:'getComment',
    filerSet:['create_at','update_at','grade'],
    
    languageExchange:{
        id:'编号',
        user_id:'用户编号',
        goods_id:'商品编号',
        size:'尺码',
        color:'颜色',
        comment:'评价',
    }
}

export default class ProductsComponent extends React.Component{
    render(){
        return(
            <DataGridComponent 
                url={data.url}
                filerSet={data.filerSet}
                languageExchange={data.languageExchange}
            ></DataGridComponent>
        )
    }
}
