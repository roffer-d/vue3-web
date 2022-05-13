import store from '../store'
import * as $utils from './utils'
import {request as $request, post as $post, get as $get,requestAll as $requestAll} from './request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import custom from '../components'
import filter from './filter'
import customDirective from './directive';
import router from '../router';
import  * as icon  from "@element-plus/icons-vue";
import  "@/assets/css/common.css";

const config = {
    $utils,
    $request,
    $post,
    $get,
    $requestAll,
}

export default (app) =>{
    app.use(store)
    app.use(ElementPlus)
    app.use(custom)
    app.use(filter)
    app.use(router)
    app.use(customDirective)

    app.config.productionTip = false

    for (let key in config) {
        app.config.globalProperties[key] = config[key]
    }

    for(let key in icon){
        app.component(key,icon[key])
    }
}