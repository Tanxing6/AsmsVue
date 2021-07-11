// router的函数，createRouter：创建路由管理器的。createWebHashHistory：创建的模式，以锚的形式。
import { createRouter,createWebHashHistory,createWebHistory} from "vue-router"
//引进vue文件

import test1 from '../components/test1.vue'
import test2 from '../components/test2.vue'
import PurchaseWarehousing from '../components/Warehouse/PurchaseWarehousing.vue'

// 定义路由的数组
//对象，描述路径与组件的关系的
const routes=[
	//定义每个路径，对应的每个组件
	// {path:'/main',component:Mainview}
		{path:'/test1',component:test1},
	
		{path:'/test2',component:test2},
		
		{path:'/PurchaseWarehousing',component:PurchaseWarehousing},

]
const router=createRouter({
	history:createWebHistory(),
	// 简写：routes:routes-->键：值
	routes
})
// 导出
export default router