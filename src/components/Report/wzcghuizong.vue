<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">物资采购汇总表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">


		<div>
			&nbsp;
			<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期" :shortcuts="shortcuts">
			</el-date-picker>
			&nbsp;

			<el-input type="text" v-model="input" placeholder="请输入供货商搜索" style="width: 200px;margin-left: 20px;"></el-input>
			&nbsp;&nbsp;
			<div style="display: inline-block;margin-left: 5px;">
				<el-button icon="el-icon-search">查询</el-button>
			</div>


		</div>
		<el-tabs type="border-card" style="margin-top: 30px;">
			<div style="border:1px solid #EBEEF5 ;">
				<el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" height="450" show-summary border style="width: 100%;" @selection-change="handleSelectionChange">
					<el-table-column prop="sname" label="门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="suppliername" label="供货商" show-overflow-tooltip></el-table-column>
					<el-table-column prop="money" label="期初金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="numberd" label="采购数量" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="amout" label="采购金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="orderamount" label="预付款余额" width="100">
					</el-table-column>
					<el-table-column prop="yfamount" label="已付金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="freeAmout" label="免付金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="backnumber" label="退货数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="yfamount" label="退货金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="amountprice" label="应付金额" show-overflow-tooltip>
					</el-table-column>
				</el-table>
			</div>
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="1">
				</el-pagination>
			</div>

		</el-tabs>



	</el-tabs>
</template>
<script>
	import {
		defineComponent,
		ref
	} from 'vue'

	export default {
		data() {
			return {
				input: ref(''),
				activeName: "q",
				tableData1: [],
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
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',

			}
		},
		 methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			pages() {
					const token = JSON.parse(sessionStorage.getItem("state"));
					const _this = this;
					_this.axios({
							url: 'http://localhost:8081/asms/mainbilling/wzcghz',
							method: 'get',
						})
						.then(function(response) {
							console.log("tableData1:", response.data.data)
							_this.tableData1= response.data.data;
											_this.cphone = _this.tableData1[0].cphone
						}).catch(function(error) {
							console.log(error)
						})
				},
			} ,
			created() {
				this.pages();
			},
	};
</script>
<style>
.el-input {
	    width: 110px;
	}
</style>
