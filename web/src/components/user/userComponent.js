import React from 'react';
import DataGridComponent from '../datagrid/datagridComponent';

const data = {
    url:'getUser',
    filerSet:['integral','like_goods_id','address_id','history','create_at','update_at'],
    languageExchange:{
        id:'编号',
        username:'昵称',
        pwd:'密码',
        account:'账号',
    }
}

export default class UserComponent extends React.Component{
    render(){
        return(
            <DataGridComponent url={data.url}  filerSet={data.filerSet}languageExchange={data.languageExchange} ></DataGridComponent>
        )
    }
}