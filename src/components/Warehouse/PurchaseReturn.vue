<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		采购退货
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
					<a class="el-button fr el-button--primary el-button--mini" title="新增" @click="opendialog1">新增</a>
				</div>
			</div>
			<div>
				<el-table :data="tableData" border style="width: 100%;text-align: center;">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="organizeId" label="所属门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="billcode" label="退货单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="state" label="单据状态" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="supplerId" label="供应商" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="amount" label="退货金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="pickingId" label="经手人" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="billdate" label="创建时间" width="150px" show-overflow-tooltip>
						
					</el-table-column>
					<el-table-column prop="djlx" label="申请单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="入库单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="bh" label="备注" show-overflow-tooltip></el-table-column>
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
	<el-dialog title="物资采购采购出库单" v-model="add" width="88%">

		<el-form :model="form" label-width="90px;" style="width: 100%;">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="所属门店" :label-width="formLabelWidth">
						<el-input v-model="form.organizeId" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="供应商" :label-width="formLabelWidth">
						<el-select v-model="form.supplerId" placeholder="请选择">
							<el-option v-for="item in gongyingshang" :key="item.suppliername" :label="item.suppliername"
								:value="item.suppliername">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="经手人" :label-width="formLabelWidth">
						<el-select v-model="form.pickingId" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<!-- <el-col :span="6">
					<el-form-item label="入库单号" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col> -->
				<el-col :span="6">
					<el-form-item label="退货原因" :label-width="formLabelWidth">
						<el-input v-model="form.backreason" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="margin-bottom: 20px;margin-top: 20px;">
				退货物资
				<i class=" el-icon-circle-plus-outline" style="font-size: 24px; color: #1890ff;margin-left: 20px;"
					@click="handleAddDetails" />
			</el-row>
			<div>
				<el-table :data="warehouse" :row-class-name="rowClassName" border
					style="width: 100%;text-align: center;">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="materialcode" label="物资编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="materialname" label="物资名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="typename" label="物资分类" show-overflow-tooltip></el-table-column>
					<el-table-column prop="brand" label="物资品牌" show-overflow-tooltip></el-table-column>
					<el-table-column prop="modelname" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sitepartname" label="安装部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="unitname" label="物资单位" show-overflow-tooltip></el-table-column>
					<!-- <el-table-column prop="backnumber" label="库存数量" show-overflow-tooltip></el-table-column> -->
					<el-table-column prop="backnumber" label="退货数量" show-overflow-tooltip>
						<template #default="scope">
							<el-input size="small" v-model="scope.row.backnumber" placeholder="请输入内容"
								@change="handleCellEdit(scope.$index, scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="unitprice" label="退货单价" show-overflow-tooltip>
						<template #default="scope">
							<el-input size="small" v-model="scope.row.unitprice" placeholder="请输入内容"
								@change="handleCellEdit(scope.$index, scope.row)"></el-input>
						</template>
					</el-table-column>
 					<el-table-column prop="amountprice" label="退货数额" show-overflow-tooltip></el-table-column>
<!--					<el-table-column prop="khhy" label="税率(%)" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="含税金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="storename" label="仓库库位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="bh" label="备注" show-overflow-tooltip></el-table-column> -->
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
			<span style="float: left;">
				出库数量：{{this.form.backnumber}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				退货金额：{{this.form.amountprice}}
			</span>
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
				<el-table ref="multipleTable" :data="shopstock" @selection-change="handleSelectionChange" border
					style="width: 100%;text-align: center;">
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
				form: {
					wReturnedmaterials:[]
				},
				shopstock: [],
				selectdata: [],
				warehouse: [],
				gongyingshang:[],
				formLabelWidth: '120px',

			}
		},
		methods: {
			formatDate(date) {
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
			opendialog1(){
				this.add=true;
				this.axios.get("http://localhost:8081/asms/wMaterialorder/selectSupp").then((res)=> {
						this.gongyingshang=res.data.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
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
				this.axios.post("http://localhost:8081/asms/wDeliveryorder/insert", form).then((res)=> {
						if (res.data.message === "success")
							this.$message.success("新增成功！")
						this.add = false
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			init(){
				this.axios.get("http://localhost:8081/asms/wDeliveryorder/selectAll").then((res) => {
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
			},
		},
		mounted() {
		  this.init();
		}
	};
</script>

<style>
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
