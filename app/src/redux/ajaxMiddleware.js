import http from '../utils/httpClient'
import * as constants from '../constants/mainConstants'
export function ajaxMiddleware(api){
    return function(dispatch){
        return function(action){      
            const {types, url, method = 'get', params = {}, handle} = action
       
            if(!url){
                return dispatch(action)
            }

        
            if(handle){
                api.dispatch({
                    type: 'yp_beforeRequest',
                    data:params
                })
                if(url){
                    switch(url){
                        case 'getCartList':
                                    api.dispatch({
                                        type: 'yp_setUserID',
                                        user_id: params
                
                                    })
                                  return  new Promise((resolve,reject)=>{
                                        http[method](url, params).then(res => {
                                            // console.log(res)
                                            api.dispatch({
                                                type: 'yp_requested',
                                                response: res
                        
                                            })
                                            resolve(res)
                                        })

                                  })

                        break 
                      case  'setGoodsQty':
                          return new Promise(function(resolve,reject){
                             http[method](url, params).then(res => {
                   
                                    resolve(res)
                                })
                                 
                          })
                          break;
                     case  'deleteCartGoods':
                          return new Promise(function(resolve,reject){
                             http[method](url, params).then(res => {
                   
                                    resolve(res)
                                })
                                 
                          })
                          break;
                      case  'getUserAddress':    
                            return new Promise(function(resolve,reject){
                                http[method](url, params).then(res => {
                                    api.dispatch({
                                        type: 'yp_getUserAddress',
                                        response: res
                                    })
                                    resolve(res)
                                })
                                    
                            })
                            break;
                        case  'createOrder':    
                        return new Promise(function(resolve,reject){
                            http[method](url, params).then(res => {
           
                                resolve(res)
                            })
                                
                        })
                        break;
                        case 'getUserOrder':
                             
                            http[method](url, params).then(res => {
                                // console.log(res)
                            api.dispatch({
                                type: 'yp_getCartList',
                                response: res

                            })
                        })
                        break;
                        case  'createOrder':    
                        return new Promise(function(resolve,reject){
                            http[method](url, params).then(res => {
           
                                resolve(res)
                            })
                                
                        })
                        break;
                        case 'updateOrderState':
                        return new Promise(function(resolve,reject){
                            http[method](url, params).then(res => {
           
                                resolve(res)
                            })
                                
                        })
                        case 'deleteOrder':
                        return new Promise(function(resolve,reject){
                            http[method](url, params).then(res => {
           
                                resolve(res)
                            })
                                
                        })
                        break;
                    }

                    
                }      
            }else{
                api.dispatch({
                    type: types[0],
                    data:params
                })
                if(url){
                    return new Promise((resolve, reject) => {
                        http[method](url, params).then(res => {
                            api.dispatch({
                                type:types[1],
                                response: res
                                
                            })
                            resolve(res)
                        }).catch(error => {
                            api.dispatch({
                                type: 'requestError',
                                response: error
                            })
                            reject(error)
                        })
                    })
                }
                    
                }
            }


        }
    }
