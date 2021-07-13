<template>
	<div style="text-align: left;">
		<el-input v-model="name" style="width: 300px;" size="small" placeholder="请输入内容"></el-input>
		<el-button icon="el-icon-search" size="small" @click="selectConter()"></el-button>
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
								<el-select v-model="maintenanceappFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择维修类型：
								<el-select v-model="maintenanceappFrom.serviceid" value-key="serviceid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in serviceData2" :key="item.serviceid" :label="item.servicename"
										:value="item.serviceid">
									</el-option>
								</el-select>
							</p>
							<p>
								车牌号：
								<el-select v-model="maintenanceappFrom.carid" value-key="carid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid" :label="item.chepai"
										:value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="maintenanceappFrom.empid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="maintenanceappFrom.xiangmuid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid" :label="item.projectname"
										:value="item.pid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择材料：
								<el-select v-model="maintenanceappFrom.cailiaoid" value-key="coId" placeholder="请选择"
									size="mini">
									<el-option v-for="item in cailiaoData6" :key="item.coId" :label="item.coName"
										:value="item.coId">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="maintenanceappFrom.mendianid" value-key="sid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in storeData7" :key="item.sid" :label="item.sname"
										:value="item.sid">
									</el-option>
								</el-select>
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
								<el-input type="date" v-model="maintenanceappFrom.yujisetcar" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								预约交车时间：
								<el-input  type="date" v-model="maintenanceappFrom.yujisetcartime" style="width: 260px;" size="small"></el-input>
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
					<el-button type="primary" @click="addmaintenanceapp()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog title="预约开单" v-model="dialogFormVisible" custom-class="dialogClass">
			<el-form :model="maintenanceappFrom" ref="maintenanceappFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="maintenanceappFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择维修类型：
								<el-select v-model="maintenanceappFrom.serviceid" value-key="serviceid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in serviceData2" :key="item.serviceid" :label="item.servicename"
										:value="item.serviceid">
									</el-option>
								</el-select>
							</p>
							<p>
								车牌号：
								<el-select v-model="maintenanceappFrom.carid" value-key="carid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid" :label="item.chepai"
										:value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="maintenanceappFrom.empid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="maintenanceappFrom.xiangmuid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid" :label="item.projectname"
										:value="item.pid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择材料：
								<el-select v-model="maintenanceappFrom.cailiaoid" value-key="coId" placeholder="请选择"
									size="mini">
									<el-option v-for="item in cailiaoData6" :key="item.coId" :label="item.coName"
										:value="item.coId">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="maintenanceappFrom.mendianid" value-key="sid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in storeData7" :key="item.sid" :label="item.sname"
										:value="item.sid">
									</el-option>
								</el-select>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<P>
								预约进厂时间：
								<el-input type="date" v-model="maintenanceappFrom.yujisetcar" style="width: 260px;" size="small"></el-input>
							</P>
							<P>
								预约交车时间：
								<el-input  type="date" v-model="maintenanceappFrom.yujisetcartime" style="width: 260px;" size="small"></el-input>
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
					<el-button type="primary" @click="updateAllapp()" size="small">保 存</el-button>
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
					<!-- <el-button type="primary" size="small">删除</el-button> -->
					<el-button type="primary" size="small" @click="updateAllappShow(scope.row)" :disabled="scope.row.mainorderstuta=='3'">修改</el-button>
					<el-button type="primary" size="small" @click="updatemaintenanceappmony(scope.row)" :disabled="scope.row.mainorderstuta=='3'">收款</el-button>
					<el-button type="primary" size="small" @click="addMainbillingzhuanweixiu(scope.row)" :disabled="scope.row.mainorderstuta=='0'">转维修</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="appno" label="预约单号" align="center">
			</el-table-column>
			<el-table-column prop="mainorder" label="单据日期" align="center">
			</el-table-column>
			<el-table-column prop="mainorderstuta" label="单据状态" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.mainorderstuta=='0'" style="background-color: #333333;color: #FFFFFF;">待付款</p>
					<p v-if="scope.row.mainorderstuta=='1'" style="background-color: #ffff00;color: #FFFFFF;">已完成</p>
					<p v-if="scope.row.mainorderstuta=='2'" style="background-color: #ff0000;color: #FFFFFF;">已登记</p>
					<p v-if="scope.row.mainorderstuta=='3'" style="background-color: #e2e2e2;color: #2C3E50;">已收款</p>
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
				serviceData2:[],
				customerData3:[],
				empData4:[],
				projectsettingsData5:[],
				cailiaoData6:[],
				storeData7:[],
				maintenanceappData8:[],
				dialogFormVisible3: false,
				dialogFormVisible: false,
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
					beizhu:'',
					service:{},
					customer:{},
					emp:{},
					projectsettings:{},
					commodity:{},
					store:{},
					carmanagement:{}
				},
				MainbillingFrom:{
					mainbillingid:'',
					service:{},
					serviceid:'',
					maintenanceapp:{},
					maintenanceappid:'',
					customer:{},
					kehuid:'',
					emp:{},
					empid:'',
					projectsettings:{},
					xiangmuid:'',
					commodity:{},
					cailiaoid:'',
					store:{},
					mendianid:'',
					carmanagement:{},
					chepai:'',
					mainbillingno:'',
					mainorder:'',
					mainorderstuta:'',
					yujisetcar:'',
					yujisetcartime:'',
					kehudepict:'',
					suichewup:'',
					favourable:'',
					yujiallmony:'',
					overmonytime:'',
					orfanxiu:'',
					beizhu:''
				}
			}
		},
		methods: {
			// 修改显示
			updateAllappShow(row){
				const _this = this
				this.dialogFormVisible = true
				this.maintenanceappFrom.maintenanceappid = row.maintenanceappid
				this.maintenanceappFrom.appno = row.appno
				this.maintenanceappFrom.serviceid = row.serviceid
				this.maintenanceappFrom.carid = row.carid
				this.maintenanceappFrom.kehuid = row.kehuid
				this.maintenanceappFrom.empid = row.empid
				this.maintenanceappFrom.xiangmuid = row.xiangmuid
				this.maintenanceappFrom.cailiaoid = row.cailiaoid
				this.maintenanceappFrom.mendianid = row.mendianid
				this.maintenanceappFrom.mainorder = row.mainorder
				this.maintenanceappFrom.mainorderstuta = row.mainorderstuta
				this.maintenanceappFrom.yujiallmony = row.yujiallmony
				this.maintenanceappFrom.yujisetcar = row.yujisetcar
				this.maintenanceappFrom.yujisetcartime = row.yujisetcartime
				this.maintenanceappFrom.kehudepict = row.kehudepict
				this.maintenanceappFrom.shiyucause = row.shiyucause
				this.maintenanceappFrom.beizhu = row.beizhu
			},
			// 修改方法
			updateAllapp() {
				const _this = this
				console.log(this.maintenanceappFrom.maintenanceappid);
				this.maintenanceappFrom.maintenanceappid = this.maintenanceappFrom.maintenanceappid
				this.axios.put("http://localhost:8081/asms/updateAllapp", this.maintenanceappFrom)
					.then(function(response) {
						console.log(response)
						_this.axios.get("http://localhost:8081/asms/selectByPrimaryKey")
							.then(function(response) {
								_this.maintenanceappData = response.data
								// _this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 修改收款状态
			updatemaintenanceappmony(row){
				const _this = this
				this.maintenanceappFrom.maintenanceappid = row.maintenanceappid
				this.axios.put("http://localhost:8081/asms/updatemaintenanceappmony", this.maintenanceappFrom)
					.then(function(response) {
						console.log("输出修改："+response.data)
						_this.axios.get("http://localhost:8081/asms/selectByPrimaryKey")
							.then(function(response) {
								_this.maintenanceappData = response.data
								// _this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 转维修
			addMainbillingzhuanweixiu(row){
				const _this = this
				this.MainbillingFrom.maintenanceappid=row.maintenanceappid
				this.MainbillingFrom.serviceid=row.serviceid
				this.MainbillingFrom.chepai=row.carid
				console.log(row.carid+'=======================')
				this.MainbillingFrom.kehuid=row.kehuid
				this.MainbillingFrom.empid=row.empid
				this.MainbillingFrom.xiangmuid=row.xiangmuid
				this.MainbillingFrom.cailiaoid=row.cailiaoid
				this.MainbillingFrom.mendianid=row.mendianid
				this.axios.post("http://localhost:8081/asms/insertMainbilling", this.MainbillingFrom)
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.updatemaintenanceapp(row)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 改状态
			updatemaintenanceapp(row){
				const _this = this
				this.maintenanceappFrom.maintenanceappid = row.maintenanceappid
				this.axios.put("http://localhost:8081/asms/updatemaintenanceapp", this.maintenanceappFrom)
					.then(function(response) {
						console.log("输出修改："+response.data)
						_this.axios.get("http://localhost:8081/asms/selectByPrimaryKey")
							.then(function(response) {
								_this.maintenanceappData = response.data
								// _this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
					}).catch(function(error) {
						console.log(error)
					})
			},
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
			},
			addmaintenanceapp(){
				const _this = this
				this.maintenanceappFrom.appno = "YYKD"+Date.now()
				this.axios.post("http://localhost:8081/asms/insertMaintenanceapp", this.maintenanceappFrom)
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.axios.get("http://localhost:8081/asms/selectByPrimaryKey")
							.then(function(response) {
								_this.maintenanceappData = response.data
								// _this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible3 = false
			}
		},
		created() {
			const _this = this
			// 车辆外键显示
			this.axios.get("http://localhost:8081/asms/carmanagement/findall2")
			.then(function(response){
				console.log("车辆外键显示：",response.data)
				_this.carmanagementData8 = response.data
			}).catch(function(error){
				console.log(error)
			}),
			// 门店外键显示
			this.axios.get("http://localhost:8081/asms/store/selectAll")
			.then(function(response){
				console.log("门店外键显示：",response.data)
				_this.storeData7 = response.data
			}).catch(function(error){
				console.log(error)
			}),
			// 材料外键显示
			this.axios.get("http://localhost:8081/asms/selectBycommodity")
			.then(function(response){
				console.log("材料外键显示：",response.data)
				_this.cailiaoData6 = response.data
				
			}).catch(function(error){
				console.log(error)
			}),
			// 项目外键显示
			this.axios.get("http://localhost:8081/asms/projectsettings/selectProjectsettings")
			.then(function(response){
				console.log("项目外键显示：",response.data)
				_this.projectsettingsData5 = response.data
				
			}).catch(function(error){
				console.log(error)
			}),
			// 员工外键显示
			this.axios.get("http://localhost:8081/asms/emp/findall")
			.then(function(response){
				console.log("员工外键显示：",response.data)
				_this.empData4 = response.data
				
			}).catch(function(error){
				console.log(error)
			}),
			// 客户外键显示
			this.axios.get("http://localhost:8081/asms/customer/findalls")
			.then(function(response){
				console.log("客户外键显示：",response.data)
				_this.customerData3 = response.data
				
			}).catch(function(error){
				console.log(error)
			}),
			// 维修类型
			this.axios.get("http://localhost:8081/asms/service/selectOne")
				.then(function(response) {
					_this.serviceData2 = response.data
					// _this.pageInfo.total = response.data.total
					console.log("维修类型外键显示：",response.data)
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
