import React from 'react';
import DataGridComponent from '../datagrid/datagridComponent';

const data = {
    url:'getCart',
    filerSet:['create_at','update_at'],
    
    languageExchange:{
        id:'编号',
        user_id:'用户编号',
        goods_id:'商品编号',
        qty:'数量',
        option:'规格',
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
