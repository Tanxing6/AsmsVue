<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">消费金额分析</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
			
			
			  <el-tabs type="border-card">
			    <el-tab-pane label="会员指示分析">
						<el-table :data="tableData1" border style="width: 100%" height="220">
							<el-table-column
							      type="index"
							      width="50"
								  >
							    </el-table-column>
							<el-table-column prop="x" label="消费金额">
							</el-table-column>
							<el-table-column prop="c" label="消费人数">
							</el-table-column>
							<el-table-column prop="s" label="人数占比">
							</el-table-column>
							<el-table-column prop="d" label="消费金额">
							</el-table-column>
							<el-table-column prop="xfzb" label="消费占比" >
							</el-table-column>
							<el-table-column prop="e" label="平均客单价">
							</el-table-column>
						</el-table>
				</el-tab-pane>
				
			   
			  </el-tabs>
	</el-tabs>
</template>
<script>
	
	export default {
		
		name: "app",
		data() {
			return {
				activeName: 'second',
				tableData1: [],
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
		methods: {/* 
			    drawChart() {
			      // 基于准备好的dom，初始化echarts实例
			      let myChart = this.$echarts.init(document.getElementById("main"));
			      // 指定图表的配置项和数据
			      let option = {
			        title: {
			          text: "ECharts 入门示例"
			        },
			        tooltip: {},
			        legend: {
			          data: ["销量"]
			        },
			        xAxis: {
			          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			        },
			        yAxis: {},
			        series: [
			          {
			            name: "销量",
			            type: "bar",
			            data: [5, 20, 36, 10, 10, 20]
			          }
			        ]
			      };
			      // 使用刚指定的配置项和数据显示图表。
			      myChart.setOption(option);
			    } */
				pages() {
						const token = JSON.parse(sessionStorage.getItem("state"));
						const _this = this;
						_this.axios({
								url: 'http://localhost:8081/asms/mainbilling/xfjefx',
								method: 'get',
							})
							.then(function(response) {
								console.log("tableData1:", response.data.data)
								_this.tableData1= response.data.data;
												_this.cphone = _this.tableData1[0].cphone
							}).catch(function(error) {
								console.log(error)
							})
					},
			  },
			  
			  mounted() {
			    //this.drawChart();
				this.pages();
			  } 
	};
</script>
<style>
	.el-input {
	    width: 110px;
	}
</style>
