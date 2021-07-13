<template>
	<p>待付列表</p>
	<div>
		<div style="display: flex;margin-top: 20px;margin-bottom: 20px;">
			<el-input placeholder="请输入内容" v-model="pageInfo.documentnumber" clearable>
			</el-input>
			<el-select v-model="pageInfo.sname" placeholder="请选择">
				<el-option v-for="item in Store" :key="item.sid" :label="item.sname" :value="item.sname">
				</el-option>
			</el-select>
			<el-button @click="findNameAndId">查询</el-button>

		</div>

		<el-table :data="tableData"  border style="width: 100%">
			<el-table-column type="index" label="序号">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="name" label="操作">
				<el-button type="text" @click="dialogFormVisible=true">付款</el-button>
			</el-table-column>
			<el-table-column prop="store.sname" label="所属门店">
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
			<el-table-column prop="orderamount" label="本单金额">
			</el-table-column>
			<el-table-column prop="yfamount" label="已付金额">
			</el-table-column>
		<!-- 	<el-table-column prop="yfamount" label="累计金额">
			</el-table-column>
			<el-table-column prop="yfamount" label="未付金额">
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
		<!-- 付款单 -->
		<el-dialog v-model="dialogFormVisible" width="1200px">
			<el-descriptions class="margin-top" title="收款单"  :size="size">
				<el-descriptions-item label="往来客户:">
					<el-input v-model="relationship" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="车牌号:">
					<el-input v-model="chepai" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="联系电话:">
					<el-input v-model="Phone" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="收款时间:">
					<el-input v-model="documentdate" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="应收金额:">
					<el-input v-model="yfamount" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="未收金额:">
					<el-input v-model="wfamount"></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="本次收款:">
					<el-input v-model="orderamount" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="所属门店:">
					 <el-select v-model="value" disabled placeholder="请选择">
					    <el-option
					     v-model="storebelongs">
					    </el-option>
					  </el-select>
					<!-- <el-input v-model="storebelongs" disabled></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item label="经手人:">
					<el-input v-model="brokerage" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item label="备注:">
					<el-input v-model="remarks"></el-input>
				</el-descriptions-item>
			</el-descriptions>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="收款单据" name="first">
					<el-table :data="tableData" height="250" border style="width: 100%">
						<el-table-column type="index" label="序号">
						</el-table-column>
						<el-table-column prop="name" label="单据编号">
						</el-table-column>
						<el-table-column prop="address" label="单据日期">
						</el-table-column>
						<el-table-column prop="address" label="单据类型">
						</el-table-column>
						<el-table-column prop="address" label="单据日期">
						</el-table-column>
						<el-table-column prop="address" label="往来关系">
						</el-table-column>

						<el-table-column prop="address" label="往来客户">
						</el-table-column>
						<el-table-column prop="address" label="本单金额">
						</el-table-column>
						<el-table-column prop="address" label="累计优惠">
						</el-table-column>
						<el-table-column prop="address" label="未收金额">
						</el-table-column>
						<el-table-column prop="address" label="本次金额">
						</el-table-column>
						<el-table-column prop="address" label="服务顾问">
						</el-table-column>
						<el-table-column prop="address" label="备注">
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="收款明细" name="second">
					<el-table :data="tableData" height="250" border style="width: 100%">
						<el-table-column type="index" label="序号">
						</el-table-column>
						<el-table-column label="操作">
							<el-button><i class="el-icon-remove"></i></el-button>
							<el-button><i class="el-icon-circle-plus"></i></el-button>
						</el-table-column>
						<el-table-column prop="name" label="收款方式">
						</el-table-column>
						<el-table-column prop="address" label="凭据(储值卡号/冲账单号)">
						</el-table-column>
						<el-table-column prop="address" label="收款金额">
						</el-table-column>
						<el-table-column prop="address" label="还款日期">
						</el-table-column>
						<el-table-column prop="address" label="备注">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">关闭</el-button>
					<el-button type="primary" @click="okSupplementary">付款</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				dialogFormVisible: false,
				activeName: 'first',
				pageInfo:{
					documentnumber:'',
					sname:'',//门店名称
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				tableData:[],
				Store:[]
			}
		},
		methods:{
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
				showall(){
					const _this = this
					this.axios.get("http://localhost:8081/asms/findAll", {
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
				findNameAndId(){
					const _this = this
					this.axios.get("http://localhost:8081/asms/findNameAndId", {
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
