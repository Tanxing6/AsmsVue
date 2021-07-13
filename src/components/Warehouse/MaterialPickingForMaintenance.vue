<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		维修领料
		<el-tabs type="border-card">
			<div style="margin-bottom: 60px;">
				<div style="float: left">
					<el-input type="text" v-model="input" placeholder="请输入供货商搜索"
						style="width: 200px;margin-left: 20px;"></el-input>
					&nbsp;&nbsp;
					<div style="display: inline-block;margin-left: 5px;">
						<el-button icon="el-icon-search">查询</el-button>
					</div>
				</div>
				<div class="rightLabBox">
					<span>&nbsp;</span>
					<a class="el-button fr el-button--primary el-button--mini" title="新增" @click="add=true">新增</a>
				</div>
			</div>
			<div>
				<el-table :data="tableData" height="300"  border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<!-- <el-table-column prop="djh" label="操作" show-overflow-tooltip></el-table-column> -->
					<el-table-column prop="kdrq" label="所属门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="billcode" label="出库单号" show-overflow-tooltip></el-table-column>
					<!-- <el-table-column prop="khhy" label="单据状态" show-overflow-tooltip></el-table-column> -->
					<el-table-column prop="repaircode" label="维修单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="pickuserId" label="送修人" show-overflow-tooltip></el-table-column>
					<el-table-column prop="platenumber" label="车牌号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="carbrandname" label="车辆品牌" show-overflow-tooltip></el-table-column>
					<el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
					<el-table-column prop="pickuserId" label="领料人" show-overflow-tooltip></el-table-column>
					<el-table-column prop="billdate" label="领料日期" show-overflow-tooltip></el-table-column>
					<!-- <el-table-column prop="bh" label="备注" show-overflow-tooltip></el-table-column> -->
				</el-table>
			</div>
			<div style="float: right;margin-top: 30px;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="10" layout="total,sizes, prev, pager, next, jumper"
					:total="20">
				</el-pagination>
			</div>

		</el-tabs>



	</el-tabs>
	<!--查看弹框-->
	<el-dialog title="维修领料出库单" v-model="add" width="88%">

		<el-form :model="form" label-width="90px;" style="width: 100%;">
			<el-row :gutter="20">
				<!-- <el-col :span="6">
					<el-form-item label="维修单号" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col> -->
				<el-col :span="6">
					<el-form-item label="领料人员" :label-width="formLabelWidth">
						<el-select v-model="form.pickuserId" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="form.username" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="车牌号" :label-width="formLabelWidth">
						<el-input v-model="form.platenumber" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="车架号" :label-width="formLabelWidth">
						<el-input v-model="form.framenumber" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="品牌" :label-width="formLabelWidth">
						<el-input v-model="form.carbrandname" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="车系" :label-width="formLabelWidth">
						<el-input v-model="form.carservicename" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="车型" :label-width="formLabelWidth">
						<el-input v-model="form.carmodelsname" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<!--<el-row :gutter="20">
				
				 <el-col :span="6">
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col> 
			</el-row>-->
			<el-row style="margin-bottom: 20px;margin-top: 20px;">
				材料明细
				<i class=" el-icon-circle-plus-outline" style="font-size: 24px; color: #1890ff;margin-left: 20px;"
					@click="handleAddDetails" />
			</el-row>
			<div>
				<el-table :data="warehouse"  border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="materialcode" label="物资编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="materialname" label="物资名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="typename" label="物资分类" show-overflow-tooltip></el-table-column>
					<el-table-column prop="brand" label="物资品牌" show-overflow-tooltip></el-table-column>
					<el-table-column prop="modelname" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sitepartname" label="安装部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="unitname" label="物资单位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="number" label="库存数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="backnumber" label="领用数量" show-overflow-tooltip>
						<template #default="scope">
							<el-input size="small" v-model="scope.row.backnumber" placeholder="请输入内容"
								@change="handleCellEdit(scope.$index, scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="unitprice" label="领用单价" show-overflow-tooltip>
						<template #default="scope">
							<el-input size="small" v-model="scope.row.unitprice" placeholder="请输入内容"
								@change="handleCellEdit(scope.$index, scope.row)"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="khhy" label="折扣(%)" show-overflow-tooltip></el-table-column> -->
					<el-table-column prop="amountprice" label="领用金额" show-overflow-tooltip></el-table-column>
					<!-- <el-table-column prop="storename" label="仓库库位" show-overflow-tooltip></el-table-column> -->
					<!-- <el-table-column prop="bh" label="备注" show-overflow-tooltip></el-table-column> -->
				</el-table>
			</div>
			<div style="float: right;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage4" :page-size="10" layout="total,sizes, prev, pager, next, jumper"
					:total="20">
				</el-pagination>
			</div>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="add = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit(form)">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<!--查看弹框-->
	<el-dialog title="物资商品" v-model="shop" width="88%">
	
		<el-form :model="shops" label-width="90px;" style="width: 100%;">
			<div>
				<el-table ref="multipleTable" :data="shopstock" @selection-change="handleSelectionChange"  border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="coCode" label="物资编码"></el-table-column>
					<el-table-column prop="coName" label="物资名称"></el-table-column>
					<el-table-column prop="ciName" label="物资分类"></el-table-column>
					<el-table-column prop="mname" label="物资品牌"></el-table-column>
					<el-table-column prop="isName" label="安装部位"></el-table-column>
					<el-table-column prop="mdTitle" label="计量单位"></el-table-column>
					<el-table-column prop="number" label="库存数量"></el-table-column>
					<el-table-column prop="coRetailprice" label="零售价"></el-table-column>
					<el-table-column prop="cusprice" label="领用价"></el-table-column>
				</el-table>
			</div>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="shop = false">取 消</el-button>
				<el-button type="primary" @click="itsmTableCountSelect">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
	import {
		defineComponent,
		ref
	} from 'vue';

	export default {
		data() {
			return {
				input: ref(''),
				add: false,
				shop: false,
				activeName: "q",
				tableData: [],
				value1: '',
				value2: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {},
				shopstock: [],
				selectdata: [],
				warehouse: [],
				gongyingshang:[],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				formLabelWidth: '120px',

			}
		},
		methods: {
			//修改采购金额
			handleCellEdit(index,row){
				row.amountprice= row.backnumber*row.unitprice
			},
			//获取商品列表
			 handleAddDetails() {
			 	this.axios.get("http://localhost:8081/asms/wMaterialorder/selectstock").then((res) => {
			 			if (res.data.message === "success")
			 
			 				this.shopstock = res.data.data
			 			console.log(this.shopstock)
			 		})
			 		.catch(function(error) {
			 			console.log(error);
			 		});
			 	this.shop = true;
			 },//选中表中的数据
			handleSelectionChange(val) {
				console.log(this.multipleSelection = val);
				this.selectdata.push(this.multipleSelection)
				for (var i = 0; i < val.length; i++) {
					var obj = {};
					obj.materialcode = val[i].coCode;
					obj.materialname = val[i].coName;
					obj.typename = val[i].ciName;
					obj.brand = val[i].mname;
					obj.modelname = '';
					obj.sitepartname = val[i].isName;
					obj.unitname = val[i].mdTitle;
					obj.number = val[i].number;
					obj.backnumber = 1;
					obj.unitprice = 100;
					obj.amountprice = obj.backnumber*obj.unitprice;
					this.warehouse.push(obj)
				}
			},//确定  关闭商品表
			itsmTableCountSelect() {
				this.$nextTick(() => {
					this.$refs.multipleTable.clearSelection();
				})
				this.shop = false;

			},onSubmit(form) {
				form.wReturnedmaterials = this.warehouse
				this.axios.post("http://localhost:8081/asms/wPickingoutorder/insert", form).then((res)=> {
						if (res.data.message === "success")
							this.$message.success("新增成功！")
						this.add = false
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			init(){
				this.axios.get("http://localhost:8081/asms/wPickingoutorder/selectAll").then((res) => {
						if (res.data.message === "success")
							this.tableData = res.data.data
							for(var i=0;i<this.tableData.length;i++){
								this.tableData[i].billdate = this.formatDate(this.tableData[i].billdate)
							}
						console.log(this.tableData)
					})
					.catch(function(error) {
						console.log(error);
					});
			},formatDate(date) {
						  var d = new Date(date),
						    month = '' + (d.getMonth() + 1),
						    day = '' + d.getDate(),
						    year = d.getFullYear(),
							HH = d.getHours(),
							mm = d.getMinutes(),
							ss = d.getSeconds();
						
						  if (month.length < 2) month = '0' + month;
						  if (day.length < 2) day = '0' + day;
						
						  return [year, month, day].join('-')+" "+[HH, mm, ss].join(':');
						},
		},
		mounted() {
		  this.init();
		}
	};
</script>

<style scoped>
	.rightLabBox {
		position: absolute;
		right: 20px;
		top: 20px;

		div {
			border: solid 1px $green;
			color: $green;
			border-radius: 3px;
			padding: 4px 10px;
			font-size: 14px;
		}
	}
</style>
