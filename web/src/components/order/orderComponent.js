import React from 'react';
import DataGridComponent from '../datagrid/datagridComponent';

const data = {
    url:'getOrder',
    filerSet:['create_at','update_at','serial','method','goods_json'],
    languageExchange:{
        id:'编号',
        user_id:'用户编号',
        orderNum:'订单编号',
        state:'订单状态',
        create_at:'创建时间',
        // goods_json:'订单信息',
        total:'总金额',

    }
}

export default class OrderComponent extends React.Component{
    render(){
        return(
            <DataGridComponent url={data.url} filerSet={data.filerSet} languageExchange={data.languageExchange} ></DataGridComponent>
        )
    }
}