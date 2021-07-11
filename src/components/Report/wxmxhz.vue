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
				<el-select v-model="value" placeholder="单据类型" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="维修类型" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="收款状态" id="select1">
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
					 :data="tableData" 
					 show-summary
					 stripe border
					 style="width: 100%">
						<el-table-column v-if="columnHeaders[0].isShow" prop="s" label="所属门店" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[1].isShow" prop="cgsl" label="单据类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[2].isShow" prop="cgje" label="单据编号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[3].isShow" prop="xssl" label="单据日期" show-overflow-tooltip>
						</el-table-column>
						<el-table-column v-if="columnHeaders[4].isShow" prop="xsje" label="结算日期" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xscb" label="收款日期" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xslr" label="产品名称" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="mll" label="送修人" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="rq" label="联系方式" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="cgsl" label="车牌号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="cgje" label="维修顾问" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xssl" label="明细分类" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xsje" label="维修材料" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xscb" label="维修类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xslr" label="结账类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="mll" label="数量" sortable show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="rq" label="单位" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="cgsl" label="成本" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="cgje" label="单价"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xssl" label="结算金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xsje" label="收款金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xscb" label="应收金额"  show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="xslr" label="备注" show-overflow-tooltip>
						</el-table-column>			
					</el-table>
					
					<div style="float: right; margin-top: 30px;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
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
				activeNames: ['1'],
				activeName: 'second',
				tableData: [{
					s:'m',
					date: '10001',
					rq: '2021518',
					ghs: '供货商A',
					spbh: '12345',
					spmc: '苹果12promax',
					sslb: '电子产品',
					ck: '总店仓库',
					dw: '个',
					sl: '20',
					hsh: '19',
					zje: '11880',
					gg: '件',
					ys: '石墨色',
					jbr: '经办人a',
					bz: '',
					ywymc: '员工A',
					xsje: '100000',
					tkje: '58888',
					khmc: '欧阳兄',
					xshjje: '100009',
					splb: '水果',
					xssl: '20',
					zcb: '2999',
				}, {
					s:'m',
					date: '10002',
					rq: '2021518',
					ghs: '供货商B',
					spbh: '12346',
					spmc: '苹果13promax',
					sslb: '电子产品',
					ck: '总店仓库',
					dw: '个',
					sl: '20',
					hsh: '19',
					zje: '13880',
					gg: '件',
					ys: '月光银',
					jbr: '经办人b',
					bz: '',
					ywymc: '员工B',
					xsje: '200000',
					khmc: '文子酱',
					yhsje: '10010',
					splb: '电子',
					xssl: '25',
					zcb: '299999',
				}],
				 //表头信息
				            columnHeaders: [ 
				                {index: 0, title: "所属门店", isShow: true},
				                {index: 1, title: "单据类型", isShow: true},
				                {index: 2, title: "单据编号", isShow: true},
								{index: 3, title: "结算日期", isShow: true},
								{index: 4, title: "收款日期", isShow: true}
				            ],  
				            //已选择的项
				            columnSelecteds: ["所属门店","单据类型", "单据编号", "结算日期", "收款日期"],
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
			      }
		}
	};
</script>
<style>
	h {
	    font-size: 12px;
	    margin-left: 12px;
	    margin-right: 13px;
	}
	#select1{
		width: 105px;
		margin-left: 10px;
	}
</style>
