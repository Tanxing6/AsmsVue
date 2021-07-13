<template>
	<el-container>
		<el-aside width="200px">
			<el-scrollbar>
				<div>

					<!-- <img src="assets/logo2.png"/> -->
				</div>
				<el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened>
					<el-submenu index="1">
						<template #title><i class="el-icon-message"></i>开单</template>
						<el-menu-item-group>
							<router-link to="/Maintenanceapp">
								<el-menu-item index="1-1">维修预约</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Carwashorder">
								<el-menu-item index="1-2">洗车开单</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Serviceorder">
								<el-menu-item index="1-3">维修开单</el-menu-item>
							</router-link>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template #title><i class="el-icon-message"></i>客户</template>
						<el-menu-item-group>
							<router-link to="/Kehu">
								<el-menu-item index="2-1">客户资料</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Cheliang">
								<el-menu-item index="2-2">车辆资料</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Jiage">
								<el-menu-item index="2-3">会员价格</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Huiyuan">
								<el-menu-item index="2-4">会员管理</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Chuzhi">
								<el-menu-item index="2-2">储值余额</el-menu-item>
							</router-link>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template #title><i class="el-icon-message"></i>仓库</template>
						<el-menu-item-group>
							<router-link to="/PurchaseWarehousing">
								<el-menu-item index="3-1">采购入库</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/PurchaseOrder">
								<el-menu-item index="3-2">采购订单</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/PurchaseReturn">
								<el-menu-item index="3-3">销售出库</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/InventoryQuery">
								<el-menu-item index="3-4">库存查询</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/EarlyWarningQuery">
								<el-menu-item index="3-5">预警查询</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/MaterialPickingForMaintenance">
								<el-menu-item index="3-6">维修领料</el-menu-item>
							</router-link>
						</el-menu-item-group>

					</el-submenu>
					<el-submenu index="4">
						<template #title><i class="el-icon-message"></i>资金</template>
						<el-menu-item-group>
							<router-link to="/WaitingList">
								<el-menu-item index="4-1">待收款列表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/ReceiptForm">
								<el-menu-item index="4-2">收款单</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/PaymentList">
								<el-menu-item index="4-3">待付款列表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/PaymentFrom">
								<el-menu-item index="4-4">付款单</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<router-link to="/RefundOrder">
							<el-menu-item index="4-5">退款单</el-menu-item>
						</router-link>
					</el-submenu>
					<el-submenu index="5">
						<template #title><i class="el-icon-message"></i>报表</template>
						<el-menu-item-group>
							<router-link to="/cllyhuizong">
								<el-menu-item index="5-1">材料领料汇总表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/wxmxhz">
								<el-menu-item index="5-2">维修明细汇表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/wzcghuizong">
								<el-menu-item index="5-3">物资采购汇总表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/wzxshuizong">
								<el-menu-item index="5-4">物资销售汇总表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/xfjefenxi">
								<el-menu-item index="5-5">消费金额分析</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/yyehuizong">
								<el-menu-item index="5-6">营业额汇总</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/zjyue">
								<el-menu-item index="5-7">资金余额表</el-menu-item>
							</router-link>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="6">
						<template #title><i class="el-icon-message"></i>设置</template>
						<el-menu-item-group>
							<router-link to="/MaterialSetting">
								<el-menu-item index="6-1">物资设置</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Organization">
								<el-menu-item index="6-2">组织机构</el-menu-item>

							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/ProjectSetup">
								<el-menu-item index="6-3">项目设置</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/StaffSetting">
								<el-menu-item index="6-4">员工设置</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/Supplier">
								<el-menu-item index="6-5">供应商</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/VehicleSetup">
								<el-menu-item index="6-6">车辆设置</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<router-link to="/WarehouseSettings">
								<el-menu-item index="6-7">仓库设置</el-menu-item>
							</router-link>
						</el-menu-item-group>

					</el-submenu>
				</el-menu>
			</el-scrollbar>

		</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	export default {
		data() {
			return {
				// isCollapse:true
			}
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 0;
	}

	.el-header {
		border: #2C3E50 solid 1px;
		/* background-color: #2C3E50; */
		font-size: 20px;
		line-height: 60px;
		font-size: 22px;
	}

	.el-aside {
		/* background: #4591e9 !important; */
		/* background-color: #2C3E50; */
		border: #2C3E50 solid 1px;
		display: block;
		overflow-y: scroll;
		height: 100%;
	}

	.el-main {
		/* background-color: #2C3E50; */
		border: #2C3E50 solid 1px;
		color: #333;
		text-align: center;
		height: 100%;
	}

	.el-container {
		height: 100%;
	}
</style>
