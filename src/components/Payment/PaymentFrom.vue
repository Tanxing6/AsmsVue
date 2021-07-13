<template>
	<p>付款单</p>
	<div>
		<div style="display: flex;margin-bottom: 20px;">
			<el-input placeholder="请输入内容" v-model="pageInfo.documentnumber" clearable>
			</el-input>
			<el-select v-model="pageInfo.documenttype" placeholder="请选择">
				<el-option label="全部" value="">
				</el-option>
				<el-option label="物资采购入库" value="物资采购入库">
				</el-option>
				
			</el-select>
		
			<el-button @click="findNameAndId">查询</el-button>
		</div>

		<el-table :data="tableData" height="250" border style="width: 100%">
			<el-table-column type="index" label="序号">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="documentnumber" label="单据编号">
			</el-table-column>
			<el-table-column prop="documentdate" label="单据日期">
			</el-table-column>
			<el-table-column prop="documenttype" label="来源单类型">
			</el-table-column>
			<!-- <el-table-column
			  prop="address"
			  label="来源单据">
			</el-table-column> -->
			<el-table-column prop="relationship" label="往来关系">
			</el-table-column>

			<el-table-column prop="customer.cname" label="往来客户">
			</el-table-column>
			<el-table-column prop="orderamount" label="付款金额">
			</el-table-column>
			<!-- <el-table-column
			  prop="address"
			  label="免付金额">
			</el-table-column> -->
			<el-table-column prop="brokerage" label="经手人">
			</el-table-column>
			<el-table-column prop="remarks" label="备注">
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
		data(){
			return{
				pageInfo: {
				documentnumber:'',
				documenttype:'',//门店名称
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				tableData: [],
				Store:[]
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
			showall() {
				var _this = this
				this.axios.get("http://localhost:8081/asms/findyiAll", {
						params: this.pageInfo
					})
					.then(function(response) {
						// 数据接收
						console.log(response.data)
						_this.tableData = response.data.list
						_this.pageInfo.total = response.data.total

					}).catch(function(error) {
						console.log(error)
					})
			},
			findNameAndId() {
				var _this = this
				this.axios.get("http://localhost:8081/asms/findyiNameAndId", {
						params: this.pageInfo
					})
					.then(function(response) {
						// 数据接收
						console.log(response)
						_this.tableData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			}

		},
		created() {
			const _this=this
			this.findNameAndId(),
			this.axios.get("http://localhost:8081/asms/store/selectAll")
				.then(function(response) {
					// 数据接收
					console.log(response)
					_this.Store = response.data
					// _this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})

		}
	})
</script>

<style>
	.el-input {
		width: 180px;
	}
</style>
