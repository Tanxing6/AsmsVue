<template>
	<p>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/HomeView' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/Huiyuan' }">[客户]会员储值</el-breadcrumb-item>
		</el-breadcrumb>
	</p>

	<div style="border: 1px solid skyblue;height: 40px;">
		&nbsp;
		<div style="float: left;margin-top: 4px;">

			<el-select v-model="pageInfo.branchnames" placeholder="所属门店"  size="small" @change="suoshufd">
				<el-option>所有门店</el-option>
				<el-option v-for="item in suptype" :key="item.branchid" :label="item.branchname" :value="item.branchname">
				</el-option>
			</el-select>
			<el-select v-model="pageInfo.branchnames" placeholder="单据状态"  size="small" @change="suoshufd">
				<el-option>全部</el-option>
				<el-option>已登记</el-option>
				<el-option>已收款</el-option>
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

		<!-- <el-table-column prop="" label="操作" width="150">
			<template #default="scope">
				<el-button type="text" size="mini">收款</el-button>
				<el-button type="text" size="mini">编辑</el-button>
				<el-button type="text" size="mini">删除</el-button>
			</template>
		</el-table-column> -->
		<el-table-column prop="sname" label="所属门店" width="180">
		</el-table-column>
		<el-table-column prop="billcode" label="单据编号" width="160">
		</el-table-column>
		<el-table-column prop="billdate" label="单据日期" width="160">
		</el-table-column>
		<el-table-column prop="" label="单据状态" width="80">
			<template #default="scope">
				<el-tag v-show="scope.row.billstate == 1" type="info">已收款</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="cname" label="客户名称" width="80">
		</el-table-column>
		<el-table-column prop="cphone" label="联系电话" width="140">
		</el-table-column>
		<el-table-column prop="address" label="地址" width="180">
		</el-table-column>
		<el-table-column prop="savingsno" label="储值卡号" width="100">
		</el-table-column>
		<el-table-column prop="storedtype" label="充值类型" width="80">
		</el-table-column>
		<el-table-column prop="storedvalue" label="充值金额" width="80">
		</el-table-column>
		<el-table-column prop="giveamount" label="赠送金额" width="80">
		</el-table-column>
		<el-table-column prop="username" label="销售顾问" width="80">
		</el-table-column>
		<el-table-column prop="remarks" label="备注" width="180">
		</el-table-column>
	</el-table>

	<div style="float: right;">
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
		 :page-size="pageInfo.pageSize" :page-sizes="[2, 3, 6, 10]" layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
	<!-- 修改商品 -->
	
	<!-- <-添加商品-> -->
	<el-dialog title="客户储值单" v-model="addshop" width="72%" >
		<el-form :model="memberStored" label-width="100px" style="width: 1040px;">
			
			<el-row span="4">
				<el-col span="2">
					<el-form-item label="客户姓名" :label-width="formLabelWidth">
						<el-select v-model="memberStored.cName" placeholder="请选择"  size="small" @change="findkehubyid">
							<el-option v-for="item in kehu" :key="item.cid" :label="item.cname" :value="item.cname">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="充值金额" :label-width="formLabelWidth">
						<el-input v-model="memberStored.storedValue" size="small"></el-input>
					</el-form-item>
					<el-form-item label="储值卡号" :label-width="formLabelWidth">
						<el-input v-model="memberStored.savingsno" size="small" :disabled="bianhao"></el-input>
					</el-form-item>
					
				</el-col>
				<el-col span="2">
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="memberStored.cPhone" size="small" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="赠送金额" :label-width="formLabelWidth">
						<el-input v-model="memberStored.giveAmount" size="small"></el-input>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="memberStored.remarks" size="small"></el-input>
					</el-form-item>
				
				</el-col>
				<el-col span="2">
					<el-form-item label="所属门店" :label-width="formLabelWidth">
						<el-select v-model="memberStored.sName" placeholder="请选择"  size="small">
							<el-option v-for="item in mendian" :key="item.sid" :label="item.sfullname" :value="item.sfullname">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="销售顾问" :label-width="formLabelWidth">
						<el-select v-model="memberStored.userName" placeholder="请选择" size="small">
							<el-option v-for="item in emp" :key="item.eid" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
				
				</el-col>
				<el-col span="3">
					
					
				</el-col>
			</el-row>
		</el-form>
		<p>储值历史</p>
		<el-table ref="supplierform" :data="tableData2" highlight-current-row @current-change="handleCurrentChange2"
		 tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border height="250">
			 <el-table-column type="index" label="序号" width="55">
			 </el-table-column>
			<el-table-column prop="sname" label="所属门店" width="180">
			</el-table-column>
			<el-table-column prop="billcode" label="单据编号" width="160">
			</el-table-column>
			<el-table-column prop="billdate" label="单据日期" width="160">
			</el-table-column>
			<el-table-column prop="" label="单据状态" width="80">
				<template #default="scope">
					<el-tag v-show="scope.row.billstate == 1" type="info">已收款</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="cname" label="客户名称" width="80">
			</el-table-column>
			<el-table-column prop="cphone" label="联系电话" width="140">
			</el-table-column>
			<el-table-column prop="address" label="地址" width="180">
			</el-table-column>
			<el-table-column prop="savingsno" label="储值卡号" width="100">
			</el-table-column>
			<el-table-column prop="storedtype" label="充值类型" width="80">
			</el-table-column>
			<el-table-column prop="storedvalue" label="充值金额" width="80">
			</el-table-column>
			<el-table-column prop="giveamount" label="赠送金额" width="80">
			</el-table-column>
			<el-table-column prop="username" label="销售顾问" width="80">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" width="180">
			</el-table-column>
		</el-table>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addshop = false">取 消</el-button>
				<el-button type="primary" @click="tjsupplier">确 定</el-button>
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
				bianhao:false,
				tableData: [],
				ismoren: false,
				ismoren0: false,
				ismoren1: true,
				multipleSelection: [],
				address: [],
				memberStored: {

				},
				xgsupplierform: {
					sId: null,
					supplierid: null,
					companyid: null,
					suppliername: '',
					contacts: '',
					contactnumber: '',
					suptypeid: null,
					addressid: null,
					payablemoney: 0,
					lxaddress: '',
					money: null,
					beizhu: '',
					state: 0,
					ismoren: 0
				},
				dialogFormVisible: false,
				addshop: false,
				setshop: false,
				checked: false,
				moren: false,
				jinyon: false,
				suptype: [],
				gonhuos: [],
				kehu: [],
				tableData2:[],
				emp:[],
				mendian:[],

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
					pageSize: 3,
					total: 0,
					branchnames: "",
					suppliername: ''

				}
			}
		},

		methods: {
			tjsupplier(){
				var _this=this
				for(var a=0;a<_this.kehu.length;a++){
					if(_this.kehu[a].cname == _this.memberStored.cName){
						_this.memberStored.cId = _this.kehu[a].cid
					}
				}
				for(var b=0;b<_this.mendian.length;b++){
					if(_this.mendian[b].sName == _this.memberStored.sName){
						_this.memberStored.sId = _this.mendian[b].sid
						console.log("门店id：",_this.memberStored.sId)
					}
				}
				_this.memberStored.billCode = 'CZJL'+Date.now();
				_this.memberStored.billState = 1;
				_this.memberStored.billDate = new Date()
				
				console.log("储值单号：",JSON.stringify(_this.memberStored))
				_this.axios({
					url:'http://localhost:8081/asms/memberStored/addchuzhi',
					method:'post',
					data:{
						memberStored:JSON.stringify(_this.memberStored)
					}
				}).then(function(response){
					console.log(response.data)
					ElMessage.success({
						message: response.data.data,
						type: 'success'
										
					})
					_this.addshop = false;
					_this.findhuiyuan();
					_this.memberStored={}
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
			findemp(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/emp/findall")
				.then(function(response){
					console.log("员工资料：",response.data)
					_this.emp = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findhuiyuanbyname(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/memberStored/findallbyname",{params:_this.memberStored})
				.then(function(response){
					console.log("会员资料：",response.data)
					_this.tableData2 = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findkehubyid(){
				var _this=this;
				console.log(this.memberStored.cName)
				_this.findhuiyuanbyname();
				_this.axios.get("http://localhost:8081/asms/customer/findbycname",{params:_this.memberStored})
				.then(function(response){
					console.log("储值卡资料：",JSON.stringify(response.data))
					// _this.memberStored.cName = response.cname
					_this.memberStored.cPhone = response.data.cphone
					_this.memberStored.sName = response.data.sname
					_this.memberStored.savingsno = response.data.savingsno
					_this.memberStored.sId = response.data.sid
					if(_this.memberStored.savingsno != null){
						_this.bianhao = true;
					}else{
						_this.bianhao = false;
					}
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
			findhuiyuan(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/memberStored/findall")
				.then(function(response){
					console.log("会员资料：",response.data)
					_this.tableData = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			}
			
		},
		created() {
			this.findhuiyuan()
			this.findkehu()
			this.findemp()
			this.findmendian();
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
