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
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" show-summary border style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="djh" label="单据号" ></el-table-column>
							<el-table-column prop="kdrq" label="开单日期" ></el-table-column>
							<el-table-column prop="djlx" label="单据类型" show-overflow-tooltip></el-table-column>
							<el-table-column prop="khhy" label="客户/会员" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="bh" label="编号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dw" label="单位" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xsdj" label="销售单价" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zje" label="总金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="lr" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率%" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zcb" label="总成本" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="jbr" label="经办人" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ckmc" label="仓库名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="bz" label="备注" show-overflow-tooltip>
							</el-table-column>

						</el-table>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				
			</el-tabs>
		
		
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'second',
				tableData: [{
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
					splb:'水果',
					xssl:'20',
					zcb:'2999',
				}, {
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
					splb:'电子',
					xssl:'25',
					zcb:'299999',
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
			}
		}
	};
</script>
<style>
</style>
