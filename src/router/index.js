// router的函数，createRouter：创建路由管理器的。createWebHashHistory：创建的模式，以锚的形式。
import { createRouter,createWebHashHistory,createWebHistory} from "vue-router"
//引进vue文件
// 开单
import Carwashorder from '../components/Billing/Carwashorder.vue'
import Maintenanceapp from '../components/Billing/Maintenanceapp.vue'
import Serviceorder from '../components/Billing/Serviceorder.vue'
import Suppliessales from '../components/Billing/Suppliessales.vue'
// 客户
import Cheliang from '../components/kehu/Cheliang.vue'
import Chuzhi from '../components/kehu/Chuzhi.vue'
import Huiyuan from '../components/kehu/Huiyuan.vue'
import Jiage from '../components/kehu/Jiage.vue'
import Kehu from '../components/kehu/Kehu.vue'
// 仓库
import EarlyWarningQuery from '../components/Warehouse/EarlyWarningQuery.vue'
import InventoryQuery from '../components/Warehouse/InventoryQuery.vue'
import MaterialPickingForMaintenance from '../components/Warehouse/MaterialPickingForMaintenance.vue'
import PurchaseOrder from '../components/Warehouse/PurchaseOrder.vue'
import PurchaseReturn from '../components/Warehouse/PurchaseReturn.vue'
import PurchaseWarehousing from '../components/Warehouse/PurchaseWarehousing.vue'
// 资金
import PaymentFrom from '../components/Payment/PaymentFrom.vue'
import PaymentList from '../components/Payment/PaymentList.vue'
import ReceiptForm from '../components/Payment/ReceiptForm.vue'
import RefundOrder from '../components/Payment/RefundOrder.vue'
import WaitingList from '../components/Payment/WaitingList.vue'
// 报表
import cllyhuizong from '../components/Report/cllyhuizong.vue'
import wxmxhz from '../components/Report/wxmxhz.vue'
import wzcghuizong from '../components/Report/wzcghuizong.vue'
import wzxshuizong from '../components/Report/wzxshuizong.vue'
import xfjefenxi from '../components/Report/xfjefenxi.vue'
import yyehuizong from '../components/Report/yyehuizong.vue'
import zjyue from '../components/Report/zjyue.vue'
// 设置
import MaterialSetting from '../components/setup/MaterialSetting.vue'
import Organization from '../components/setup/Organization.vue'
import ProjectSetup from '../components/setup/ProjectSetup.vue'
import StaffSetting from '../components/setup/StaffSetting.vue'
import Supplier from '../components/setup/Supplier.vue'
import VehicleSetup from '../components/setup/VehicleSetup.vue'
import WarehouseSettings from '../components/setup/WarehouseSettings.vue'

// 定义路由的数组
//对象，描述路径与组件的关系的
const routes=[
	//定义每个路径，对应的每个组件
	// {path:'/main',component:Mainview}
	// 开单
	{path:'/Carwashorder',component:Carwashorder},
	{path:'/Maintenanceapp',component:Maintenanceapp},
	{path:'/Serviceorder',component:Serviceorder},
	{path:'/Suppliessales',component:Suppliessales},
	// 客户
	{path:'/Cheliang',component:Cheliang},
	{path:'/Chuzhi',component:Chuzhi},
	{path:'/Huiyuan',component:Huiyuan},
	{path:'/Kehu',component:Kehu},
	
	// 仓库
	{path:'/EarlyWarningQuery',component:EarlyWarningQuery},
	{path:'/InventoryQuery',component:InventoryQuery},
	{path:'/MaterialPickingForMaintenance',component:MaterialPickingForMaintenance},
	{path:'/PurchaseOrder',component:PurchaseOrder},
	{path:'/PurchaseReturn',component:PurchaseReturn},
	{path:'/PurchaseWarehousing',component:PurchaseWarehousing},
	// 资金
		{path:'/PaymentFrom',component:PaymentFrom},
		{path:'/PaymentList',component:PaymentList},
		{path:'/ReceiptForm',component:ReceiptForm},
		{path:'/RefundOrder',component:RefundOrder},
		{path:'/WaitingList',component:WaitingList},
		// 报表
		{path:'/cllyhuizong',component:cllyhuizong},
		{path:'/wxmxhz',component:wxmxhz},
		{path:'/wzcghuizong',component:wzcghuizong},
		{path:'/wzxshuizong',component:wzxshuizong},
		{path:'/xfjefenxi',component:xfjefenxi},
		{path:'/yyehuizong',component:yyehuizong},
		{path:'/zjyue',component:zjyue},
	// 设置
	{path:'/MaterialSetting',component:MaterialSetting},
	{path:'/Organization',component:Organization},
	{path:'/ProjectSetup',component:ProjectSetup},
	{path:'/StaffSetting',component:StaffSetting},
	{path:'/Supplier',component:Supplier},
	{path:'/VehicleSetup',component:VehicleSetup},
	{path:'/WarehouseSettings',component:WarehouseSettings},
	

]
const router=createRouter({
	history:createWebHistory(),
	// 简写：routes:routes-->键：值
	routes
})
// 导出
export default router