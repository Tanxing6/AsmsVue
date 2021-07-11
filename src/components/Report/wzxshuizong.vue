<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">物资销售汇总表</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="商品销售统计表" name="second">

			<div>
				&nbsp;
				<h>时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有仓库" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有操作员" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有类别" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input type="text" v-model="input" placeholder="商品名称或编号或规格型号或备注" style="width: 200px;margin-left: 20px;"></el-input>&nbsp;&nbsp;
				<div style="display: inline-block;margin-left: 5px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
				<el-button type="" @click="dialogFormVisible = true" style="margin-left: 5px;">过滤</el-button>


				<el-row>
					<el-dialog title="过滤" v-model="dialogFormVisible">
						<el-form :model="form">
							<el-form-item style="width: 313px;" label="所属分店" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="仓库" :label-width="formLabelWidth">
								<el-select v-model="form.region" placeholder="所属仓库">
									<el-option label="分店仓库" value="shanghai"></el-option>
									<el-option label="总店仓库" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>

						<template #footer>
							<span class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
				</el-row>

			</div>
			<el-tabs type="border-card">
				<el-tab-pane label="销售商品明细表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
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
					<div style="width: 100%; height: 50px;">
						<h>合计：</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="销售商品汇总表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="spbh" label="商品编号" width="100">
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" width="100">
							</el-table-column>
							<el-table-column prop="dw" label="单位" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zjghmc" label="最近供货名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zxse" label="总销售额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="lr" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率%" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zcb" label="总成本" show-overflow-tooltip>
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
				<el-tab-pane label="销售分析汇总表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="spbh" label="商品编号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dw" label="单位" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="fd" label="分店" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="ck" label="仓库" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="dqkc" label="当前库存" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xszje" label="销售总金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="xsl" label="销售量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="rkzje" label="入库总金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="rkl" label="入库量" show-overflow-tooltip>
							</el-table-column>


						</el-table>
					</div>
					<div style=" width: 100%; height: 50px;">
						<h>品种合计:</h>
					</div>
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="销售商品分类统计表">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
							<el-table-column prop="splb" label="商品类别" >
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量" >
							</el-table-column>
							<el-table-column prop="zxse" label="总销售额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="lr" label="利润" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="mll" label="毛利率(%)" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="zcb" label="总成本" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<div style=" width: 100%; height: 50px;">
							<h>品种合计：</h>
						</div>
					</div>
					
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="分类销售额图表显示">
					<h1>销售额统计表</h1>
				</el-tab-pane>
			</el-tabs>
		</el-tab-pane>
		<el-tab-pane label="按供货商统计" name="first">
			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<el-select v-model="value" placeholder="所有供货商" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有类别" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有操作员" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="" @click="dialogFormVisible = true">高级查询</el-button>
				<div style="display: inline-block;margin-left: 10px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
			<el-row>
			<el-dialog title="查找" v-model="dialogFormVisible">
				<el-form :model="form">
					<el-form-item style="width: 313px;" label="所属分店" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="仓库" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="所属仓库">
							<el-option label="分店仓库" value="shanghai"></el-option>
							<el-option label="总店仓库" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-form>

				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</el-row>
			</div>
			<h style="color: blue;">说明：若某种商品从多个供货商处进过货，统计时，最后一次采购时的供货商，将作为改商品的供货商。</h>
			<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="ghsmc" label="供货商名称">
						</el-table-column>
						<el-table-column prop="jhsl" label="进货数量">
						</el-table-column>
						<el-table-column prop="jhje" label="进货金额">
						</el-table-column>
						<el-table-column prop="xssl" label="销售数量">
						</el-table-column>
						<el-table-column prop="xsje" label="销售金额">
						</el-table-column>
						<el-table-column prop="xswcl" label="销售完成率(%)">
						</el-table-column>
						<el-table-column prop="xslr" label="销售利润">
						</el-table-column>
						<el-table-column prop="mll" label="毛利率(%)">
						</el-table-column>


			</el-table>
			<div style=" width: 100%; height: 50px;">
				<h>供货商数:</h>
			</div>
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
				</el-pagination>
			</div>
			<h5> 供货商商品消费明细:</h5>
			<div style="border:1px solid #EBEEF5 ;">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="djh" label="单据号">
					</el-table-column>
					<el-table-column prop="kdrq" label="开单日期">
					</el-table-column>
					<el-table-column prop="khmc" label="客户名称">
					</el-table-column>
					<el-table-column prop="spbh" label="商品编号">
					</el-table-column>
					<el-table-column prop="spmc" label="商品名称">
					</el-table-column>
					<el-table-column prop="dw" label="单位">
					</el-table-column>
					<el-table-column prop="xsdj" label="销售单价">
					</el-table-column>
					<el-table-column prop="xssl" label="销售数量">
					</el-table-column>
					<el-table-column prop="zje" label="总金额">
					</el-table-column>
					<el-table-column prop="lr" label="利润">
					</el-table-column>
					<el-table-column prop="mll" label="毛利率(%)">
					</el-table-column>
					<el-table-column prop="jbr" label="经办人">
					</el-table-column>
					<el-table-column prop="ckmc" label="仓库名称">
					</el-table-column>
					<el-table-column prop="ggxh" label="规格型号">
					</el-table-column>
					<el-table-column prop="ys" label="颜色">
					</el-table-column>
				</el-table>
				<div style=" width: 100%; height: 50px;">
					<h>合计：</h>
				</div>
			</div>

			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
				</el-pagination>
			</div>
		</el-tab-pane>
		<el-tab-pane label="按客户/会员统计" name="third">
			<div>
				&nbsp;
				<h>查询时间:</h>
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期" :shortcuts="shortcuts">
				</el-date-picker>
				&nbsp;
				<el-select v-model="value" placeholder="所有客户" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input type="text" v-model="input" placeholder="会员编号,会员名称,会员联系电话" style="width: 200px;"></el-input>&nbsp;&nbsp;
				<el-select v-model="value" placeholder="所有类别" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有分店" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="value" placeholder="所有操作员" id="select1">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input type="text" v-model="input" placeholder="商品名称,编号" style="width: 200px;"></el-input>



				<div style="flmargin-left: 10px;float: right;">
					<el-button icon="el-icon-search">搜索</el-button>
				</div>
				<el-button type="" @click="dialogFormVisible = true" style="float: right;">高级查询</el-button>
				<el-row>
					<el-dialog title="查找" v-model="dialogFormVisible">
						<el-form :model="form">
							<el-form-item style="width: 313px;" label="所属分店" :label-width="formLabelWidth">
								<el-input v-model="form.name" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="仓库" :label-width="formLabelWidth">
								<el-select v-model="form.region" placeholder="所属仓库">
									<el-option label="分店仓库" value="shanghai"></el-option>
									<el-option label="总店仓库" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
				
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="dialogFormVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
							</span>
						</template>
					</el-dialog>
				</el-row>
			</div>
			<div style="border:1px solid #EBEEF5;margin-top: 45px;">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="khmc" label="客户名称" how-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="khlx" label="客户类型" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="khdq" label="客户地区" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="spmc" label="销售数量" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="sslb" label="销售金额" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="ck" label="销售利润" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="dw" label="毛利率(%)" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<div style="border: 1px solid #EBEEF5; width: 100%; height: 50px;">
				<h>合计:</h>
			</div>
			</div>
			
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
				</el-pagination>
			</div>
			<h5> 客户/会员详情:</h5>
			  <el-tabs type="border-card">
			    <el-tab-pane label="明细表">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="djh" label="单据号">
							</el-table-column>
							<el-table-column prop="kdrq" label="开单日期">
							</el-table-column>
							<el-table-column prop="khmc" label="客户名称">
							</el-table-column>
							<el-table-column prop="spbh" label="商品编号">
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称" width="100">
							</el-table-column>
							<el-table-column prop="dw" label="单位" width="40">
							</el-table-column>
							<el-table-column prop="xsdj" label="销售单价">
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量">
							</el-table-column>
							<el-table-column prop="zje" label="总金额">
							</el-table-column>
							<el-table-column prop="lr" label="利润">
							</el-table-column>
							<el-table-column prop="mll" label="毛利率(%)">
							</el-table-column>
							<el-table-column prop="jbr" label="经办人">
							</el-table-column>
							<el-table-column prop="ckmc" label="仓库名称">
							</el-table-column>
							<el-table-column prop="ggxh" label="规格型号">
							</el-table-column>
							<el-table-column prop="ys" label="颜色">
							</el-table-column>
						</el-table>
						<div style=" width: 100%; height: 50px;">
							<h>合计：</h>
						</div>
					
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
				
			    <el-tab-pane label="汇总表">
					<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="spbh" label="商品编号">
							</el-table-column>
							<el-table-column prop="spmc" label="商品名称">
							</el-table-column>
							<el-table-column prop="zjghsmc" label="最近供货商名称">
							</el-table-column>
							<el-table-column prop="xssl" label="销售数量">
							</el-table-column>
							<el-table-column prop="zxse" label="总销售额">
							</el-table-column>
							<el-table-column prop="lr" label="利润">
							</el-table-column>
							<el-table-column prop="mll" label="毛利率(%)">
							</el-table-column>
						</el-table>
						<div style=" width: 100%; height: 50px;">
							<h>品种合计：</h>
						</div>
					
					<div style="float: right;">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
						 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
						</el-pagination>
					</div>
				</el-tab-pane>
			  </el-tabs>
			
		</el-tab-pane>
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
