<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">维修明细汇表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		
			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker size="mini" v-model="rq" type="daterange" align="right" unlink-panels
					range-separator="至" @change="rqs()" start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<el-select v-model="value" placeholder="维修类型" id="select1">
					<el-option v-for="item in selectAll1" :key="item.value" v-model="value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value1" placeholder="维修顾问" id="select1">
					<el-option v-for="item in selectAll2" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
				<h style="margin-left: 10px;">客户名称：</h>
				<el-input v-model="input" placeholder="请输入客户名称" style="width: 200px;"></el-input>&nbsp;&nbsp;
				<div style="display: inline-block;margin-left: 10px;">
					<el-button @click="flcx" icon="el-icon-search">查询</el-button>
				</div>
			</div>
			<div class="page">
				
			<el-tabs type="border-card" style="margin-top: 30px;">
					<div style="overflow: hidden;">
									 <el-checkbox-group v-model="columnSelecteds">
										 <el-checkbox v-for="item in columnHeaders" :label="item.title" :key="item.title" ></el-checkbox>    
									 </el-checkbox-group>
									
					</div>
					 <el-table 
					 :data="tableData1" 
					 show-summary
					 stripe border
					 style="width: 100%;margin-top: 30px;"
					 height="450">
					 <el-table-column
					       type="index"
					       width="50">
					     </el-table-column>
						<el-table-column v-if="columnHeaders[0].isShow" prop="sname" label="所属门店" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[1].isShow" prop="mainbilingno" label="单据编号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[2].isShow" prop="mainorder" label="单据日期" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[3].isShow" prop="overmonytime" label="结算日期" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[4].isShow" prop="cname" label="客户名称" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[5].isShow" label="联系方式" show-overflow-tooltip>
							{{cphone}}
						</el-table-column>
						<el-table-column v-if="columnHeaders[6].isShow" prop="chepai" label="车牌号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[7].isShow" prop="name" label="维修顾问" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[8].isShow" prop="coName" label="维修材料" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[9].isShow" prop="servicename" label="维修类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[10].isShow" prop="settlementType" label="结账类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="amout" label="数量" sortable show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="mdTitle" label="单位" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="coRetailprice" label="成本" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="amountReceivable" label="单价"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="yfamount" label="结算金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="orderamount" label="收款金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[11].isShow" prop="beizhu" label="备注" show-overflow-tooltip>
						</el-table-column>			
					</el-table>
					
					<div style="float: right;">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-model:currentPage="pageinfo.currentPage"
						 :page-size="pageinfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageinfo.total">
						</el-pagination>
					</div>
			</el-tabs>
			</div>
		
	</el-tabs>
</template>
<script>
	export default {
    name: 'ElTableTest',
		data() {
			return {
				input: '',
				selectAll1:[{
					key:0,
					label:'一般维修',
					value:'一般维修'
				}],
				selectAll2:[{
					key:0,
					label:'李世龙',
					value:'李世龙'
				}],
				value:'',
				value1:'',
				selType:'',
				rq: '',
				cphone:'',
				activeNames: ['1'],
				activeName: 'second',
				tableData1: [],
				tableData2: [],
				 //表头信息
				            columnHeaders: [ 
				                {index: 0, title: "所属门店", isShow: true},
				                {index: 1, title: "单据编号", isShow: true},
				                {index: 2, title: "单据日期", isShow: true},
								{index: 3, title: "结算日期", isShow: true},
								{index: 4, title: "客户名称", isShow: true},
								{index: 5, title: "联系方式", isShow: true},
								{index: 6, title: "车牌号", isShow: true},
								{index: 7, title: "维修顾问", isShow: true},
								{index: 8, title: "维修材料", isShow: true},
								{index: 9, title: "维修类型", isShow: true},
								{index: 10, title: "结账类型", isShow: true},
								{index: 11, title: "备注", isShow: true}
				            ],  
				            //已选择的项
				            columnSelecteds: ["所属门店","单据编号", "单据日期", "结算日期", "客户名称","联系方式","车牌号","维修顾问","维修材料","维修类型","结账类型","备注"],
			
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
			}
		},
		 watch: {
		        /**
		         * @title 监听列显示隐藏
		         */
		        columnSelecteds(newArrayVal) {
		            // 计算为被选中的列标题数组
		            var nonSelecteds = this.columnHeaders
		                        .filter(item => newArrayVal.indexOf(item.title) == -1) 
		                        .map(item => item.title)
		            // 根据计算结果进行表格重绘
		            this.columnHeaders.filter(item => {
		                let isNonSelected = nonSelecteds.indexOf(item.title) != -1
		                if (isNonSelected) {
		                    // 隐藏未选中的列
		                    item.isShow = false
		                    this.$nextTick(() => {
		                        this.$refs.dataTable.doLayout()
		                    })
		                } else {
		                    // 显示已选中的列
		                    item.isShow = true
		                    this.$nextTick(() => {
		                        this.$refs.dataTable.doLayout()
		                    })
		                }
		            })
		        }
		    },
		
		methods: {
			handleChange(val) {
				console.log(val);
			},
			handleCurrentChange(page) {
				const token = JSON.parse(sessionStorage.getItem("state"));
				const _this = this;
				// var fd={
				// 				  currentPage:_this.pageinfo.currentPage,
				// 				  pageSize:_this.pageinfo.pageSize
				// };
				this.pageinfo.currentPage = page
				this.axios.get('http://localhost:8081/asms/mainbilling/wxmxhz', {
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
			      getSummaries(param) {
			        const { columns, data } = param;
			        const sums = [];
			        columns.forEach((column, index) => {
			          if (index === 0) {
			            sums[index] ='合计';
			            return;
			          }
			          const values = data.map(item => Number(item[column.property]));
			          if (!values.every(value => isNaN(value))) {
			            sums[index] = values.reduce((prev, curr) => {
			              const value = Number(curr);
			              if (!isNaN(value)) {
			                return prev + curr;
			              } else {
			                return prev;
			              }
			            }, 0);
			           
			          } 
			        });
			        return sums;
			      },
				  flcx() {
				  	const token = JSON.parse(sessionStorage.getItem("state"));
				  	const _this = this
				  	var pd = {
				  		input: this.input,
				  		currentPage: this.pageinfo.currentPage,
				  		pageSize: this.pageinfo.pageSize
				  	}
				  	_this.axios({
				  			url: "http://localhost:8081/asms/mainbilling/selectByname",
				  			method: "get",
				  			params: pd,
				  			processData: false,
				  
				  		})
				  		.then(function(response) {
				  			console.log("currentPage:", response.data.data)
				  			_this.tableData1 = response.data.data.list;
				  			_this.pageinfo.total = response.data.data.total
				  		})
				  		.catch(function(error) {
				  			console.log(error);
				  		});
				  },
				  //根据选择的时间查询单据表
				  rqs(){
				  	if(this.rq != null || this.rq !=''){
				  		const token = JSON.parse(sessionStorage.getItem('state'))
				  		const _this = this;
				  		var fy = {
				  			currentPage: this.pageinfo.currentPage,
				  			pageSize: this.pageinfo.pageSize,
				  			data1:this.rq[0],
				  			data2:this.rq[1]
				  		}
				  		_this.axios({
				  			url: 'http://localhost:8081/asms/mainbilling/sjcx',
				  			method: 'post',
				  			data:fy,
				  		}).then(function(response) {	
				  			_this.tableData1.length=0
				  			console.log("response",response)
				  			_this.max1 = response.data.data.total;
				  			_this.tableData1 = response.data.data.rows;
				  			_this.num1 = _this.tableData2.length;
				  			_this.$notify({
				  			          title: '操作成功',
				  			          message: '查询成功！',
				  			          type: 'success'
				  			});
				  		}).catch(function(error) {
				  			console.log(error)
				  		})
				  	}
				  },
				  pages() {
				  		const token = JSON.parse(sessionStorage.getItem("state"));
				  		const _this = this;
				  		var fd = {
				  			currentPage: _this.pageinfo.currentPage,
				  			pageSize: _this.pageinfo.pageSize
				  		};
				  		_this.axios({
				  				url: 'http://localhost:8081/asms/mainbilling/wxmxhz',
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
	h {
	    font-size: 12px;
	    margin-left: 12px;
	    margin-right: 13px;
	}
	#select1{
		margin-left: 10px;
	}
	.el-input {
	    width: 110px;
	}
</style>
