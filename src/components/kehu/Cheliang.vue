<template>
	<p>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/HomeView' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/SupplierVue' }">[客户]车辆资料</el-breadcrumb-item>
		</el-breadcrumb>
	</p>

	<div style="border: 1px solid skyblue;height: 40px;">
		&nbsp;
		<div style="float: left;margin-top: 4px;">
			<el-select v-model="pageInfo.sId" placeholder="所属门店"  size="small" @change="suoshufd">
				<el-option v-for="item in mendian" :key="item.sid" :label="item.sfullname" :value="item.sid">
				</el-option>
			</el-select>
			<h style="margin-left: 50px;"></h>
			<div style="display: inline-block;margin-right: 10px;">
				<el-input type="text" v-model="pageInfo.suppliername" placeholder="请输入客户名称" size="small"></el-input>
			</div>
			<div style="display: inline-block;margin-right: 8px;">
				<el-button type="primary" size="small" icon="el-icon-search" @click="chaxunbyidorname">查询</el-button>
			</div>
		</div>
		&nbsp;
		<div style="float: right;line-height: 40px;">
			<el-button icon="el-icon-circle-plus-outline" type="primary" @click="addshop=true" size="small" style="margin-top: 4px;">新增</el-button>
		</div>
	</div>

	<!-- 供货商数据列表 -->
	<el-table ref="supplierform" :data="tableData" highlight-current-row @current-change="handleCurrentChange2"
	 tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border height="450">
		 <el-table-column type="index" label="序号" width="55">
		 </el-table-column>
		<el-table-column type="selection" width="55">
		</el-table-column>
		<!-- <el-table-column prop="" label="操作" width="220">
			<template #default="scope" >
				<el-button type="text" size="mini">停用</el-button>
				<el-button type="text" size="mini">查看维修记录</el-button>
				<el-button type="text" size="mini">编辑</el-button>
				<el-button type="text" size="mini">删除</el-button>
			</template>
		</el-table-column> -->
		<el-table-column prop="sname" label="所属门店" width="150">
		</el-table-column>
		<el-table-column prop="cname" label="客户名称" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="cphone" label="联系电话"  width="120">
		</el-table-column>
		<el-table-column prop="chepai" label="车牌号"  width="100">
		</el-table-column>
		<el-table-column prop="bname" label="品牌" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="vsname" label="车系" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="bcname" label="车身颜色" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="daoqiyers" label="年检到期日" width="160">
		</el-table-column>
		<el-table-column prop="nextbytime" label="下次保养时间" width="180px">
		</el-table-column>
		<el-table-column prop="nextbylichen" label="下次保养里程" width="120px">
		</el-table-column>

	</el-table>

	<div style="float: right;">
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
		 :page-size="pageInfo.pageSize" :page-sizes="[2, 3, 6, 10]" layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
	<!-- 修改商品 -->
	
	<!-- <-添加商品-> -->
	<el-dialog title="基本信息" v-model="addshop">
		<el-form :model="carmanagement" label-width="100px" style="width: 640px;">
			
			
			<el-row span="2">
				<el-col span="2">
					<el-form-item label="车牌号" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.chepai" size="small"></el-input>
					</el-form-item>
					<el-form-item label="客户" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.cId" placeholder="请选择" size="small">
							<el-option v-for="item in kehu" :key="item.cid" :label="item.cname" :value="item.cid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品牌" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.bId" placeholder="请选择"  size="small" @change="suoshufd">
							<el-option v-for="item in pingpai" :key="item.bid" :label="item.bname" :value="item.bid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车系" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.vsId" placeholder="请选择"  size="small" @change="suoshufd">
							<el-option v-for="item in chexi" :key="item.vsId" :label="item.vsName" :value="item.vsId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车身颜色" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.bcId" placeholder="请选择"  size="small" @change="suoshufd">
							<el-option v-for="item in color" :key="item.bcId" :label="item.bcName" :value="item.bcId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="座位数" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.zuoweinumber" size="small"></el-input>
					</el-form-item>
					<el-form-item label="到期年检日" :label-width="formLabelWidth">
						<el-date-picker v-model="carmanagement.daoqiyers" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="下次保养时间" :label-width="formLabelWidth">
						<el-date-picker v-model="carmanagement.nextbytime" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="作业建议" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.jianyi" size="small"></el-input>
					</el-form-item>

				</el-col>
				<el-col span="3">
					<el-form-item label="车架号" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.chejiano" size="small"></el-input>
					</el-form-item>
					<el-form-item label="发动机号" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.fadongjino" size="small"></el-input>
					</el-form-item>
					<el-form-item label="所属分店" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.sId" placeholder="请选择"  size="small" @change="suoshufd">
							<el-option v-for="item in mendian" :key="item.sid" :label="item.sfullname" :value="item.sid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车辆类型" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.vId" placeholder="请选择" size="small">
							<el-option v-for="item in type" :key="item.vid" :label="item.vname" :value="item.vid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="内饰颜色" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.iId" placeholder="请选择" size="small" @change="suoshufd">
							<el-option v-for="item in neishi" :key="item.iid" :label="item.iname" :value="item.iid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="购车日期" :label-width="formLabelWidth">
						<el-date-picker v-model="carmanagement.buydate" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="最新里程" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.newlichen" size="small"></el-input>
					</el-form-item>
					<el-form-item label="下次保养里程" :label-width="formLabelWidth">
						<el-input v-model="carmanagement.nextbylichen" size="small"></el-input>
					</el-form-item>
					<el-form-item label="是否本店购买" :label-width="formLabelWidth">
						<el-select v-model="carmanagement.yesorno" placeholder="请选择" size="small" @change="suoshufd">
							<el-option v-for="item in isbendian" :key="item.id" :label="item.yesorno" :value="item.yesorno">
							</el-option>
							
						</el-select>
					</el-form-item>

				</el-col>
			</el-row>


			<el-form-item label="备注" :label-width="formLabelWidth">
				<el-input type="textarea" v-model="carmanagement.beizhu" size="small"></el-input>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addshop = false">取 消</el-button>
				<el-button type="primary" @click="addcheliang">确 定</el-button>
			</span>
		</template>
	</el-dialog>


</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				isbendian:[{id:1,yesorno:"是"},{id:2,yesorno:"否"}],
				tableData: [],
				ismoren: false,
				ismoren0: false,
				ismoren1: true,
				multipleSelection: [],
				address: [],
				carmanagement: {
					
				},

				dialogFormVisible: false,
				addshop: false,
				setshop: false,
				checked: false,
				moren: false,
				jinyon: false,
				kehu: [],
				pingpai: [],
				chexi:[],
				color:[],
				type:[],
				neishi:[],

				form: {
					name: "",
					region: ""
				},
				shortcuts: [{
					text: '最近一周',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						return [start, end]
					})(),
				}, {
					text: '最近一个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						return [start, end]
					})(),
				}, {
					text: '最近三个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						return [start, end]
					})(),
				}],
				value1: '',
				value2: '',
				pageInfo: {
					currentPage: 1,
					pageSize: 10,
					total: 0,
					branchnames: "",
					suppliername: ''

				}
			}
		},

		methods: {
			findneishi(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/interiorcolor/findall")
				.then(function(response){
					console.log("内饰：",response.data)
					_this.neishi = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findtype(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/vehicletype/findall")
				.then(function(response){
					console.log("类型：",response.data)
					_this.type = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findcolor(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/color/findall")
				.then(function(response){
					console.log("颜色：",response.data)
					_this.color = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findchexi(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/series/findall")
				.then(function(response){
					console.log("车系：",response.data)
					_this.chexi = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findpingpai(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/brand/findall")
				.then(function(response){
					console.log("品牌：",response.data)
					_this.pingpai = response.data
					console.log(_this.pingpai)
				}).catch(function(error){
					console.log(error)
				})
			},
			findcheliang(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/carmanagement/findall",{params:_this.pageInfo})
				.then(function(response){
					console.log("车辆资料：",response.data)
					_this.tableData = response.data.list
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findmendian(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/store/selectAll")
				.then(function(response){
					console.log("门店资料：",response.data)
					_this.mendian = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			addcheliang(){
				var _this=this;
				console.log("车辆新增：",JSON.stringify(_this.carmanagement));
				_this.axios({
					url:'http://localhost:8081/asms/carmanagement/addcheliang',
					method:'post',
					data:{
						kehu:JSON.stringify(_this.carmanagement)
					}
				}).then(function(response){
					console.log(response.data)
					ElMessage.success({
						message: response.data.data,
						type: 'success'
										
					})
					_this.addshop = false;
					_this.findcheliang();
				}).catch(function(error){
					console.log(error)
				})
			},
			findkehu(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/customer/findalls")
				.then(function(response){
					console.log("客户资料：",response.data)
					_this.kehu = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},

		},
		created() {
			this.findkehu()
			this.findcheliang()
			this.findmendian()
			this.findchexi()
			this.findcolor()
			this.findneishi()
			this.findpingpai()
			this.findtype()
		}

	}
</script>

<style>
	#aaa {
		width: 150px;
		margin-left: 30px;
	}

	#select1 {
		width: 100px;

	}

	#select2 {
		width: 50px;

	}

	h {
		font-size: 12px;
	}

	#input_1 {
		margin-left: -130px;
	}
</style>
