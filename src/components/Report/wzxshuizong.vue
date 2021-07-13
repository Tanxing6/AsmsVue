<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">物资销售汇总表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">

			<div>
				<el-input type="text" v-model="input" placeholder="请输入客户名称" style="width: 200px;margin-left: 20px;"></el-input>&nbsp;&nbsp;
				<div style="display: inline-block;margin-left: 5px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
				
			</div>
			<el-tabs type="border-card" style="margin-top: 30px;">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" show-summary border style="width: 100%;" @selection-change="handleSelectionChange" height="450">
							<el-table-column
							      type="index"
							      width="50">
							    </el-table-column>
							<el-table-column prop="saleCode" label="销售单编号" ></el-table-column>
							<el-table-column prop="saleTime" label="开单日期" ></el-table-column>
							<el-table-column prop="sname" label="所属门店" show-overflow-tooltip></el-table-column>
							<el-table-column prop="cname" label="客户名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="" label="联系电话" show-overflow-tooltip>
								{{cphone}}
							</el-table-column>
							<el-table-column prop="saleNumber" label="销售数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="amout" label="成本金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="coRetailprice" label="销售金额" show-overflow-tooltip>
							</el-table-column>

						</el-table>
					</div>
					<div style="float: right;">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:currentPage="pageinfo.currentPage"
						 :page-size="pageinfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageinfo.total">
						</el-pagination>
					</div>
			</el-tabs>
		
		
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				cphone:'',
				activeName: 'second',
				tableData1: [],
				
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
				pageinfo: {
							currentPage: 1,
							pageSize: 10,
							total: 0
						},
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
			handleCurrentChange(page) {
				const token = JSON.parse(sessionStorage.getItem("state"));
				const _this = this;
				// var fd={
				// 				  currentPage:_this.pageinfo.currentPage,
				// 				  pageSize:_this.pageinfo.pageSize
				// };
				this.pageinfo.currentPage = page
				this.axios.get('http://localhost:8081/asms/mainbilling/wzxshz', {
					params: _this.pageinfo,
			
				}).then(function(response) {
					console.log(response.data)
					_this.tableData1 = response.data.data.list;
			
					_this.pageinfo.total = response.data.data.total
					console.log(_this.pageinfo.total)
					for (var i = 0; i < _this.tableData1.length; i++) {
						_this.tableData1[i].zcb = (_this.tableData1[i].invenTory * _this.tableData1[i].purchasePrice)
					}
			
					console.log("ttt:", _this.tableData1)
				}).catch(function(error) {
					console.log(error) 
				})
				},
			pages() {
					const token = JSON.parse(sessionStorage.getItem("state"));
					const _this = this;
					var fd = {
						currentPage: _this.pageinfo.currentPage,
						pageSize: _this.pageinfo.pageSize
					};
					_this.axios({
							url: 'http://localhost:8081/asms/mainbilling/wzxshz',
							method: 'get',
							params: fd,
						})
						.then(function(response) {
							console.log("currentPage::", response.data.data)
							_this.tableData1 = response.data.data.list;
							_this.pageinfo.total = response.data.data.total
											_this.cphone = _this.tableData1[0].cphone
							console.log(_this.pageinfo.total)
							console.log("ttt5:", _this.tableData1)
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
