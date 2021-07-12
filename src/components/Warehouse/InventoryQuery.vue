<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		库存查询
		<el-tabs type="border-card">
			<div style="margin-bottom: 60px;">
				<div style="float: left">
					<el-input type="text" v-model="input" placeholder="请输入供货商搜索"
						style="width: 200px;margin-left: 20px;"></el-input>
					&nbsp;&nbsp;
					<div style="display: inline-block;margin-left: 5px;">
						<el-button icon="el-icon-search">查询</el-button>
					</div>
					<div style="display: inline-block;margin-left: 15px;">
						<el-checkbox v-model="checked">备选项</el-checkbox>
					</div>
				</div>
			</div>
			<div>
				<el-table :data="tableData"  border style="width: 100%;text-align: center;">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="djh" label="操作" show-overflow-tooltip></el-table-column>
					<el-table-column prop="kdrq" label="所属门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="djlx" label="所属仓库" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="物资编号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="bh" label="物资名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="spmc" label="物资条码" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mll" label="规格型号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="kdrq" label="物资分类" show-overflow-tooltip></el-table-column>
					<el-table-column prop="djlx" label="物资品牌" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="安装部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="物资单位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="库存数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="零售价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="零售金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="客户领料价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="客户价金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="成本单价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="bh" label="成本金额" show-overflow-tooltip>
					</el-table-column>
				</el-table>
			</div>
			<div style="float: right;margin-top: 30px;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="10" layout="total,sizes, prev, pager, next, jumper"
					:total="20">
				</el-pagination>
			</div>

		</el-tabs>



	</el-tabs>
	
</template>
<script>
	import {
		defineComponent,
		ref
	} from 'vue';

	export default {
		data() {
			return {
				input: ref(''),
				add: false,
				activeName: "q",
				tableData: [{
					materialcode:'',
					materialname:'',
					khhy:'',
					typename:'',
					brand:'',
					mll:'',
					modelname:'',
					sitepartname:'',
					unitname:'',
					backnumber:'',
					unitprice:'',
					amountprice:'',
					khhy:'',
					khhy:'',
					khhy:'',
					storename:'',
					bh:''
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
			handleDeleteDetails(val,row) {
			      if (this.tableData.length == 0) {
			        this.tableData.splice(row.id, 1);
			      }
			    },
			 handleAddDetails() {
			      if (this.tableData === undefined) {
			        this.tableData = new Array();
			      }
			      var obj = {};
			      obj.materialcode='';
			      obj.materialcode='';
					obj.materialname='';
					obj.khhy='';
					obj.typename='';
					obj.brand='';
					obj.mll='';
					obj.modelname='';
					obj.sitepartname='';
					obj.unitname='';
					obj.backnumber='';
					obj.unitprice='';
					obj.amountprice='';
					obj.khhy='';
					obj.storename='';
					obj.bh='';
			
			      this.tableData.push(obj);
			    },
		}
	};
</script>

<style>
	.rightLabBox {
		position: absolute;
		right: 20px;
		top: 20px;

		div {
			border: solid 1px $green;
			color: $green;
			border-radius: 3px;
			padding: 4px 10px;
			font-size: 14px;
		}
	}
</style>
