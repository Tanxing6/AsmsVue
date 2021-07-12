<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">维修明细汇表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		
			<div>
				&nbsp;
				<h style="margin-left: 20px;">查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<el-select v-model="value" placeholder="维修类型" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="维修顾问" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<h style="margin-left: 10px;">联系人：</h>
				<el-input v-model="input" placeholder="请输入联系人" style="width: 200px;"></el-input>&nbsp;&nbsp;
				<div style="display: inline-block;margin-left: 10px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
			</div>
			<div class="page">
				
			<el-tabs type="border-card" style="margin-top: 30px;">
				
				     <el-popover width="60" trigger="click" >
				                 <el-checkbox-group v-model="columnSelecteds">
				                     <el-checkbox v-for="item in columnHeaders" :label="item.title" :key="item.title" ></el-checkbox>    
				                 </el-checkbox-group>
								<el-button slot="reference" icon="el-icon-more" circle style="margin-left: 100px;"></el-button>
					</el-popover>
					 <el-table 
					 :data="tableData1" 
					 show-summary
					 stripe border
					 style="width: 100%"
					 height="450">
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
						<el-table-column label="联系方式" show-overflow-tooltip>
							{{cphone}}
						</el-table-column>
						<el-table-column prop="chepai" label="车牌号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="name" label="维修顾问" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="coName" label="维修材料" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="servicename" label="维修类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="settlementType" label="结账类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="mdTitle" label="数量" sortable show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="amout" label="单位" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="coRetailprice" label="成本" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="amountReceivable" label="单价"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="yfamount" label="结算金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="orderamount" label="收款金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="beizhu" label="备注" show-overflow-tooltip>
						</el-table-column>			
					</el-table>
					
					<div style="float: right; margin-top: 30px;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="2">
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
				cphone:'',
				activeNames: ['1'],
				activeName: 'second',
				tableData1: [],
				 //表头信息
				            columnHeaders: [ 
				                {index: 0, title: "所属门店", isShow: true},
				                {index: 1, title: "单据编号", isShow: true},
				                {index: 2, title: "单据日期", isShow: true},
								{index: 3, title: "结算日期", isShow: true},
								{index: 4, title: "客户名称", isShow: true}
				            ],  
				            //已选择的项
				            columnSelecteds: ["所属门店","单据编号", "单据日期", "结算日期", "客户名称"],
			
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
				  pages() {
				  		const token = JSON.parse(sessionStorage.getItem("state"));
				  		const _this = this;
				  		_this.axios({
				  				url: 'http://localhost:8081/asms/mainbilling/wxmxhz',
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
