<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">物资采购汇总表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="商品基本排行" name="q">

			<div>
				&nbsp;
				<h>时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<h>所属分店</h>
				<el-select v-model="value" placeholder="分店名称" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<h>所有仓库</h>
				<el-select v-model="value" placeholder="所有仓库" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<h>商品名称</h>
				<el-select v-model="value" placeholder="" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				&nbsp;&nbsp;
				<div style="display: inline-block;margin-left: 5px;">
					<el-button icon="el-icon-search">搜索</el-button>
				</div>


			</div>
			<el-tabs type="border-card" style="margin-top: 30px;">
				<el-tab-pane label="销售基本排行">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="djh" label="商品编号" show-overflow-tooltip></el-table-column>
							<el-table-column prop="kdrq" label="商品名称" show-overflow-tooltip></el-table-column>
							<el-table-column prop="djlx" label="单位" show-overflow-tooltip></el-table-column>
							<el-table-column prop="khhy" label="销售数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="bh" label="当前库存" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="spmc" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率%" show-overflow-tooltip>
							</el-table-column>

						</el-table>
					</div>
					<div style="width: 100%; height: 50px;">
						<h>品种合计：</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="进货参考表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="spbh" label="商品编号" width="100">
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" width="120">
							</el-table-column>
							<el-table-column prop="dw" label="单位" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ggxh" label="规格型号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ys" label="颜色" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ghs" label="供货商" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ckjhsl" label="参考进货数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dqkcsl" label="当前库存数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="tjrq" label="添加日期" show-overflow-tooltip>
							</el-table-column>

						</el-table>
					</div>
					<div style="width: 100%; height: 50px;">
						<h>记录数：</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="退货参考表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="spbh" label="商品编号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dw" label="单位" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ggxh" label="规格型号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ys" label="颜色" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ghs" label="供货商" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ckthsl" label="参考退货数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dqkcsl" label="当前库存数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="tjrq" label="添加日期" show-overflow-tooltip>
							</el-table-column>


						</el-table>
					</div>
					<div style=" width: 100%; height: 50px;">
						<h>记录数:</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>

			</el-tabs>
		</el-tab-pane>
		<el-tab-pane label="商品分类排行" name="w">
			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<h>所属分店</h>
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<h>仓库</h>
				<el-select v-model="value" placeholder="所有仓库" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="商品名称" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<h>商品类别</h>
				<el-select v-model="value" placeholder="所有类别" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div style="display: inline-block;margin-left: 10px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%;margin-top: 30px;" >
				<el-table-column prop="spbh" label="商品编号">
				</el-table-column>
				<el-table-column prop="spmc" label="商品名称">
				</el-table-column>
				<el-table-column prop="dw" label="单位">
				</el-table-column>
				<el-table-column prop="xssl" label="销售数量">
				</el-table-column>
				<el-table-column prop="zxse" label="总销售额">
				</el-table-column>
				<el-table-column prop="dqkc" label="当前库存">
				</el-table-column>
				<el-table-column prop="lr" label="利润">
				</el-table-column>
				<el-table-column prop="mll" label="毛利率(%)">
				</el-table-column>


			</el-table>
			<div style=" width: 100%; height: 50px;">
				<h>品种合计:</h>
			</div>
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
				</el-pagination>
			</div>
		</el-tab-pane>
		<el-tab-pane label="商品明细排行" name="e">

			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<h style="margin-left: 20px;margin-right: 20px;">商品编号或名称:</h>
				<el-select v-model="value" placeholder="" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>&nbsp;&nbsp;
				<h style="margin-left: 20px;margin-right: 20px;">所属分店:</h>
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>&nbsp;&nbsp;
				<div style="flmargin-left: 10px;float: right;">
					<el-button icon="el-icon-search">搜索</el-button>
				</div>
				<div style="border-bottom: 1px solid green;width: 99.5%;border-left: 1px solid green;border-right: 1px solid green;height: 60px;margin-top: 30px;">
					<el-divider content-position="left" style="display: block;height: 1px;width: 100%;margin:0;background-color: green;">
						<div style="color: green;font-size: 15px;font-weight: 500;">商品信息</div>
					</el-divider>
					<div style="margin-top: 18px;margin-left: 40px;font-size: 14px;">商品编号:</div>
					<el-input v-model="input" placeholder="请输入内容" style="width: 150px;float: left;margin-left: 120px;margin-top:-28px;"></el-input>
					<div style="margin-top: -16px;margin-left: 71px;font-size: 14px;display: block;float: left;">商品名称:</div>
					<el-input v-model="input" placeholder="请输入内容" style="width: 150px;float: left;margin-left:20px;margin-top:-28px;"></el-input>
					<div style="margin-top: -16px;margin-left: 71px;font-size: 14px;display: block;float: left;">单位:</div>
					<el-input v-model="input" placeholder="请输入内容" style="width: 150px;float: left;margin-left:20px;margin-top:-28px;"></el-input>
					<div style="margin-top: -16px;margin-left: 71px;font-size: 14px;display: block;float: left;">规格型号:</div>
					<el-input v-model="input" placeholder="请输入内容" style="width: 150px;float: left;margin-left:20px;margin-top:-28px;"></el-input>
				</div>

			</div>
			<el-tabs type="border-card" style="margin-top: 30px;">
				<el-tab-pane label="该商品按客户类型排行">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="khlx" label="客户类型" show-overflow-tooltip></el-table-column>
							<el-table-column prop="xssl" label="销售数量" show-overflow-tooltip></el-table-column>
							<el-table-column prop="xsje" label="销售金额" show-overflow-tooltip></el-table-column>	
						</el-table>
					</div>
					<div style="width: 100%; height: 50px;">
						<h>合计：</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="该商品按客户地区排行">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="khdq" label="客户地区" width="100">
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量" width="120">
							</el-table-column>
							<el-table-column prop="xsjje" label="销售金额" show-overflow-tooltip>
							</el-table-column>
							</el-table>
					</div>
					<div style="width: 100%; height: 50px;">
						<h>合计：</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="该商品按客户名称排行">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="khmc" label="客户名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xsje" label="销售金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="lr" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率(%)" show-overflow-tooltip>
							</el-table-column>
						</el-table>
					</div>
					<div style=" width: 100%; height: 50px;">
						<h>合计:</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
			
			</el-tabs>

		</el-tab-pane>
		<el-tab-pane label="商品小数客户排行" name="r">
			<div>
					&nbsp;
					<h style="margin-right: 10px;">查询时间:</h>
					<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" :shortcuts="shortcuts">
					</el-date-picker>
					&nbsp;
					<h style="margin-right: 10px;margin-left: 10px;">所属分店:</h>
					<el-select v-model="value" placeholder="所有分店" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<h style="margin-right: 10px;margin-left: 10px;" >仓库:</h>
					<el-select v-model="value" placeholder="所有仓库" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<h style="margin-right: 10px;margin-left: 10px;">商品名称</h>
					<el-select v-model="value" placeholder="" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					&nbsp;&nbsp;
					<div style="display: inline-block;margin-left: 5px;">
						<el-button icon="el-icon-search">查询</el-button>
					</div>
			
			
				</div>
						<div style="border:1px solid #EBEEF5;margin-top: 30px;">
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
								<el-table-column prop="djh" label="商品编号" show-overflow-tooltip></el-table-column>
								<el-table-column prop="kdrq" label="商品名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="djlx" label="单位" show-overflow-tooltip></el-table-column>
								<el-table-column prop="khmc" label="客户名称" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="khhy" label="销售数量" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="zxse" label="总销售额" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="spmc" label="利润" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="mll" label="毛利率%" show-overflow-tooltip>
								</el-table-column>
							</el-table>
							<div style="width: 100%; height: 70px;">
								<h>品种合计：</h>
								<div style="float: right;margin-top: 30px;">
									<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
									 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
									</el-pagination>
								</div>
							</div>
							
						</div>
						</el-tab-pane>
		<el-tab-pane label="滞销商品排行	" name="t">
			<div>
					&nbsp;
					<h style="margin-right: 10px;">查询时间:</h>
					<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" :shortcuts="shortcuts">
					</el-date-picker>
					&nbsp;
					<h style="margin-right: 10px;margin-left: 10px;">所属分店:</h>
					<el-select v-model="value" placeholder="所有分店" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<h style="margin-right: 10px;margin-left: 10px;" >仓库:</h>
					<el-select v-model="value" placeholder="所有仓库" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<h style="margin-right: 10px;margin-left: 10px;">商品名称</h>
					<el-select v-model="value" placeholder="" id="select1">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					&nbsp;&nbsp;
					<div style="display: inline-block;margin-left: 5px;">
						<el-button icon="el-icon-search">查询</el-button>
					</div>
			
			
				</div>
						<div style="border:1px solid #EBEEF5;margin-top: 30px;">
							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
								<el-table-column prop="spbh" label="商品编号" show-overflow-tooltip></el-table-column>
								<el-table-column prop="spmc" label="商品名称" show-overflow-tooltip></el-table-column>
								<el-table-column prop="qw" label="单位" show-overflow-tooltip></el-table-column>
								<el-table-column prop="cgsl" label="采购数量" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="dqkc" label="当前库存" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="zzbl" label="周转比率%" show-overflow-tooltip>
								</el-table-column>
							</el-table>
							<div style="width: 100%; height: 70px;">
								<h>品种合计：</h>
								<div style="float: right;margin-top: 30px;">
									<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
									 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
									</el-pagination>
								</div>
							</div>
							
						</div>
		</el-tab-pane>
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
					splb: '水果',
					xssl: '20',
					zcb: '2999',
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
					splb: '电子',
					xssl: '25',
					zcb: '299999',
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
