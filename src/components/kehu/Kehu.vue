<template>
	<p>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/HomeView' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/SupplierVue' }">[客户]客户资料</el-breadcrumb-item>
		</el-breadcrumb>
	</p>
	
	<div style="border: 1px solid skyblue;height: 40px;">
		&nbsp;
		<div style="float: left;margin-top: 4px;">
			
			<el-select v-model="pageInfo.sId" placeholder="所属门店" id="select1" size="small" @change="suoshufd">
				
				<el-option v-for="item in mendian" :key="item.sid" :label="item.sfullname" :value="item.sid">
				</el-option>
			</el-select>
			
			<el-select v-model="pageInfo.ctId" placeholder="客户类别" id="select1" size="small" @change="suoshufd">
				
				<el-option v-for="item in kehutype" :key="item.ctId" :label="item.ctName" :value="item.ctId">
				</el-option>
			</el-select>
			<el-select v-model="pageInfo.eId" placeholder="销售顾问" id="select1" size="small" @change="suoshufd">
				
				<el-option v-for="item in emp" :key="item.eid" :label="item.name" :value="item.eid">
				</el-option>
			</el-select>
			<h style="margin-left: 50px;"></h>
			<div style="display: inline-block;margin-right: 10px;">
				<el-input type="text" v-model="pageInfo.suppliername" placeholder="请输入客户名称" size="small"></el-input>
			</div>
			<div style="display: inline-block;margin-right: 8px;">
				<el-button type="primary" size="small" icon="el-icon-search"  @click="chaxunbyidorname">查询</el-button>
			</div>
		</div>
		&nbsp;
		<div style="float: right;line-height: 40px;">
			<el-button icon="el-icon-circle-plus-outline" type="primary" @click="addshop=true"  size="small" style="margin-top: 4px;">新增</el-button>
			
			<!-- <el-button icon="el-icon-circle-close" @click="onTableSelect(this.tableData,index)"  type="primary"  size="small">分派</el-button> -->
		</div>
		
		
	</div>

	<!-- 供货商数据列表 -->
	<el-table ref="supplierform" :data="tableData" highlight-current-row @current-change="handleCurrentChange2" tooltip-effect="dark" style="width: 100%;"
	 @selection-change="handleSelectionChange" border type="index" height="450">
		 <el-table-column type="index" label="序号" width="55">
		 </el-table-column>
		<el-table-column type="selection" width="55">
		</el-table-column>
		
		<!-- <el-table-column prop="" label="操作" width="220" >
			<template #default="scope">
				<el-button type="text" size="mini">停用</el-button>
				<el-button type="text" size="mini">查看消费记录</el-button>
				<el-button type="text" size="mini">编辑</el-button>
				<el-button type="text" size="mini">删除</el-button>
			</template>
		</el-table-column> -->
		<el-table-column prop="sname" label="所属门店"  width="150">
		</el-table-column>
		<el-table-column prop="cname" label="客户名称"  width="80">
		</el-table-column>
		<el-table-column prop="cphone" label="联系电话"  width="120">
		</el-table-column>
		<el-table-column prop="cgender" label="性别"  width="60">
		</el-table-column>
		<el-table-column prop="ccontacts" label="联系人"  width="80">
		</el-table-column>
		<el-table-column prop="ctName" label="客户类型"   width="80">
		</el-table-column>
		<el-table-column prop="savingsno" label="储值卡号"  width="120">
		</el-table-column>
		<el-table-column prop="name" label="销售顾问"  width="80">	
		</el-table-column>
		<el-table-column prop="ctext" label="备注"  width="250">
		</el-table-column>
		<el-table-column prop="cDate" label="注册时间"  width="170">
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
		<el-form :model="customer" label-width="90px" style="width: 540px;">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="customer.cName" size="small"></el-input>
					</el-form-item>
					<el-row span="2" :gutter="20">
						<el-col span="2">
							<el-form-item label="客户类型" :label-width="formLabelWidth">
								<el-select v-model="customer.ctId" placeholder="请选择" id="select1" size="small">
									<el-option v-for="item in kehutype" :key="item.ctId" :label="item.ctName" :value="item.ctId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="customer.cContacts" size="small"></el-input>
							</el-form-item>
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input v-model="customer.cPhone" size="small"></el-input>
							</el-form-item>
							
							
							
						</el-col>
						<el-col span="3">
							<el-form-item label="所属分店" :label-width="formLabelWidth">
								<el-select v-model="customer.sId" placeholder="请选择" id="select1" size="small" @change="suoshufd">
									<el-option v-for="item in mendian" :key="item.sid" :label="item.sfullname" :value="item.sid">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="性别" :label-width="formLabelWidth">
								<el-select v-model="customer.cGender" placeholder="请选择" id="select1" size="small">
									<el-option v-for="item in xinbie" :key="item.id" :label="item.cGender" :value="item.cGender">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="销售顾问" :label-width="formLabelWidth">
								<el-select v-model="customer.eId" placeholder="请选择" id="select1" size="small">
									<el-option v-for="item in emp" :key="item.eid" :label="item.name" :value="item.eid">
									</el-option>
								</el-select>
							</el-form-item>
							
						</el-col>
					</el-row>
					
					<el-form-item label="联系地址" :label-width="formLabelWidth">
						<el-input v-model="customer.cAddress" size="small"></el-input>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="customer.cText" size="small"></el-input>
					</el-form-item>
		</el-form>
		<!-- <p>车辆信息</p>
		<el-table ref="supplierform" :data="cheliang" highlight-current-row @current-change="handleCurrentChange3" tooltip-effect="dark" style="width: 100%;"
		 @selection-change="handleSelectionChange" border>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="编号" width="120">
				<template #default="scope">{{ scope.row.supplierid }}</template>
			</el-table-column>
			<el-table-column prop="" label="车牌号"  width="120">
			</el-table-column>
			<el-table-column prop="" label="品牌" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="车系" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="车型" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="车身颜色" show-overflow-tooltip>
			</el-table-column>
		</el-table> -->
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="addshop = false">取 消</el-button>
				<el-button type="primary" @click="tjkehu">确 定</el-button>
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
				
				tableData: [],
				ismoren:false,
				ismoren0:false,
				ismoren1:true,
				multipleSelection: [],
				address:[],
				customer:{
					
				},
				xgsupplierform:{
					sId: null,
					supplierid: null,
					companyid:null,
					suppliername: '',
					contacts: '',
					contactnumber: '',
					suptypeid: null,
					addressid: null,
					payablemoney: 0,
					lxaddress: '',
					money: null,
					beizhu: '',
					state:0,
					ismoren:0
				},
				dialogFormVisible: false,
				addshop: false,
				setshop:false,
				checked: false,
				moren:false,
				jinyon:false,
				kehutype:[],
				gonhuos:[],
				mendian:[],
				emp:[],
				xinbie:[{id:1,cGender:'男'},{id:2,cGender:'女'}],
				
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
					suppliername:'',
					ctId:'',
					sId:'',
					eId:''
				}
			}
		},

		methods: {
			//添加客户资料
			tjkehu(){
				var _this=this;
				if(_this.customer.cName == null){
					ElMessage.warning('客户名称不能为空');
					return;
				}
				if(_this.customer.ctId == null){
					ElMessage.warning('请选择客户类型');
					return;
				}
				if(_this.customer.sId == null){
					ElMessage.warning('请选择所属分店');
					return;
				}
				if(_this.customer.cPhone == null){
					ElMessage.warning('联系电话不能为空');
					return;
				}
				if(_this.customer.cPhone.length != 11 ){
					ElMessage.warning('输入正确的联系电话');
					return;
				}
				if(_this.customer.eId == null){
					ElMessage.warning('请选择销售顾问');
					return;
				}
				console.log("客户新增：",JSON.stringify(_this.customer));
				_this.axios({
					url:'http://localhost:8081/asms/customer/addkehu',
					method:'post',
					data:{
						kehu:JSON.stringify(_this.customer)
					}
				}).then(function(response){
					console.log(response.data)
					ElMessage.success({
						message: response.data.data,
						type: 'success'
										
					})
					_this.addshop = false;
					_this.findkehu();
				}).catch(function(error){
					console.log(error)
				})
			},
			//查询所有客户资料
			findkehu(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/customer/findall",{params:_this.pageInfo})
				.then(function(response){
					console.log("客户资料：",response.data)
					_this.tableData = response.data.list
					
				}).catch(function(error){
					console.log(error)
				})
			},
			findkehutype(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/customertype/findall")
				.then(function(response){
					console.log("客户资料：",response.data)
					_this.kehutype = response.data
					
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
		},
		created(){
			this.findkehu();
			this.findkehutype();
			this.findmendian();
			this.findemp();
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
