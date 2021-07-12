<template>
	<div style="text-align: left;">
		<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible3 = true">新增
		</el-button>
		<!-- 新增弹窗 -->
		<el-dialog title="预约开单" v-model="dialogFormVisible3" custom-class="dialogClass">
			<el-form :model="maintenanceappFrom" ref="maintenanceappFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="maintenanceappFrom.kehuid" slot="prepend" placeholder="请选择" size="small" width="200px" filterable>
									<el-option label="木比白" value="1"></el-option>
									<el-option label="订单号" value="2"></el-option>
									<el-option label="用户电话" value="3"></el-option>
								</el-select>
							</p>
							<p>
								选择类型：
								<el-input v-model="maintenanceappFrom.serviceid" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								车辆id：
								<el-input v-model="maintenanceappFrom.carid" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								顾问：
								<el-input v-model="maintenanceappFrom.empid" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								项目id：
								<el-input v-model="maintenanceappFrom.xiangmuid" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								材料id：
								<el-input v-model="maintenanceappFrom.cailiaoid" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								门店：
								<el-input v-model="maintenanceappFrom.mendianid" style="width: 260px;" size="small"></el-input>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								单据号：
								<el-input v-model="maintenanceappFrom.appno" style="width: 260px;" size="small"></el-input>
							</p>
							<p>
								总价：
								<el-input v-model="maintenanceappFrom.yujiallmony" style="width: 260px;" size="small"></el-input>
							</p>
							<P>
								预约进厂时间：
								<el-input v-model="maintenanceappFrom.yujisetcar" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								预约交车时间：
								<el-input v-model="maintenanceappFrom.yujisetcartime" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								客户描述：
								<el-input v-model="maintenanceappFrom.kehudepict" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								失约原因：
								<el-input v-model="maintenanceappFrom.shiyucause" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								备注：
								<el-input v-model="maintenanceappFrom.beizhu" style="width: 260px;" size="small"></el-input>
							</P>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="insertRegister()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div style="margin-top: 20px;">
		<el-table :data="maintenanceappData" height="500" border style="width: 100%">
			<el-table-column prop="maintenanceappid" label="序号" align="center" fixed="left">
			</el-table-column>
			<el-table-column prop="name" label="操作" width="286" align="center">
				<template #default="scope">
					<el-button type="primary" size="small">删除</el-button>
					<el-button type="primary" size="small">修改</el-button>
					<el-button type="primary" size="small">收款</el-button>
					<el-button type="primary" size="small">转维修</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="appno" label="预约单号" align="center">
			</el-table-column>
			<el-table-column prop="mainorder" label="单据日期" align="center">
			</el-table-column>
			<el-table-column prop="mainorderstuta" label="单据状态" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.mainorderstuta=='0'" style="background-color: #333333;color: #FFFFFF;">已收款</p>
					<p v-if="scope.row.mainorderstuta=='1'" style="background-color: #ffff00;color: #FFFFFF;">已完成</p>
					<p v-if="scope.row.mainorderstuta=='2'" style="background-color: #ff0000;color: #FFFFFF;">已登记</p>
					<p v-if="scope.row.mainorderstuta=='3'" style="background-color: #e2e2e2;color: #2C3E50;">已登记</p>
				</template>
			</el-table-column>
			<el-table-column prop="carmanagement.chepai" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="customer.cname" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="customer.cphone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="service.servicename" label="维修类型" align="center">
			</el-table-column>
			<el-table-column prop="projectsettings.workhours" label="预计工时" align="center">
			</el-table-column>
			<el-table-column prop="projectsettings.custaccountprcie" label="预计工时费" align="center">
			</el-table-column>
			<el-table-column prop="commodity.cusprice" label="预计材料费" align="center">
			</el-table-column>
			<el-table-column prop="yujiallmony" label="预计总价" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcar" label="预计进厂时间" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcartime" label="预计交车时间" align="center">
			</el-table-column>
			<el-table-column prop="emp.name" label="维修顾问" align="center">
			</el-table-column>
			<el-table-column prop="kehudepict" label="客户陈述" align="center">
			</el-table-column>
			<el-table-column prop="shiyucause" label="失约原因" align="center">
			</el-table-column>
			<el-table-column prop="beizhu" label="备注" align="center">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import qs from 'qs'
	import {
		defineComponent,
		ref
	} from 'vue'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				maintenanceappData:[],
				maintenanceappData2:[],
				maintenanceappData3:[],
				maintenanceappData4:[],
				maintenanceappData5:[],
				maintenanceappData6:[],
				maintenanceappData7:[],
				maintenanceappData8:[],
				dialogFormVisible3: false,
				maintenanceappFrom: {
					maintenanceappid:'',
					serviceid:'',
					carid:'',
					kehuid:'',
					empid:'',
					xiangmuid:'',
					cailiaoid:'',
					mendianid:'',
					appno:'',
					mainorder:'',
					mainorderstuta:'',
					yujiallmony:'',
					yujisetcar:'',
					yujisetcartime:'',
					kehudepict:'',
					shiyucause:'',
					beizhu:''
				}
			}
		},
		methods: {
			selectConter() {
			const _this = this
			console.log(this.pageInfo)
			this.axios.get("http://localhost:8081/asms/selectmaintenanceapp")
				.then(function(response) {
					_this.maintenanceappData = response.data
					// _this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			}
		},
		created() {
			const _this = this
			console.log(this.pageInfo)
			// 车辆外键显示
			
			// 门店外键显示
			
			// 材料外键显示
			
			// 项目外键显示
			
			// 员工外键显示
			
			// 客户外键显示
			
			// 维修类型
			this.axios.get("http://localhost:8081/asms/service/selectOne")
				.then(function(response) {
					_this.maintenanceappData2 = response.data
					// _this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				// 显示全部
			this.axios.get("http://localhost:8081/asms/selectByPrimaryKey")
				.then(function(response) {
					_this.maintenanceappData = response.data
					// _this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
	 
	.el-select .el-input {
		width: 130px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>
