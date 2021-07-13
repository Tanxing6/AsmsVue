<template>
	<div style="text-align: left;">
		<el-input v-model="pageInfo.name" style="width: 300px;" size="small" placeholder="请输入内容"></el-input>
		<el-button icon="el-icon-search" size="small" @click="selectConter()"></el-button>
		<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible3 = true">新增
		</el-button>
		<!-- 新增弹窗 -->
		<el-dialog title="预约开单" v-model="dialogFormVisible3" custom-class="dialogClass">
			<el-form :model="CarwashFrom" ref="CarwashFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="CarwashFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="CarwashFrom.eid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="CarwashFrom.sid" value-key="sid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in storeData7" :key="item.sid" :label="item.sname"
										:value="item.sid">
									</el-option>
								</el-select>
							</p>
							<p>
								备注：
								<el-input v-model="CarwashFrom.remarks" style="width: 260px;" size="small"></el-input>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								车牌号：
								<el-select v-model="CarwashFrom.carmagid" value-key="carid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid" :label="item.chepai"
										:value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="CarwashFrom.pid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid" :label="item.projectname"
										:value="item.pid">
									</el-option>
								</el-select>
							</p>
							<p>
								总价：
								<el-input v-model="CarwashFrom.amountreceivable" style="width: 260px;" size="small"></el-input>
							</p>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="insertCarwaslist()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog title="预约开单" v-model="dialogFormVisible" custom-class="dialogClass">
			<el-form :model="CarwashFrom" ref="CarwashFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="CarwashFrom.kehuid" value-key="cid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in customerData3" :key="item.cid" :label="item.cname"
										:value="item.cid">
									</el-option>
								</el-select>
							</p>
							<p>
								顾问：
								<el-select v-model="CarwashFrom.eid" value-key="eid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in empData4" :key="item.eid" :label="item.name"
										:value="item.eid">
									</el-option>
								</el-select>
							</p>
							<p>
								门店：
								<el-select v-model="CarwashFrom.sid" value-key="sid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in storeData7" :key="item.sid" :label="item.sname"
										:value="item.sid">
									</el-option>
								</el-select>
							</p>
							<p>
								备注：
								<el-input v-model="CarwashFrom.remarks" style="width: 260px;" size="small"></el-input>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								车牌号：
								<el-select v-model="CarwashFrom.carmagid" value-key="carmagid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in carmanagementData8" :key="item.carmagid" :label="item.chepai"
										:value="item.carmagid">
									</el-option>
								</el-select>
							</p>
							<p>
								选择项目：
								<el-select v-model="CarwashFrom.xiangmuid" value-key="pid" placeholder="请选择"
									size="mini">
									<el-option v-for="item in projectsettingsData5" :key="item.pid" :label="item.projectname"
										:value="item.pid">
									</el-option>
								</el-select>
							</p>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="updateAllCarwaslist()" size="small">保 存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	<div style="margin-top: 20px;">
		<el-table :data="CarwashData" border style="width: 100%">
			<el-table-column prop="carid" label="序号" align="center" fixed="left">
			</el-table-column>
			<el-table-column prop="" label="操作" width="286" align="center">
				<template #default="scope">
					<!-- <el-button type="primary" size="small">删除</el-button> -->
					<el-button type="primary" size="small" @click="updateAllCarwaslistShow(scope.row)" :disabled="scope.row.documentstatus=='1'">修改</el-button>
					<el-button type="primary" size="small" @click="updateCarwaslistSta(scope.row)" :disabled="scope.row.documentstatus=='1'">收款</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="store.sname" label="所属门店" align="center">
			</el-table-column>
			<el-table-column prop="documentnumber" label="单据编号" align="center">
			</el-table-column>
			<el-table-column prop="documentstatus" label="单据状态" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.documentstatus=='1'" style="background-color: #e2e2e2;color: #2C3E50;">已收款</p>
					<p v-if="scope.row.documentstatus=='0'" style="background-color: #ff0000;color: #FFFFFF;">已登记</p>
				</template>
			</el-table-column>
			<el-table-column prop="carmanagement.chepai" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="customer.cname" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="customer.cphone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="projectsettings.custaccountprcie" label="工时费" align="center">
			</el-table-column>
			<el-table-column prop="amountreceivable" label="应收金额" align="center">
			</el-table-column>
			<el-table-column prop="emp.name" label="服务顾问" align="center">
			</el-table-column>
			<!-- <el-table-column prop="remarks" label="备注" align="center">
			</el-table-column> -->
		</el-table>
	</div>
		<div class="block">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
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
				CarwashData:[],
				dialogFormVisible3: false,
				dialogFormVisible: false,
				pageInfo: {
					currentPage: 1,
					pagesize: 3,
					total: 0,
					name:''
				},
				CarwashFrom: {
					carid:'',
					store:{},
					sId:'',
					carmanagement:{},
					carmagid:'',
					emp:{},
					eId:'',
					projectsettings:{},
					xiangmuid:'',
					customer:{},
					kehuid:'',
					documentnumber:'',
					documentdate:'',
					documentstatus:'',
					remarks:'',
					amountreceivable:''
				}
			}
		},
		methods: {
			handleCurrentChange(page) {
				this.pageInfo.currentPage = page
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.selectConter()
			},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.selectConter()
			},
			selectConter() {
				var _this = this
				this.axios.get("http://localhost:8081/asms/selectAllCarwashlike", {
						params: this.pageInfo
					})
					.then(function(response) {
						// 数据接收
						console.log(response.data)
						_this.CarwashData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			insertCarwaslist(){
				const _this = this
				this.CarwashFrom.documentnumber = "XCKD"+Date.now()
				this.axios.post("http://localhost:8081/asms/insertCarwaslist", this.CarwashFrom)
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.selectConter()
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible3 = false
			},
			// 修改显示
			updateAllCarwaslistShow(row){
				const _this = this
				this.dialogFormVisible = true
				this.CarwashFrom.carid = row.carid
				this.CarwashFrom.sid = row.sid
				console.log("================================"+row.sid)
				this.CarwashFrom.carmagid = row.carmagid
				console.log("================================"+row.carmagid)
				this.CarwashFrom.eid = row.eid
				this.CarwashFrom.xiangmuid = row.xiangmuid
				console.log("================================"+this.CarwashFrom.xiangmuid+"------------"+row.xiangmuid)
				this.CarwashFrom.kehuid = row.kehuid
				this.CarwashFrom.documentnumber = row.documentnumber
				this.CarwashFrom.documentdate = row.documentdate
				this.CarwashFrom.documentstatus = row.documentstatus
				this.CarwashFrom.remarks = row.remarks
				this.CarwashFrom.amountreceivable = row.amountreceivable
			},
			// 修改方法
			updateAllCarwaslist() {
				const _this = this
				console.log(this.CarwashFrom.carid);
				this.CarwashFrom.carid = this.CarwashFrom.carid
				this.axios.put("http://localhost:8081/asms/updateAllCarwaslist", this.CarwashFrom)
					.then(function(response) {
						console.log(response)
						_this.selectConter()
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 修改状态
			updateCarwaslistSta(row) {
				const _this = this
				this.CarwashFrom.carid = row.carid
				this.axios.put("http://localhost:8081/asms/updateCarwaslistSta", this.CarwashFrom)
					.then(function(response) {
						console.log(response)
						_this.selectConter()
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
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
			this.selectConter()
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
