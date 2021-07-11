<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">资金余额表</div>
	
	<el-tabs type="border-card">
			<div style="border:1px solid #EBEEF5 ;">
				<el-table ref="multipleTable" :data="tableData3" show-summary border tooltip-effect="dark" style="width: 100%;height: 200px;" @selection-change="handleSelectionChange" height="200">
					<el-table-column width="1">
					</el-table-column>
					<el-table-column prop="dlDate" label="所属门店" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="agentName" label="结算方式" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="ymlb" label="期初金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="dlNumber" label="收入金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="dlYFje" label="支出金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="dlSFje" label="期末金额" show-overflow-tooltip>
					</el-table-column>

				</el-table>
				
			</div>
			<div>
				合计：
			</div>
			
		
	</el-tabs>


</template>

<script>
	export default {
		name: "YwycaigouView",
		data() {
			return {
				tableData: [],
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
				input: '',
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
					pageinfo1: {
						id: 1,
					},
				selType:'',
			}


		},
methods: {
			handleChange(val) {
				console.log(val);
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
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
			     
		}

		/* methods: {
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
			handleSizeChange(size) {
				const _this = this;
				this.pageinfo.pageSize = size
				this.axios.get('http://localhost:8099/vuebolg/documentList/cgdj', {
					params: _this.pageinfo
				}).then(function(response) {
					console.log(response.data)
					_this.tableData3 = response.data.data.list;
					_this.pageinfo.total = response.data.data.total
					console.log(_this.pageinfo.total)
					console.log("ttt:", _this.tableData3)
				}).catch(function(error) {
					console.log(error)
				})
			},
			handleCurrentChange(page) {
				const _this = this;
				// var fd={
				// 				  currentPage:_this.pageinfo.currentPage,
				// 				  pageSize:_this.pageinfo.pageSize
				// };
				this.pageinfo.currentPage = page
				this.axios.get('http://localhost:8099/vuebolg/documentList/cgdj', {
					params: _this.pageinfo
				}).then(function(response) {
					console.log(response.data)
					_this.tableData3 = response.data.data.list;
			
					_this.pageinfo.total = response.data.data.total
					console.log(_this.pageinfo.total)
					for (var i = 0; i < _this.tableData3.length; i++) {
						_this.tableData3[i].zcb = (_this.tableData3[i].invenTory * _this.tableData3[i].purchasePrice)
					}
			
					console.log("ttt:", _this.tableData3)
				}).catch(function(error) {
					console.log(error)
				})
				},
			//分页查询所有的商品 
			pages() {
				const _this = this;
				var fd = {
					currentPage: _this.pageinfo.currentPage,
					pageSize: _this.pageinfo.pageSize
				};
				_this.axios({
						url: 'http://localhost:8099/vuebolg/documentList/cgdj',
						method: 'get',
						params: fd,
					})
					.then(function(response) {
						console.log("currentPage::", response.data.data)
						_this.tableData3 = response.data.data.list;
						_this.pageinfo.total = response.data.data.total
						console.log(_this.pageinfo.total)
						console.log("ttt:", _this.tableData3)
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange1(size) {
				const _this = this;
				this.pageinfo.pageSize = size
				this.axios.get('http://localhost:8099/vuebolg/documentList/djxq', {
					params: _this.pageinfo
				}).then(function(response) {
					console.log(response.data)
					_this.tableData4 = response.data.data.list;
					_this.pageinfo.total = response.data.data.total
					console.log(_this.pageinfo.total)
					console.log("ttt:", _this.tableData4)
				}).catch(function(error) {
					console.log(error)
				})
			},
			handleCurrentChange1(page) {
				const _this = this;
				// var fd={
				// 				  currentPage:_this.pageinfo.currentPage,
				// 				  pageSize:_this.pageinfo.pageSize
				// };
				this.pageinfo.currentPage = page
				this.axios.get('http://localhost:8099/vuebolg/documentList/djxq', {
					params: _this.pageinfo
				}).then(function(response) {
					console.log(response.data)
					_this.tableData4 = response.data.data.list;
			
					_this.pageinfo.total = response.data.data.total
					console.log(_this.pageinfo.total)
					for (var i = 0; i < _this.tableData4.length; i++) {
						_this.tableData4[i].zcb = (_this.tableData4[i].invenTory * _this.tableData4[i].purchasePrice)
					}
			
					console.log("ttt:", _this.tableData4)
				}).catch(function(error) {
					console.log(error)
				})
				},
			//分页查询所有的商品 
			pages1() {
				const _this = this;
				var fd = {
					currentPage: _this.pageinfo.currentPage,
					pageSize: _this.pageinfo.pageSize
				};
				_this.axios({
						url: 'http://localhost:8099/vuebolg/documentList/djxq',
						method: 'get',
						params: fd,
					})
					.then(function(response) {
						console.log("currentPage::", response.data.data)
						_this.tableData4 = response.data.data.list;
						_this.pageinfo.total = response.data.data.total
						console.log(_this.pageinfo.total)
						console.log("ttt:", _this.tableData4)
					}).catch(function(error) {
						console.log(error)
					})
			},
			

		},
		created() {
			this.pages();
			this.pages1();
		}, */
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

	h {
		font-size: 12px;
	}

	#input_1 {
		margin-left: -130px;
	}
</style>
