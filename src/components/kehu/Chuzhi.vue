<template>
	<p>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/HomeView' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/Huiyuan' }">[客户]储值余额</el-breadcrumb-item>
		</el-breadcrumb>
	</p>

	<div style="border: 1px solid skyblue;height: 40px;">
		&nbsp;
		<div style="float: left;margin-top: 4px;">

			<el-select v-model="pageInfo.branchnames" placeholder="所属门店" size="small" @change="suoshufd">
				<el-option>所有门店</el-option>
				<el-option v-for="item in suptype" :key="item.branchid" :label="item.branchname" :value="item.branchname">
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
		<!-- <div style="float: right;line-height: 40px;">
			<el-button icon="el-icon-circle-plus-outline" type="primary" @click="addshop=true" size="small" style="margin-top: 4px;">新增</el-button>


		</div> -->


	</div>

	<!-- 供货商数据列表 -->
	<el-table ref="supplierform" :data="tableData" highlight-current-row @current-change="handleCurrentChange2"
	 tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border type="index">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column type="index" label="序号" width="55">
		</el-table-column>
		<!-- <el-table-column prop="" label="操作" show-overflow-tooltip>
			<template #default="scope">
				<el-button v-model="ismoren0">明细</el-button>
				<el-button v-model="ismoren1">换卡</el-button>
				<el-button v-model="ismoren1">清零</el-button>
			</template>
		</el-table-column> -->
		<el-table-column prop="sname" label="所属门店" width="150">
		</el-table-column>
		<el-table-column prop="cname" label="客户名称" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="cphone" label="联系电话" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="savingsno" label="储值卡号" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="symony" label="剩余余额" show-overflow-tooltip>
		</el-table-column>
	</el-table>

	<div style="float: right;">
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
		 :page-size="pageInfo.pageSize" :page-sizes="[2, 3, 6, 10]" layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
	<!-- 修改商品 -->
	
	<!-- <-添加商品-> -->
	


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
			findyue(){
				var _this=this;
				_this.axios.get("http://localhost:8081/asms/savings/findall")
				.then(function(response){
					console.log("余额资料：",response.data)
					_this.tableData = response.data
					
				}).catch(function(error){
					console.log(error)
				})
			},

		},
		created() {
			this.findyue()
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
