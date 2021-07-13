<template>
	<div style="text-align: left;">
		<el-input v-model="name" style="width: 300px;" size="small" placeholder="请输入内容"></el-input>
		<el-button icon="el-icon-search" size="small" @click="selectConter()"></el-button>
		<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible3 = true">新增
		</el-button>
		<!-- 新增弹窗 -->
		<el-dialog title="维修开单" v-model="dialogFormVisible3" custom-class="dialogClass">
			<el-form :model="MainbillingFrom" ref="MainbillingFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="MainbillingFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择维修类型：
								<el-select v-model="MainbillingFrom.serviceid" value-key="serviceid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in serviceData2" :key="item.serviceid"
										:label="item.servicename" :value="item.serviceid">
									</el-option>
								</el-select>
							</p>
							<p>
								车牌号：
								<el-select v-model="MainbillingFrom.chepai" value-key="carid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid"
										:label="item.chepai" :value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="MainbillingFrom.empid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="MainbillingFrom.xiangmuid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid"
										:label="item.projectname" :value="item.pid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择材料：
								<el-select v-model="MainbillingFrom.cailiaoid" value-key="coId" placeholder="请选择"
									size="mini">
									<el-option v-for="item in cailiaoData6" :key="item.coId" :label="item.coName"
										:value="item.coId">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="MainbillingFrom.mendianid" value-key="sid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in storeData7" :key="item.sid" :label="item.sname"
										:value="item.sid">
									</el-option>
								</el-select>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								总价：
								<el-input v-model="MainbillingFrom.yujiallmony" style="width: 260px;" size="small">
								</el-input>
							</p>
							<P>
								预约进厂时间：
								<el-input type="date" v-model="MainbillingFrom.yujisetcar" style="width: 260px;"
									size="small"></el-input>
							</P>
							<P>
								预约交车时间：
								<el-input type="date" v-model="MainbillingFrom.yujisetcartime" style="width: 260px;"
									size="small"></el-input>
							</P>
							<P>
								客户描述：
								<el-input v-model="MainbillingFrom.kehudepict" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								随车物品：
								<el-input v-model="MainbillingFrom.suichewup" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								失约原因：
								<el-input v-model="MainbillingFrom.shiyucause" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								备注：
								<el-input v-model="MainbillingFrom.beizhu" style="width: 260px;" size="small">
								</el-input>
							</P>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="addMainbillingzhuanweixiu()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog title="修改信息" v-model="dialogFormVisible" custom-class="dialogClass">
			<el-form :model="MainbillingFrom" ref="MainbillingFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="MainbillingFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择维修类型：
								<el-select v-model="MainbillingFrom.serviceid" value-key="serviceid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in serviceData2" :key="item.serviceid"
										:label="item.servicename" :value="item.serviceid">
									</el-option>
								</el-select>
							</p>
							<p>
								车牌号：
								<el-select v-model="MainbillingFrom.chepai" value-key="carid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid"
										:label="item.chepai" :value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="MainbillingFrom.empid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="MainbillingFrom.xiangmuid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid"
										:label="item.projectname" :value="item.pid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择材料：
								<el-select v-model="MainbillingFrom.cailiaoid" value-key="coId" placeholder="请选择"
									size="mini">
									<el-option v-for="item in cailiaoData6" :key="item.coId" :label="item.coName"
										:value="item.coId">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="MainbillingFrom.mendianid" value-key="sid" placeholder="请选择"
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
								<el-input type="date" v-model="MainbillingFrom.yujisetcar" style="width: 260px;"
									size="small"></el-input>
							</P>
							<P>
								预约交车时间：
								<el-input type="date" v-model="MainbillingFrom.yujisetcartime" style="width: 260px;"
									size="small"></el-input>
							</P>
							<P>
								客户描述：
								<el-input v-model="MainbillingFrom.kehudepict" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								随车物品：
								<el-input v-model="MainbillingFrom.suichewup" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								失约原因：
								<el-input v-model="MainbillingFrom.shiyucause" style="width: 260px;" size="small">
								</el-input>
							</P>
							<P>
								备注：
								<el-input v-model="MainbillingFrom.beizhu" style="width: 260px;" size="small">
								</el-input>
							</P>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="updateAllMainbilling()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div style="margin-top: 20px;">
		<el-table :data="mainbillingData" height="500" border style="width: 100%">
			<el-table-column prop="mainbillingid" label="序号" align="center" fixed="left">
			</el-table-column>
			<el-table-column prop="" label="操作" width="286" align="center">
				<template #default="scope">
					<!-- <el-button type="primary" size="small">删除</el-button> -->
					<el-button type="primary" size="small" @click="updateAllMainbillingShow(scope.row)" :disabled="scope.row.mainorderstuta=='3'">修改</el-button>
					<el-button type="primary" size="small" @click="updateMainbilling(scope.row)" :disabled="scope.row.mainorderstuta=='3'">收款</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="store.sname" label="所属门店" align="center">
			</el-table-column>
			<el-table-column prop="mainbillingno" label="单据编号" align="center">
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
			<el-table-column prop="carmanagement.chejiano" label="车架号" align="center">
			</el-table-column>
			<el-table-column prop="carmanagement.newlichen" label="进厂里程" align="center">
			</el-table-column>
			<el-table-column prop="customer.cname" label="送修人" align="center">
			</el-table-column>
			<el-table-column prop="customer.cphone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="projectsettings.insideprice" label="工时费" align="center">
			</el-table-column>
			<el-table-column prop="commodity.cusprice" label="材料费" align="center">
			</el-table-column>
			<el-table-column prop="yujiallmony" label="预计总价" align="center">
			</el-table-column>
			<el-table-column prop="service.servicename" label="维修类型" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcar" label="预计进厂时间" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcartime" label="预计交车时间" align="center">
			</el-table-column>
			<el-table-column prop="suichewup" label="随车物品" align="center">
			</el-table-column>
			<el-table-column prop="kehudepict" label="客户描述" align="center">
			</el-table-column>
			<el-table-column prop="maintenanceapp.appno" label="预约单号" align="center">
			</el-table-column>
			<el-table-column prop="emp.name" label="顾问" align="center">
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
				input3: '',
				select: '1',
				formLabelWidth: '100px',
				mainbillingData: [],
				dialogFormVisible3: false,
				dialogFormVisible: false,
				MainbillingFrom: {
					mainbillingid: '',
					service: {},
					serviceid: '',
					maintenanceapp: {},
					maintenanceappid: '',
					customer: {},
					kehuid: '',
					emp: {},
					empid: '',
					projectsettings: {},
					xiangmuid: '',
					commodity: {},
					cailiaoid: '',
					store: {},
					mendianid: '',
					carmanagement: {},
					chepai: '',
					mainbillingno: '',
					mainorder: '',
					mainorderstuta: '',
					yujisetcar: '',
					yujisetcartime: '',
					kehudepict: '',
					suichewup: '',
					favourable: '',
					yujiallmony: '',
					overmonytime: '',
					orfanxiu: '',
					beizhu: ''
				}
			}
		},
		methods: {
			// 修改显示
			updateAllMainbillingShow(row){
				const _this = this
				this.dialogFormVisible = true
				this.MainbillingFrom.mainbillingid = row.mainbillingid
				this.MainbillingFrom.serviceid = row.serviceid
				this.MainbillingFrom.maintenanceappid = row.maintenanceappid
				this.MainbillingFrom.kehuid = row.kehuid
				this.MainbillingFrom.empid = row.empid
				this.MainbillingFrom.mainbillingno = row.mainbillingno
				this.MainbillingFrom.xiangmuid = row.xiangmuid
				this.MainbillingFrom.cailiaoid = row.cailiaoid
				this.MainbillingFrom.mendianid = row.mendianid
				this.MainbillingFrom.chepai = row.chepai
				this.MainbillingFrom.mainorder = row.mainorder
				this.MainbillingFrom.mainorderstuta = row.mainorderstuta
				this.MainbillingFrom.yujisetcar = row.yujisetcar
				this.MainbillingFrom.yujisetcartime = row.yujisetcartime
				this.MainbillingFrom.kehudepict = row.kehudepict
				this.MainbillingFrom.suichewup = row.suichewup
				this.MainbillingFrom.favourable = row.favourable
				this.MainbillingFrom.yujiallmony = row.yujiallmony
				this.MainbillingFrom.overmonytime = row.overmonytime
				this.MainbillingFrom.orfanxiu = row.orfanxiu
				this.MainbillingFrom.beizhu = row.beizhu
			},
			// 修改方法
			updateAllMainbilling() {
				const _this = this
				console.log(this.MainbillingFrom.mainbillingid);
				this.MainbillingFrom.mainbillingid = this.MainbillingFrom.mainbillingid
				this.axios.put("http://localhost:8081/asms/updateAllMainbilling", this.MainbillingFrom)
					.then(function(response) {
						console.log(response)
						_this.axios.get("http://localhost:8081/asms/selectMainbilling")
							.then(function(response) {
								_this.mainbillingData = response.data
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateMainbilling() {
				const _this = this
				this.MainbillingFrom.mainbillingid = row.mainbillingid
				this.axios.put("http://localhost:8081/asms/updateMainbilling", this.MainbillingFrom)
					.then(function(response) {
						console.log("输出修改：" + response.data)
						_this.axios.get("http://localhost:8081/asms/selectMainbilling")
							.then(function(response) {
								_this.mainbillingData = response.data
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
					}).catch(function(error) {
						console.log(error)
					})
			},
			addMainbillingzhuanweixiu() {
				const _this = this
				this.MainbillingFrom.maintenanceappid = 2
				this.MainbillingFrom.mainbillingno = "WXKD"+Date.now()
				this.axios.post("http://localhost:8081/asms/insertMainbilling", this.MainbillingFrom)
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.axios.get("http://localhost:8081/asms/selectMainbilling")
						.then(function(response) {
							_this.mainbillingData = response.data
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible3 = false
			},
			selectConter() {
				const _this = this
				this.axios.get("http://localhost:8081/asms/selectMainbilling")
					.then(function(response) {
						_this.mainbillingData = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 修改咨询登记

			//批量删除咨询登记

			// 批量删除回访记录按钮

			// 批量删除回访记录

			// 修改现实

			// 添加咨询登记





			//批量删除按钮

			addRegister() {
				var _this = this
				for (var key in _this.RegisterFrom) {
					delete _this.RegisterFrom[key];
				}
				this.dialogFormVisible = true;
			}
		},
		created() {
			const _this = this
			console.log(this.pageInfo)
			// 车辆外键显示
			this.axios.get("http://localhost:8081/asms/carmanagement/findall2")
				.then(function(response) {
					console.log("车辆外键显示：", response.data)
					_this.carmanagementData8 = response.data

				}).catch(function(error) {
					console.log(error)
				}),
				// 门店外键显示
				this.axios.get("http://localhost:8081/asms/store/selectAll")
				.then(function(response) {
					console.log("门店外键显示：", response.data)
					_this.storeData7 = response.data
				}).catch(function(error) {
					console.log(error)
				}),
				// 材料外键显示
				this.axios.get("http://localhost:8081/asms/selectBycommodity")
				.then(function(response) {
					console.log("材料外键显示：", response.data)
					_this.cailiaoData6 = response.data

				}).catch(function(error) {
					console.log(error)
				}),
				// 项目外键显示
				this.axios.get("http://localhost:8081/asms/projectsettings/selectProjectsettings")
				.then(function(response) {
					console.log("项目外键显示：", response.data)
					_this.projectsettingsData5 = response.data

				}).catch(function(error) {
					console.log(error)
				}),
				// 员工外键显示
				this.axios.get("http://localhost:8081/asms/emp/findall")
				.then(function(response) {
					console.log("员工外键显示：", response.data)
					_this.empData4 = response.data

				}).catch(function(error) {
					console.log(error)
				}),
				// 客户外键显示
				this.axios.get("http://localhost:8081/asms/customer/findalls")
				.then(function(response) {
					console.log("客户外键显示：", response.data)
					_this.customerData3 = response.data

				}).catch(function(error) {
					console.log(error)
				}),
				// 维修类型
				this.axios.get("http://localhost:8081/asms/service/selectOne")
				.then(function(response) {
					_this.serviceData2 = response.data
					// _this.pageInfo.total = response.data.total
					console.log("维修类型外键显示：", response.data)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8081/asms/selectMainbilling")
				.then(function(response) {
					_this.mainbillingData = response.data
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
