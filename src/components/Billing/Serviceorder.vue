<template>
	<div style="text-align: left;">
		<el-input v-model="pageInfo.name" style="width: 300px;" size="small" placeholder="请输入内容"></el-input>
		<el-button icon="el-icon-search" size="small" @click="selectConter()"></el-button>
		<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="dialogFormVisible3 = true">新增
		</el-button>
		<!-- 新增弹窗 -->
		<el-dialog title="维修开单" v-model="dialogFormVisible3" custom-class="dialogClass">
			<el-form :model="RegisterFrom" ref="RegisterFrom">
				<el-form-item>
					<div style="display: flex;">
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="kehuxunze" slot="prepend" placeholder="请选择" size="small" width="200px" filterable>
									<el-option label="餐厅名" value="1"></el-option>
									<el-option label="订单号" value="2"></el-option>
									<el-option label="用户电话" value="3"></el-option>
								</el-select>
							</p>
							<p>
								选择客户：
								<el-input style="width: 260px;" size="small"></el-input>
							</p>
						</div>
						<div style="border: #2C3E50 solid 1px;width: 360px;">
							<p>
								选择客户：
								<el-select v-model="kehuxunze" slot="prepend" placeholder="请选择" size="small">
									<el-option label="餐厅名" value="1"></el-option>
									<el-option label="订单号" value="2"></el-option>
									<el-option label="用户电话" value="3"></el-option>
								</el-select>
							</p>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false" size="small">关 闭</el-button>
					<el-button type="primary" @click="insertReturn()" size="small">保 存</el-button>
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
					<el-button type="primary" size="small">删除</el-button>
					<el-button type="primary" size="small">修改</el-button>
					<el-button type="primary" size="small">收款</el-button>
					<el-button type="primary" size="small">转维修</el-button>
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
					<p v-if="scope.row.mainorderstuta=='0'" style="background-color: #333333;color: #FFFFFF;">已收款</p>
					<p v-if="scope.row.mainorderstuta=='1'" style="background-color: #ffff00;color: #FFFFFF;">已完成</p>
					<p v-if="scope.row.mainorderstuta=='2'" style="background-color: #ff0000;color: #FFFFFF;">已登记</p>
					<p v-if="scope.row.mainorderstuta=='3'" style="background-color: #e2e2e2;color: #2C3E50;">已登记</p>
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
				mainbillingData:[],
				multipleSelection: [],
				multipleSelection2: [],
				dialogFormVisible3: false,
				dialogFormVisible: false,
				dialogFormVisible2: false,
				newborder: "1px solid #152036",
				newcolor: "#999",
				newcursor: 'default',
				pageInfo: {
					currentPage: 1, //当前页数，由用户指定
					pagesize: 3, //每页显示的条数
					total: 0, //总记录条数，数据库查出来的
					name:''
				},
				ReturnvisitFrom: {
					
				}
			}
		},
		methods: {
			selectConter() {
					const _this = this
					console.log(this.pageInfo)
					this.axios.get("http://localhost:8081/asms/selectMainbilling")
						.then(function(response) {
							_this.mainbillingData = response.data
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
			},
			// 修改咨询登记
			updateRegister() {
				const _this = this
				this.axios.put("http://localhost:8089/tsm/updateRegister", this.RegisterFrom,{
					headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
							}
				})
					.then(function(response) {
						console.log(response)
						console.log("显示")
						_this.selectConter()
						_this.dialogFormVisible2 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			//批量删除咨询登记
			delRegister(registerId, deletename) {
				this.RegisterFrom.registerId = registerId;
				this.RegisterFrom.deletename = deletename;
				const _this = this
				this.axios.put("http://localhost:8089/tsm/updateRegisterTimeLiness", this.RegisterFrom,{
					headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
							}
				})
					.then(function(response) {
						console.log("删除成功")
						_this.selectConter()
					}).catch(function(error) {
						// console.log("dddddddddd")
						console.log(error)
					})
			},
			// 批量删除回访记录按钮
			delReturnPL() {
				console.log(this.multipleSelection2.length)
				if (this.multipleSelection2.length === 0) {
					alert("请选择删除的咨询信息！")
				} else {
					this.multipleSelection2.forEach(item => {
						this.delReturn(item.returnvisitId, "dsb")
					});
				}
				// this.dialogFormVisible2 = true
			},
			// 批量删除回访记录
			delReturn(returnvisitId, deletename) {
				this.ReturnvisitFrom.returnvisitId = returnvisitId;
				this.ReturnvisitFrom.deletename = deletename;
				const _this = this
				this.axios.put("http://localhost:8089/tsm/updateReturnVisitTimeLiness", this.ReturnvisitFrom,{
					headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
							}
				})
					.then(function(response) {
						console.log("删除回访记录")
						_this.selectConter()
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 修改现实
			showRegister(row) {
				console.log("编辑")
				this.RegisterFrom.registerId = row.registerId
				this.RegisterFrom.source = row.source
				this.RegisterFrom.course.courseId = row.courseId
				this.RegisterFrom.detailcourse = row.detailcourse
				this.RegisterFrom.emp = row.emp
				this.RegisterFrom.phone = row.phone
				this.RegisterFrom.sex = row.sex
				this.RegisterFrom.consultant = row.consultant
				this.RegisterFrom.attentstate = row.attentstate
				this.RegisterFrom.paystate = row.paystate
				this.RegisterFrom.consultcontent = row.consultcontent
				// this.XiangXiGGDialog = true
				this.dialogFormVisible2 = true
				console.log(row.courseId)
			},
			// 添加咨询登记
			insertRegister() {
				const _this = this
				this.axios.post("http://localhost:8089/tsm/addRegister", this.RegisterFrom, {
						params: this.pageInfo,
						headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
								}
					})
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.selectConter()
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible = false
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.selectConter()
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.selectConter()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = val;
			},
			//批量删除按钮
			delRegisterPL() {
				console.log(this.multipleSelection.length)
				if (this.multipleSelection.length === 0) {
					alert("请选择删除的咨询信息！")
				} else {
					this.multipleSelection.forEach(item => {
						this.delRegister(item.registerId, "dsb")
					});
				}
				// this.dialogFormVisible2 = true
			},
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
