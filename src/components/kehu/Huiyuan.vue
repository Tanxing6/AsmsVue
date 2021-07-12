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

			<el-select v-model="pageInfo.branchnames" placeholder="所属门店" id="select1" size="small" @change="suoshufd">
				<el-option>所有门店</el-option>
				<el-option v-for="item in suptype" :key="item.branchid" :label="item.branchname" :value="item.branchname">
				</el-option>
			</el-select>
			<el-select v-model="pageInfo.branchnames" placeholder="单据状态" id="select1" size="small" @change="suoshufd">
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
	 tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border type="index">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column label="编号" width="120">
			<template #default="scope">{{ scope.row.supplierid }}</template>
		</el-table-column>
		<el-table-column prop="" label="操作" show-overflow-tooltip>
			<template #default="scope">
				<el-button v-model="ismoren0">停用</el-button>
				<el-button v-model="ismoren1">查看维修记录</el-button>
				<el-button v-model="ismoren1">编辑</el-button>
				<el-button v-model="ismoren1">删除</el-button>
			</template>
		</el-table-column>
		<el-table-column prop="" label="所属门店" width="120">
		</el-table-column>
		<el-table-column prop="" label="单据编号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="单据日期" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="单据状态" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="客户名称" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="联系电话" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="地址" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="储值卡号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="充值类型" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="充值金额" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="赠送金额" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="销售顾问" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="" label="备注" show-overflow-tooltip>
		</el-table-column>
	</el-table>

	<div style="float: right;">
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
		 :page-size="pageInfo.pageSize" :page-sizes="[2, 3, 6, 10]" layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
	<!-- 修改商品 -->
	<el-dialog title="修改供货商" v-model="setshop">
		<el-form :model="xgsupplierform" label-width="90px" style="width: 540px;">
			<el-form-item label="名称" :label-width="formLabelWidth">
				<el-input v-model="xgsupplierform.suppliername" size="small"></el-input>
			</el-form-item>
			<el-row span="2" :gutter="20">
				<el-col span="2">
					<el-form-item label="类型" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.suptypeid" placeholder="请选择" id="select1" size="small">
							<el-option v-for="item in gonhuos" :key="item.suptypeid" :label="item.supname" :value="item.suptypeid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="联系人" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.contacts" size="small"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.contactnumber" size="small"></el-input>
					</el-form-item>
					<el-form-item label="期初应付" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.money" size="small"></el-input>
					</el-form-item>
					<el-form-item label="所属分店" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.companyid" placeholder="请选择" id="select1" size="small" @change="suoshufd">

							<el-option v-for="item in suptype" :key="item.branchid" :label="item.branchname" :value="item.branchid">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col span="3">
					<el-form-item label="所属地区" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.addressid" placeholder="请选择" id="select1" size="small">
							<el-option v-for="item in address" :key="item.addressid" :label="item.address" :value="item.addressid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="默认供货商" :label-width="formLabelWidth">
						<el-checkbox @change="gbmorne" v-model="ismoren"></el-checkbox>
					</el-form-item>
					<el-form-item label="禁用" :label-width="formLabelWidth">
						<el-checkbox @change="gbjinyon" v-model="jinyon"></el-checkbox>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="联系地址" :label-width="formLabelWidth">
				<el-input v-model="xgsupplierform.lxaddress" size="small"></el-input>
			</el-form-item>
			<el-form-item label="备注" :label-width="formLabelWidth">
				<el-input type="textarea" v-model="xgsupplierform.beizhu" size="small"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="setshop = false">取 消</el-button>
				<el-button type="primary" @click="xiugaisupplier">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- <-添加商品-> -->
	<el-dialog title="客户储值单" v-model="addshop" width="72%" >
		<el-form :model="supplierform" label-width="100px" style="width: 1040px;">
			
			<el-row span="4">
				<el-col span="2">
					<el-form-item label="客户姓名" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.addressid" placeholder="请选择" id="select1" size="small">
							<el-option v-for="item in address" :key="item.addressid" :label="item.address" :value="item.addressid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="充值金额" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.lxaddress" size="small"></el-input>
					</el-form-item>
					
				</el-col>
				<el-col span="2">
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.lxaddress" size="small" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="赠送金额" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.lxaddress" size="small"></el-input>
					</el-form-item>
				
				</el-col>
				<el-col span="2">
					<el-form-item label="所属部门" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.addressid" placeholder="请选择" id="select1" size="small">
							<el-option v-for="item in address" :key="item.addressid" :label="item.address" :value="item.addressid">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="销售顾问" :label-width="formLabelWidth">
						<el-select v-model="xgsupplierform.addressid" placeholder="请选择" id="select1" size="small">
							<el-option v-for="item in address" :key="item.addressid" :label="item.address" :value="item.addressid">
							</el-option>
						</el-select>
					</el-form-item>
				
				</el-col>
				<el-col span="3">
					<el-form-item label="储值卡号" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.lxaddress" size="small" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="xgsupplierform.lxaddress" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<p>储值历史</p>
		<el-table ref="supplierform" :data="tableData2" highlight-current-row @current-change="handleCurrentChange3"
		 tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange2" border type="index" height="250">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="编号" width="120">
				<template #default="scope">{{ scope.row.supplierid }}</template>
			</el-table-column>
			<el-table-column prop="" label="操作" show-overflow-tooltip>
				<template #default="scope">
					<el-button v-model="ismoren0">停用</el-button>
					<el-button v-model="ismoren1">查看维修记录</el-button>
					<el-button v-model="ismoren1">编辑</el-button>
					<el-button v-model="ismoren1">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="" label="所属门店" width="120">
			</el-table-column>
			<el-table-column prop="" label="单据编号" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="单据日期" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="单据状态" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="客户名称" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="联系电话" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="地址" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="储值卡号" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="充值类型" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="充值金额" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="赠送金额" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="销售顾问" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="备注" show-overflow-tooltip>
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
				tableData: [],
				ismoren: false,
				ismoren0: false,
				ismoren1: true,
				multipleSelection: [],
				address: [],
				supplierform: {
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

		},
		created() {

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
