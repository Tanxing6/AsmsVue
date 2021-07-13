 <template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
			<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">材料领用汇总</div>
			<div>
				&nbsp;
				<el-select v-model="value" placeholder="维修顾问" id="select1">
					<el-option v-for="item in options" :key="item.value" v-model="value"  :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input type="text" v-model="input" placeholder="请输物资名称" style="width: 200px;margin-left: 20px;"></el-input>

				<div style="display: inline-block;margin-left: 10px;">
					<el-button icon="el-icon-search">查询</el-button>
				</div>
				

			</div>
			<el-tabs type="border-card" style="margin-top: 30px;">
					<div style="border:1px solid #EBEEF5 ;">
						<el-table ref="multipleTable" :data="tableData1" height="450" show-summary border tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
						<el-table-column
						      type="index"
						      width="50">
						    </el-table-column>
							<el-table-column prop="coName" label="物资名称" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="" label="物资编号" show-overflow-tooltip>
								{{coCode}}
							</el-table-column>
							<el-table-column prop="name" label="领料人" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="name" label="维修顾问" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="numberd" label="领料数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="paidMoney" label="领料金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="backNumber" label="退料数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="amountPrice" label="退料金额" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="hjsl" label="合计数量" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="hjje" label="合计金额" show-overflow-tooltip>
							</el-table-column>

						</el-table>
					</div>
					
					
			</el-tabs>
		
	
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				options:[{
					key:0,
					label:'李世龙',
					value:'李世龙'
				}],
				value:'',
				coCode:'',
				activeName: 'second',
				tableData1: [
					
				],
				shortcuts: [{
					text: '最近一周',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						return [start, end]
					})(),
				}, {
					text: '最近一个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						return [start, end]
					})(),
				}, {
					text: '最近三个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						return [start, end]
					})(),
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
			},
			pages() {
				const token = JSON.parse(sessionStorage.getItem("state"));
				const _this = this;
				_this.axios({
						url: 'http://localhost:8081/asms/tCommodity/cllyhz',
						method: 'get',
					})
					.then(function(response) {
						console.log("tableData1:", response.data.data)
						_this.tableData1= response.data.data;
						_this.coCode = _this.tableData1[0].coCode
					}).catch(function(error) {
						console.log(error)
					})
			},
		} ,
		created() {
			this.pages();
		},
	};
</script>
<style>
	.el-input {
	    width: 110px;
	}
</style>
