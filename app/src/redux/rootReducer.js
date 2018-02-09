import {combineReducers} from 'redux'

//在这里引入自己的reducer
import login from '../components/login/loginReducer'
import ygoodsList from '../components/y_goodsLists/goodsListReducer.js'

import L_detail from '../components/L_detail/L_detailReducer'
import L_addCart from '../components/L_addCart/L_addCartReducer'
import L_goodDetail from '../components/L_goodDetail/L_goodDetailReducer.js'
import L_comment from '../components/L_comment/L_commentReducer.js'


import mine from '../components/mine/mineReducer'
import visit from '../components/visit/visitReducer'
import setnewsite from '../components/setnewsite/setnewsiteReducer.js'
import minesite from '../components/mine_site/mine_siteReducer.js'
import cart from '../components/cart/cartReducer'
import order from '../components/order/orderReducer'
export default combineReducers({
    login,
    ygoodsList,

    L_addCart,
    L_detail,
    L_goodDetail,
    L_comment,
    mine,
    visit,
    setnewsite,
    minesite,
    cart,
    order

})

