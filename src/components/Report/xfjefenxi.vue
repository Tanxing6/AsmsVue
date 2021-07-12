<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">消费金额分析</div>
	<el-tabs v-model="activeName" @tab-click="handleClick">
			<div id="app">
			<div id="main" style="width: 600px;height:400px;"></div>
			</div>
			
			  <el-tabs type="border-card">
			    <el-tab-pane label="会员指示分析">
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="djh" label="序号">
							</el-table-column>
							<el-table-column prop="kdrq" label="消费金额">
							</el-table-column>
							<el-table-column prop="khmc" label="消费人数">
							</el-table-column>
							<el-table-column prop="spbh" label="人数占比">
							</el-table-column>
							<el-table-column prop="spmc" label="消费金额">
							</el-table-column>
							<el-table-column prop="dw" label="消费占比" >
							</el-table-column>
							<el-table-column prop="xsdj" label="平均客单价">
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
					splb:'水果',
					xssl:'20',
					zcb:'2999',
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
					splb:'电子',
					xssl:'25',
					zcb:'299999',
				}],
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
			methods: {
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
			    }
			  },
			  mounted() {
			    this.drawChart();
			  }
		}
	};
</script>
<style>
</style>
