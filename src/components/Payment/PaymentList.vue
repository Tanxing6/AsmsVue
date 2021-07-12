<template>
	<p>待付列表</p>
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
			<el-table-column prop="name" label="操作">
				<el-button @click="dialogFormVisible=true">付款</el-button>
			</el-table-column>
			<el-table-column prop="storebelongs" label="所属门店">
			</el-table-column>
			<el-table-column prop="documentnumber" label="单据编号">
			</el-table-column>
			<el-table-column prop="documentdate" label="单据日期">
			</el-table-column>
			<el-table-column prop="documenttype" label="单据类型">
			</el-table-column>
			<el-table-column prop="documentstatus" label="单据状态">
			</el-table-column>
			<el-table-column prop="relationship" label="往来关系">
			</el-table-column>
			<el-table-column prop="customername" label="往来客户">
			</el-table-column>
			<el-table-column prop="orderamount" label="本单金额">
			</el-table-column>
			<el-table-column prop="yfamount" label="已付金额">
			</el-table-column>
			<el-table-column prop="address" label="累计金额">
			</el-table-column>
			<el-table-column prop="address" label="未付金额">
			</el-table-column>
			<el-table-column prop="brokerage" label="经手人">
			</el-table-column>
			<el-table-column prop="remarks" label="备注">
			</el-table-column>
		</el-table>
		<!-- 付款单 -->
		<el-dialog v-model="dialogFormVisible" width="1200px">
			<el-descriptions class="margin-top" title="收款单" :column="4" :size="size">
				<el-descriptions-item label="往来客户:">
					<el-input v-model="customername" disabled></el-input>
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
					<el-input v-model="storebelongs" disabled></el-input>
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
	export default {
		data() {
			return {
				dialogFormVisible: false,
				activeName: 'first'
			}
		}
	}
</script>

<style>
</style>
