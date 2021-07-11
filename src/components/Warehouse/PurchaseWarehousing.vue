<template>
<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">采购入库</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">


		<div>

			<el-input type="text" v-model="input" placeholder="请输入供货商搜索" style="width: 200px;margin-left: 20px;"></el-input>
			&nbsp;&nbsp;
			<div style="display: inline-block;margin-left: 5px;">
				<el-button icon="el-icon-search">查询</el-button>
			</div>


		</div>
		<el-tabs type="border-card" style="margin-top: 30px;">
			<div style="border:1px solid #EBEEF5 ;">
				<el-table :data="tableData" border style="width: 100%;text-align: center">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="djh" label="操作" ></el-table-column>
					<el-table-column prop="kdrq" label="所属门店" ></el-table-column>
					<el-table-column prop="djlx" label="入库单号" ></el-table-column>
					<el-table-column prop="khhy" label="单据状态" ></el-table-column>
					<el-table-column prop="bh" label="供应商" ></el-table-column>
					<el-table-column prop="spmc" label="采购金额" ></el-table-column>
					<el-table-column prop="mll" label="税率" ></el-table-column>
					<el-table-column prop="shuie" label="采购税额" ></el-table-column>
					<el-table-column prop="djh" label="采购金额(含税)" ></el-table-column>
					<el-table-column prop="timeOfEntry" label="入库时间" >
						<template slot-scope="scope">
						    <span>{{scope.row.timeOfEntry | formatDate}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="djlx" label="发票单号" ></el-table-column>
					<el-table-column prop="khhy" label="订单编号" ></el-table-column>
					<el-table-column prop="bh" label="备注" ></el-table-column>
				</el-table>
			</div>
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
				 :page-size="10" layout="total,sizes, prev, pager, next, jumper" :total="20">
				</el-pagination>
			</div>

		</el-tabs>



	</el-tabs>
</template>
<script>
	import {defineComponent,ref} from 'vue';
	import { formatDate } from "./index.js"; 

	export default {
		data() {
			return {
				input: ref(''),
				activeName: "q",
				tableData: [{
					date: '10001',
					rq: '2021518',
					ghs: '供货商A',
					spbh: '12345',
					spmc: '苹果12promax',
					sslb: '电子产品',
					ck: '总店仓库',
					dw: '个',
					sl: '20',
					hsh: '19',
					zje: '11880',
					gg: '件',
					ys: '石墨色',
					jbr: '经办人a',
					bz: '',
					ywymc: '员工A',
					xsje: '100000',
					tkje: '58888',
					khmc: '欧阳兄',
					xshjje: '100009',
					splb: '水果',
					xssl: '20',
					zcb: '2999',
					timeOfEntry:2021-7-11,
				}, {
					date: '10002',
					rq: '2021518',
					ghs: '供货商B',
					spbh: '12346',
					spmc: '苹果13promax',
					sslb: '电子产品',
					ck: '总店仓库',
					dw: '个',
					sl: '20',
					hsh: '19',
					zje: '13880',
					gg: '件',
					ys: '月光银',
					jbr: '经办人b',
					bz: '',
					ywymc: '员工B',
					xsje: '200000',
					khmc: '文子酱',
					yhsje: '10010',
					splb: '电子',
					xssl: '25',
					zcb: '299999',
					timeOfEntry:2021-7-11,
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
		filters: {
		  formatDate(time) {
		    var date = new Date(time);
		    return formatDate(date, "yyyy-MM-dd hh:mm");
		  }
		}
		/* methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		} */
	};
</script>

<style>
</style>
