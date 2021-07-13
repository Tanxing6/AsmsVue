<template>
	<p>退款单</p>
	<div>
		<div style="display: flex;margin-top: 20px;margin-bottom: 20px;">
			<el-input placeholder="请输入内容" v-model="input" clearable>
			</el-input>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="请选择来源类型">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button @click="">查询</el-button>
		</div>
		<el-table :data="tableData" height="250" border style="width: 100%">
			<el-table-column type="index" label="序号">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column label="操作">
<el-button type="text" @click="">付款</el-button>
			</el-table-column>
			<el-table-column prop="store.sname" label="所属门店" width="180">
			</el-table-column>
			<el-table-column prop="documentnumber" label="退款单号" width="180">
			</el-table-column>
			<el-table-column prop="documentdate" label="单据日期">
			</el-table-column>
			<el-table-column prop="documentstatus" label="单据状态">
				<template v-slot="scope">
					<p v-if="scope.row.documentstatus==0">已登录</p>
					<p v-if="scope.row.documentstatus==1">已结算</p>
				</template>
			</el-table-column>
			<el-table-column prop="customer.cname" label="客户名称">
			</el-table-column>
			<el-table-column prop="customer.cphone" label="联系电话">
			</el-table-column>
			<el-table-column prop="yfamount" label="应付金额">
			</el-table-column>
			<!-- <el-table-column prop="bcamount" label="本次付款">
			</el-table-column> -->
			<el-table-column prop="sum" label="合计余额">
			</el-table-column>
			<el-table-column prop="address" label="收款单号">
			</el-table-column>
			<el-table-column prop="Operator" label="经手人">
			</el-table-column>
			<el-table-column prop="remarks" label="备注">
			</el-table-column>
		</el-table>
		<div style="float: right;margin-top: 30px;">
			<el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	import qs from 'qs';
	export default defineComponent({

		setup() {
			return {
				input: ref('')
			}

		},
		data() {
			return {
				pageInfo: {
					documentnumber: '',
					documenttype: '', //门店名称
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				tableData: [],
				Store: []
			}
		},
		methods: {
			handleCurrentChange(page) {

				this.pageInfo.currentPage = page
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.findNameAndId()
			},
			handleSizeChange(size) {

				this.pageInfo.pagesize = size
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.findNameAndId()
			},

			findNameAndId() {
				var _this = this
				this.axios.get("http://localhost:8081/asms/findrefundorder", {
						params: this.pageInfo
					})
					.then(function(response) {

						_this.tableData = response.data.list
						_this.tableData.sum=response.data.list.yfamount
						_this.pageInfo.total = response.data.total
						// 数据接收
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}

		},
		created() {
			const _this = this
			this.findNameAndId()

		}
	})
</script>

<style>
</style>
