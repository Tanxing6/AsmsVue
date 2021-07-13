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
				<el-table :data="tableData" height="300"  border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="djh" label="操作" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sName" label="所属门店" width="150"></el-table-column>
					<el-table-column prop="storeName" label="所属仓库" show-overflow-tooltip></el-table-column>
					<el-table-column prop="coCode" label="物资编号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="coName" label="物资名称" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="barcode" label="物资条码" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="specialmodel" label="规格型号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="ciName" label="物资分类" show-overflow-tooltip></el-table-column>
					<el-table-column prop="mName" label="物资品牌" width="110"></el-table-column>
					<el-table-column prop="applimodel" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="isName" label="安装部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="mdTitle" label="物资单位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="number" label="库存数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="coRetailprice" label="零售价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="零售金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="cusprice" label="客户领料价" show-overflow-tooltip></el-table-column>
					<!-- <el-table-column prop="khhy" label="客户价金额" show-overflow-tooltip></el-table-column> -->
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
				tableData: [],
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
			handleDeleteDetails(val, row) {
				if (this.tableData.length == 0) {
					this.tableData.splice(row.id, 1);
				}
			},
			init() {
				this.axios.get("http://localhost:8081/asms/wMaterialorder/selectAllStock3").then((res) => {
						if (res.data.message === "success")
							this.tableData = res.data.data
						for (var i = 0; i < this.tableData.length; i++) {
							this.tableData[i].billdate = this.formatDate(this.tableData[i].billdate)
						}
						console.log(this.tableData)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
		},
		created() {
			this.init();
		}
	};
</script>

<style scoped>
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
