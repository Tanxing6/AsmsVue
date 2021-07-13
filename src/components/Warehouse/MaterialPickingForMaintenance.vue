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
					<a class="el-button fr el-button--primary el-button--mini" title="新增" @click="wxadd">新增</a>
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

		<el-form :model="form" label-width="250px;" style="width: 100%;">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="维修单号" :label-width="formLabelWidth">
						<el-input v-model="form.repaircode" @click="wx=true" size="small"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="6">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="form.username" disabled="false" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" disabled="false" size="small"></el-input>
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
						<el-input v-model="form.carbrandname" disabled="false" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="车系" :label-width="formLabelWidth">
						<el-input v-model="form.carservicename" disabled="false" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="车型" :label-width="formLabelWidth">
						<el-input v-model="form.carmodelsname" disabled="false" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="领料人员" :label-width="formLabelWidth">
						<el-select v-model="form.pickuserId" placeholder="请选择">
							<el-option v-for="item in empData4" :key="item.name" :label="item.name"
								:value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="创建时间" :label-width="formLabelWidth">
						<el-input style="width: 150px;" disabled="false" v-model="form.billdate" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="margin-bottom: 20px;margin-top: 20px;">
				材料明细
				<i class=" el-icon-circle-plus-outline" style="font-size: 24px; color: #1890ff;margin-left: 20px;"
					@click="handleAddDetails" />
			</el-row>
			<div>
				<el-table :data="warehouse"  border style="width: 100%;font-size: 13px;" empty-text="暂无数据">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column label="操作" width="50px">
						<template #default="scope">
							<i class=" el-icon-remove-outline" style="font-size: 24px; color: #1890ff;"
								@click="handleDelDetails(scope.$index, scope.row)" />
						</template>
					</el-table-column>
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
				<el-button @click="itsmTableCountSelectfalse">取 消</el-button>
				<el-button type="primary" @click="itsmTableCountSelect">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	
	<!-- 维修单号 -->
	<el-dialog title="选择维修单" v-model="wx" width="88%">
		
		<el-form :model="wxs" label-width="90px;" style="width: 100%;">
			<div>
				<el-table ref="weixiu" :data="wxstock" @selection-change="handleSelectionwx"
          @select-all="dialogCheck"
          @select="dialogCheck"   border style="width: 100%;font-size: 13px;" empty-text="暂无数据" >
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="carmanagement.chepai" label="车牌号"></el-table-column>
					<el-table-column prop="customer.cname" label="送修人"></el-table-column>
					<el-table-column prop="mainbillingid" label="单据编码"></el-table-column>
					<el-table-column prop="mainorderstuta" label="单据状态" align="center">
						<template v-slot="scope">
							<p v-if="scope.row.mainorderstuta=='0'" style="background-color: #333333;color: #FFFFFF;">待付款</p>
							<p v-if="scope.row.mainorderstuta=='1'" style="background-color: #ffff00;color: #FFFFFF;">已完成</p>
							<p v-if="scope.row.mainorderstuta=='2'" style="background-color: #ff0000;color: #FFFFFF;">已登记</p>
							<p v-if="scope.row.mainorderstuta=='3'" style="background-color: #e2e2e2;color: #2C3E50;">已收款</p>
						</template>
					</el-table-column>
					<el-table-column prop="service.servicename" label="维修单类型"></el-table-column>
					<el-table-column prop="mainorder" label="创建时间"></el-table-column>
				</el-table>
			</div>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="wx = false">取 消</el-button>
				<el-button type="primary" @click="wxSelect">确 定</el-button>
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
				wx:false,
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
				empData4:[],
				copyw: [],
				wxcopy:[],
				gongyingshang:[],
				wxstock:[],
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
			//删除当前行
			handleDelDetails(row,index){
				this.warehouse.splice(index, 1);
			},
			//获取商品列表
			 handleAddDetails() {
			 // 	this.axios.get("http://localhost:8081/asms/wMaterialorder/selectstock").then((res) => {
			 // 			if (res.data.message === "success")
			 
			 // 				this.shopstock = res.data.data
			 // 			console.log(this.shopstock)
			 // 		})
			 // 		.catch(function(error) {
			 // 			console.log(error);
			 // 		});
			 	this.shop = true;
			 },
			 //复选变单选
			 dialogCheck: function(selection, row) {
			             //console.log(selection, row);
			             this.$refs.weixiu.clearSelection()
			             if (selection.length === 0) {
			                 return
			             }
			             if (row) {
			                 this.selectioned = row
			                 this.$refs.weixiu.toggleRowSelection(row, true)
			             }
			         }
			 ,//选中表中的数据
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
					this.copyw.push(obj)
				}
			},
			//选中维修表中的数据
			handleSelectionwx(val){
				// form.name
				// form.username
				// form.phone
				// form.platenumber
				// form.framenumber
				// form.carbrandname
				// form.carservicename
				// form.carmodelsname
				// form.pickuserId
				if(val[0]!=null){
					console.log(val[0])
				 	var obj = {};
				 	obj.repaircode = val[0].mainbillingid;
				 	obj.username = val[0].customer.cname;
				 	obj.phone = val[0].customer.cphone;
				 	obj.platenumber = val[0].carmanagement.chepai;
				 	obj.framenumber = val[0].carmanagement.chejiano;
				 	obj.carbrandname = '';
				 	obj.carservicename = '';
				 	obj.carmodelsname = '';
				 	obj.pickuserId = val[0].emp.name;
					obj.billdate = this.formatDate(val[0].mainorder);
					console.log(obj)
					this.form = obj;
					var cocode = val[0].commodity.coCode;
					
					var ob={};
					for(var i = 0;i<this.shopstock.length;i++){
						if(this.shopstock[i].coCode == cocode){
							console.log(this.shopstock[i])
							ob.materialcode = this.shopstock[i].coCode;
							ob.materialname = this.shopstock[i].coName;
							ob.typename = this.shopstock[i].ciName;
							ob.brand = this.shopstock[i].mname;
							ob.modelname = '';
							ob.sitepartname = this.shopstock[i].isName;
							ob.unitname = this.shopstock[i].mdTitle;
							ob.number = this.shopstock[i].number;
							ob.backnumber = 1;
							ob.unitprice = 100;
							ob.amountprice = ob.backnumber*ob.unitprice;
							this.copyw.push(ob)
						}
					}
					//var obj = {};
					
					}
				// 	obj.unitprice = 100;
				// 	obj.amountprice = obj.backnumber*obj.unitprice;
				// 	this.copyw.push(obj)
				//}
			},
			//确定  关闭商品表
			itsmTableCountSelect() {
				for (var i = 0, len = this.copyw.length; i < len; i++) {
					//this.mount+=this.copyw[i].amountprice
					this.warehouse.push(this.copyw[i]);
				}
				this.copyw = []
				//console.log("复制的数组"+this.copyw)
				this.$nextTick(() => {
					this.$refs.multipleTable.clearSelection();
				})
				this.shop = false;
				
			},//取消关闭商品表
			itsmTableCountSelectfalse() {
				this.copyw = []
				//console.log("复制的数组"+this.copyw)
				this.$nextTick(() => {
					this.$refs.multipleTable.clearSelection();
				})
				this.shop = false;
			},
			//确定 	关闭维修表
			wxSelect(){
				for (var i = 0, len = 1; i < len; i++) {
					//this.mount+=this.copyw[i].amountprice
					this.warehouse.push(this.copyw[i]);
				}
				// wxcopy
				this.$nextTick(() => {
					this.$refs.weixiu.clearSelection();
				})
				this.wx = false;
			},
			panduan(){
				for(var i=0;i<this.warehouse.length;i++){
					if(this.warehouse[i].number<this.warehouse[i].backnumber){
						return true;
					}
				}
				return false;
			}
			//提交
			,onSubmit(form) {
				if(this.warehouse[0]==null){
					this.$message.warning("请选择物资")
				}else if(this.panduan()==true){
					this.$message.warning("库存数量不足")
				}else if(this.form.pickuserId==null){
					this.$message.warning("请选择领料人")
				}else{
					form.wReturnedmaterials = this.warehouse
					this.axios.post("http://localhost:8081/asms/wPickingoutorder/insert", form).then((res)=> {
							if (res.data.message === "success")
								this.$message.success("新增成功！")
							this.add = false
						})
						.catch(function(error) {
							console.log(error);
						});
					this.init();
				}
			},
			wxadd(){
				this.warehouse=[];
				this.form={};
				this.axios.get("http://localhost:8081/asms/wPickingoutorder/selectWX").then((res) => {
						if (res.data.message === "success")
							this.wxstock = res.data.data
							
						console.log(this.tableData)
					})
					.catch(function(error) {
						console.log(error);
					});
				this.add = true
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
					this.axios.get("http://localhost:8081/asms/wMaterialorder/selectstock").then((res) => {
							if (res.data.message === "success")
								 
								this.shopstock = res.data.data
							console.log(this.shopstock)
						})
						.catch(function(error) {
							console.log(error);
						});
					// 员工
					this.axios.get("http://localhost:8081/asms/emp/findall")
					.then((res)=> {
						console.log("员工外键显示：", res.data)
						this.empData4 = res.data
					
					}).catch(function(error) {
						console.log(error)
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
		created() {
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
