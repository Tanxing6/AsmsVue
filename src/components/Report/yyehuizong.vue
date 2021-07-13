<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">营业额汇总</div>
	<div>
		&nbsp;
		<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
		 end-placeholder="结束日期" :shortcuts="shortcuts">
		</el-date-picker>
		&nbsp;
		
	</div>
	<div class="message1" >
		<div class="col-sm-3">
			<a style="background-color:#bb5b36;">
				<span class="btn">营业额</span>
				<p>￥0.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#ab763d;">
				<span class="btn">实收金额</span>
				<p>￥648.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#3f7b42;">
				<span class="btn">支付金额</span>
				<p>￥300.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#3471a5;">
				<span class="btn">利润汇总</span>
				<p>￥0.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#a58d3b;">
				<span class="btn">应收金额</span>
				<p>￥0.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#289287;">
				<span class="btn">应付账款</span>
				<p>￥0.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#63568e;">
				<span class="btn">成本金额</span>
				<p>￥0.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#ab4259;">
				<span class="btn">免金金额</span>
				<p>￥0.00</p>
			</a>
		</div>
		
	</div>
	

	<div  style="float: left;margin-top: 40px;width: 100%;">
	<el-tabs type="border-card">
		<el-tab-pane label="营业收入分类汇总">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="float: right;width: 25%;" @selection-change="handleSelectionChange">
				
				<el-table-column prop="lr" label="营业实收项目" show-overflow-tooltip >
				</el-table-column>
				<el-table-column prop="mll" label="占比" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="zcb" label="金额" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			
		</el-tab-pane>
		<el-tab-pane label="营业支出分类汇总">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="float: right;width: 30%;" @selection-change="handleSelectionChange">
				
				<el-table-column prop="lr" label="营业支出分类汇总" show-overflow-tooltip >
				</el-table-column>
				<el-table-column prop="mll" label="占比" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="zcb" label="金额" show-overflow-tooltip>
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-tab-pane label="服务分类汇总表">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="float: right;width: 25%;" @selection-change="handleSelectionChange">
				
				<el-table-column prop="lr" label="服务分类汇总" show-overflow-tooltip >
				</el-table-column>
				<el-table-column prop="mll" label="占比" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="zcb" label="金额" show-overflow-tooltip>
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-tab-pane label="物资分类汇总表">
	<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="float: right;width: 25%;" @selection-change="handleSelectionChange">
		
		<el-table-column prop="lr" label="物资分类汇总" show-overflow-tooltip >
		</el-table-column>
		<el-table-column prop="mll" label="占比" show-overflow-tooltip>
		</el-table-column>
		<el-table-column prop="zcb" label="金额" show-overflow-tooltip>
		</el-table-column>
	</el-table>
		</el-tab-pane>
		
	</el-tabs>
</div>

</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
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
			}
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
	.col-sm-3 {
	    height: 130px;
	    line-height: 130px;
	    margin-top: 10px;
		width: 22.7%;
		float: left;
		position: relative;
		min-height: 1px;
		padding-left: 15px;
		padding-right: 15px;
	}
	.message1 a span {
	    position: absolute;
	    top: 0;
	    left: 0;
	    background: rgba(255,255,255,0.15);
	    padding: 2px 5px;
	    border-radius: 4px;
	    font-size: 14px;
	}
	
	.btn {
	    display: inline-block;
	    margin-bottom: 0;
	    font-weight: 400;
	    text-align: center;
	    vertical-align: middle;
	    cursor: pointer;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    line-height: 1.42857143;
	    user-select: none;
	}
	.message1 a {
	    width: 100%;
	    text-align: center;
	    display: block;
	    height: 100%;
	    margin: 0 auto;
	    font-size: 26px;
	    border-radius: 4px;
	    color: white;
	    position: relative;
		}
</style>
