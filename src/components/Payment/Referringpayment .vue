<template>
	<div>

		<el-descriptions title="收款单">
			<el-descriptions-item label="往来客户:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车牌号:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="联系电话:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="收款时间:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="应收金额:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="未收金额:">
				<el-input v-model=""></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="本次收款:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="所属门店:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="经手人:">
				<el-input v-model="" disabled></el-input>
			</el-descriptions-item>
			<el-descriptions-item label="备注:">
				<el-input v-model=""></el-input>
			</el-descriptions-item>
		</el-descriptions>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="收款单据" name="first">
				<el-table :data="tableData" height="250" border style="width: 100%">
					<el-table-column type="index" label="序号">

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
	</div>
</template>

<script>
</script>

<style>
</style>
