<template>
	<div style="text-align: left;">
		<el-input v-model="pageInfo.c_name" style="width: 300px;" size="small" placeholder="请输入内容"></el-input>
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
					<p v-if="scope.row.mainorderstuta=='0'">已收款</p>
					<p v-if="scope.row.mainorderstuta=='1'">已完成</p>
					<p v-if="scope.row.mainorderstuta=='2'">已登记</p>
				</template>
			</el-table-column>
			<el-table-column prop="chepai" label="车牌号" align="center">
			</el-table-column>
			<el-table-column prop="c_name" label="联系人" align="center">
			</el-table-column>
			<el-table-column prop="c_phone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="servicename" label="维修类型" align="center">
			</el-table-column>
			<el-table-column prop="workHours" label="预计工时" align="center">
			</el-table-column>
			<el-table-column prop="custAccountPrcie" label="预计工时费" align="center">
			</el-table-column>
			<el-table-column prop="cusprice" label="预计材料费" align="center">
			</el-table-column>
			<el-table-column prop="yujiallmony" label="预计总价" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcar" label="预计进厂时间" align="center">
			</el-table-column>
			<el-table-column prop="yujisetcartime" label="预计交车时间" align="center">
			</el-table-column>
			<el-table-column prop="name" label="维修顾问" align="center">
			</el-table-column>
			<el-table-column prop="kehudepict" label="客户陈述" align="center">
			</el-table-column>
			<el-table-column prop="shiyucause" label="失约原因" align="center">
			</el-table-column>
			<el-table-column prop="beizhu" label="备注" align="center">
			</el-table-column>
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
				input3: '',
				select: '1',
				formLabelWidth: '100px',
				EmpData: [],
				SourceData: [],
				maintenanceappData:[],
				CourseData: [],
				DetailcourseData: [],
				ReturnvisitData: [],
				RegisterData: [],
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
					c_name:''
				},
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
			this.axios.get("http://localhost:8081/selectmaintenanceapp", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.maintenanceappData = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			},
			insertRegister() {
				const _this = this
				this.axios.post("http://localhost:8081/addRegister", this.maintenanceappFrom, {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log("添加成功")
						console.log(response)
						_this.selectConter()
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible3 = false
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
			}
		},
		created() {
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
