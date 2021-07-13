<template>
	<div style="text-align: center;margin-bottom: 10px; font-weight: 600;">营业额汇总</div>
	<div>
		&nbsp;
		<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
		 end-placeholder="结束日期" :shortcuts="shortcuts">
		</el-date-picker>
		&nbsp;
		
	</div>
	<div class="message1" >
		<div class="col-sm-3">
			<a style="background-color:#bb5b36;">
				<span class="btn">营业额</span>
				<p>￥{{zje}}</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#ab763d;">
				<span class="btn">实收金额</span>
				<p>￥{{ssje}}</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#3f7b42;">
				<span class="btn">支付金额</span>
				<p>￥{{zfje}}</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#3471a5;">
				<span class="btn">利润汇总</span>
				<p>￥61882.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#a58d3b;">
				<span class="btn">应收金额</span>
				<p>￥{{yfzk}}</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#289287;">
				<span class="btn">应付账款</span>
				<p>￥119.00</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#63568e;">
				<span class="btn">成本金额</span>
				<p>￥5399.60</p>
			</a>
		</div>
		<div class="col-sm-3">
			<a style="background-color:#ab4259;">
				<span class="btn">免金金额</span>
				<p>￥300.00</p>
			</a>
		</div>
		
	</div>
	

	

</template>

<script>
	export default {
		data() {
			return {
				zje:'',
				ssje:'',
				yfzk:'',
				zfje:'',
				tableData: [],
				input: '',
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
				pageinfo: {
						currentPage: 1,
						pageSize: 10,
						total: 0
					},
					pageinfo1: {
						id: 1,
					},
				selType:'',
			}
			
		},
		methods: {
			pages() {
					const token = JSON.parse(sessionStorage.getItem("state"));
					const _this = this;
					_this.axios({
							url: 'http://localhost:8081/asms/mainbilling/jzlx',
							method: 'get',
						})
						.then(function(response) {
							console.log("tableData1:", response.data.data)
							_this.tableData1= response.data.data;
							_this.zje = _this.tableData1[0].zje
							_this.ssje = _this.tableData1[0].ssje
						}).catch(function(error) {
							console.log(error)
						})
				},
				pages1() {
						const token = JSON.parse(sessionStorage.getItem("state"));
						const _this = this;
						_this.axios({
								url: 'http://localhost:8081/asms/mainbilling/jzlx1',
								method: 'get',
							})
							.then(function(response) {
								console.log("tableData1:", response.data.data)
								_this.tableData1= response.data.data;
								_this.zfje = _this.tableData1[0].zfje
								_this.yfzk = _this.tableData1[0].yfzk
							}).catch(function(error) {
								console.log(error)
							})
					},
			} ,
			created() {
				this.pages();
				this.pages1();
			},
	}
</script>

<style>
	.el-input {
	    width: 110px;
	}
	#aaa {
		width: 150px;
		margin-left: 30px;
	}

	#select1 {
		width: 100px;
	}

	h {
		font-size: 12px;
	}

	#input_1 {
		margin-left: -130px;
	}
	.col-sm-3 {
	    height: 130px;
	    line-height: 130px;
	    margin-top: 10px;
		width: 21%;
		float: left;
		position: relative;
		min-height: 1px;
		padding-left: 15px;
		padding-right: 15px;
	}
	.message1 a span {
	    position: absolute;
	    top: 0;
	    left: 0;
	    background: rgba(255,255,255,0.15);
	    padding: 2px 5px;
	    border-radius: 4px;
	    font-size: 14px;
	}
	
	.btn {
	    display: inline-block;
	    margin-bottom: 0;
	    font-weight: 400;
	    text-align: center;
	    vertical-align: middle;
	    cursor: pointer;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    line-height: 1.42857143;
	    user-select: none;
	}
	.message1 a {
	    width: 100%;
	    text-align: center;
	    display: block;
	    height: 100%;
	    margin: 0 auto;
	    font-size: 26px;
	    border-radius: 4px;
	    color: white;
	    position: relative;
		}
</style>
