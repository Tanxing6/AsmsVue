<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">资金余额表</div>
	
	<el-tabs type="border-card">
			<div style="border:1px solid #EBEEF5 ;">
				<el-table ref="multipleTable" 
				:data="tableData1" 
				show-summary border 
				tooltip-effect="dark" 
				style="width: 100%;" 
				@selection-change="handleSelectionChange" 
				height="240"
				@row-click="sss"
				>
				<el-table-column
				      type="index"
				      width="50">
				    </el-table-column>
					<el-table-column prop="cname" label="所属门店" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="settlementType" label="结算方式" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="money" label="期初金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="ssje" label="收入金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="zfje" label="支出金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="qmje" label="期末金额" show-overflow-tooltip>
					</el-table-column>

				</el-table>
				
			</div>
			<h5 style="padding-top: 30px;">对账明细:{{zffs}}</h5>
			<div style="border:1px solid #EBEEF5 ;">
				<el-table ref="multipleTable" 
				:data="tableData2" 
				tooltip-effect="dark" 
				style="width: 100%;"
				 @selection-change="handleSelectionChange" 
				 height="300">
				 <el-table-column
				       type="index"
				       width="50">
				     </el-table-column>
					<el-table-column prop="documentDate" label="单据日期" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="documentNumber" label="单据编号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="documentType" label="单据名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="cname" label="往来客户" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="chepai" label="车牌号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="settlementType" label="结算方式" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="orderamount" label="收入金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="paidMoney" label="支出金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="dqye" label="当前余额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="operator" label="经手人" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="remarks" label="备注" show-overflow-tooltip>
					</el-table-column>
				</el-table>
			</div>
		
	</el-tabs>


</template>

<script>
	export default {
		data() {
			return {
				tableData1: [],
				tableData2: [],
				zffs:'',
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
				ssssettlementType:"",
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
			pages() {
					const token = JSON.parse(sessionStorage.getItem("state"));
					const _this = this;
					_this.axios({
							url: 'http://localhost:8081/asms/mainbilling/zjye',
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
				sss(rows) {
				  console.log("",rows);
				  this.zffs = rows.settlementType;
				  //将选择的单据把一行的值传入
				  this.ssssettlementType = rows.settlementType;
				  this.shopfy();
				  
				},
				shopfy() {
				  this.tableData2.length = 0;
				  const token = JSON.parse(sessionStorage.getItem("state"));
				  const _this = this;
				  var fy = {
				    settlementtype: this.ssssettlementType,
				  };
				  _this
				    .axios({
				      url: "http://localhost:8081/asms/mainbilling/selectnumber",
				      method: "get",
				      params: fy,
				    })
				    .then(function (response) {
				      _this.tableData2=  response.data.data.rows;
					  
				    })
				    .catch(function (error) {
				      console.log(error);
				    });
				},
			} ,
			created() {
				this.pages();
			},
			   
	}
</script>

<style>
	.el-input {
	    width: 110px;
	}
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
