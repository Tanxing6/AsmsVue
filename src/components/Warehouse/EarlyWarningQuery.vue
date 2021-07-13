<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		预警查询
		<el-tabs type="border-card">
			<div style="margin-bottom: 60px;">
				<div style="float: left">
					<el-input type="text" v-model="input" placeholder="请输入供货商搜索"
						style="width: 200px;margin-left: 20px;"></el-input>
					&nbsp;&nbsp;
					<div style="display: inline-block;margin-left: 5px;">
						<el-button icon="el-icon-search">查询</el-button>
					</div>
				</div>
			</div>
			<div>
				<el-table :data="tableData" fit height="300" border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="djh" label="操作" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sName" label="所属门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="coCode" label="物资编号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="coName" label="物资名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="barcode" label="物资条码" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="specialmodel" label="规格型号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="ciName" label="物资分类" show-overflow-tooltip></el-table-column>
					<el-table-column prop="mName" label="物资品牌" show-overflow-tooltip></el-table-column>
					<el-table-column prop="applimodel" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="isName" label="施工部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="mdTitle" label="物资单位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="wstate" style="color: red;" label="预警状态" show-overflow-tooltip>
						<template #default="scope">
						                    <span v-if="scope.row.wstate==1" style="color: red">短缺</span>
						                    <span v-else style="color: red">超存</span>
						                </template>
					</el-table-column>
					<el-table-column prop="upx" label="最高库存" show-overflow-tooltip></el-table-column>
					<el-table-column prop="lox" label="最低库存" show-overflow-tooltip></el-table-column>
					<el-table-column prop="lo" label="短缺数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="up" label="超存数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="number" label="库存数量" show-overflow-tooltip></el-table-column>
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
				value1: '',
				value2: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				tableData:[],
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
				this.axios.get("http://localhost:8081/asms/wMaterialorder/selectByWarning").then((res) => {
						if (res.data.message === "success")
							this.tableData = res.data.data
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
			font-size: 10px;
		}
	}
</style>
