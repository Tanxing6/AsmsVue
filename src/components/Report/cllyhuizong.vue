<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
			<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">材料领用汇总</div>
			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<h>业务员名称:</h>
				<el-select v-model="value" placeholder="所有业务员" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有员工" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>


				<div style="display: inline-block;margin-left: 10px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
				

			</div>
			<el-tabs type="border-card">
					<div style="border:1px solid #EBEEF5 ;margin-top: 30px;">
						<el-table ref="multipleTable" :data="tableData" show-summary border tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column width="1">
							</el-table-column>
							<el-table-column prop="djh" label="单据号" width="100">
							</el-table-column>
							<el-table-column prop="kdrq" label="开单日期" width="100">
							</el-table-column>
							<el-table-column prop="ywy" label="业务员" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ckmc" label="仓库名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="djsm" label="单据说明" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ysje" label="应收金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ssje" label="实收金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="lr" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="czy" label="操作员" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="khhy" label="客户/会员" show-overflow-tooltip>
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
				}],
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
		/* methods: {
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
		} */
	};
</script>
<style>
</style>
