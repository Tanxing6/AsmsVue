<template>
	<p>收款单</p>
	<div>
		<div style="display: flex;margin-top: 20px;margin-bottom: 20px;">
			<el-input placeholder="请输入单据号" v-model="pageInfo.documentnumber" clearable>
			</el-input>
			<el-select v-model="pageInfo.sname" placeholder="请选择">
				<el-option v-for="item in Store" :key="item.sid" :label="item.sname" :value="item.sname">
				</el-option>
			</el-select>
			<el-select v-model="pageInfo.documenttype" placeholder="请选择来源类型">
				<el-option label="全部" value="">
				</el-option>
				<el-option label="维修美容单" value="维修美容单">
				</el-option>
				<el-option label="维修开单" value="维修开单">
				</el-option>
				<el-option label="洗车开单" value="洗车开单">
				</el-option>
				<el-option label="维修领料出库单" value="维修领料出库单">
				</el-option>
				<el-option label="储值卡充值" value="储值卡充值">
				</el-option>
			</el-select>
			<el-button @click="findNameAndId">查询</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="index" label="序号">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column label="操作">
				<template v-slot="scope">
				<el-button type="text">未开票</el-button>
				<el-button type="text" @click="deleteduein(scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="documentnumber" label="单据编号">
			</el-table-column>
			<el-table-column prop="documentdate" label="单据日期">
			</el-table-column>
			<el-table-column prop="documenttype" label="单据类型">
			</el-table-column>
			<el-table-column prop="documentstatus" label="单据状态">
				<template v-slot="scope">
					<p v-if="scope.row.documentstatus==0">已登录</p>
					<p v-if="scope.row.documentstatus==1">已结算</p>
				</template>
			</el-table-column>
			<el-table-column prop="relationship" label="往来关系">
			</el-table-column>
			<el-table-column prop="customer.cname" label="往来客户">
			</el-table-column>

			<el-table-column prop="carmagid" label="车牌号">
			</el-table-column>
			<el-table-column prop="orderamount" label="本单金额">
			</el-table-column>
		<!-- 	<el-table-column prop="address" label="已收金额">
			</el-table-column>
			<el-table-column prop="address" label="免收金额">
			</el-table-column> -->
			<el-table-column prop="brokerage" label="经手人">
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
	import qs from 'qs'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				activeName: 'first',
				pageInfo: {
					documentnumber: '',
					sname: '', //门店名称
					documenttype:'',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				form:{
					id:''//编号
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
				const _this = this
				this.axios.get("http://localhost:8081/asms/findyiduein", {
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
			},
			deleteduein(row){
				const _this = this
				this.form.id=row.id
				this.axios.put("http://localhost:8081/asms/deleteduein",this.form)
					.then(function(response) {
						// 数据接收
						_this.findNameAndId()
					}).catch(function(error) {
						console.log(error)
					})
			}
	
		},
		created() {
			const _this = this
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
	}
</script>

<style>
</style>
