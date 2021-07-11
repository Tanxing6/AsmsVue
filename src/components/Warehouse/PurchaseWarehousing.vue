<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		采购入库
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
				<el-table :data="tableData" border style="width: 100%;text-align: center;">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column prop="djh" label="操作" show-overflow-tooltip></el-table-column>
					<el-table-column prop="kdrq" label="所属门店" show-overflow-tooltip></el-table-column>
					<el-table-column prop="djlx" label="入库单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="单据状态" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="bh" label="供应商" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="spmc" label="采购金额" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mll" label="税率" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="djh" label="采购金额(含税)" show-overflow-tooltip></el-table-column>
					<el-table-column prop="kdrq" label="入库时间" show-overflow-tooltip></el-table-column>
					<el-table-column prop="djlx" label="发票单号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="订单编号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="bh" label="备注" show-overflow-tooltip>
					</el-table-column>
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
	<el-dialog title="物资采购入库单" v-model="add" width="88%">

		<el-form :model="form" label-width="90px;" style="width: 100%;">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="订货单号" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="供货商" :label-width="formLabelWidth">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="税率" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="创建时间" :label-width="formLabelWidth">
						<el-input v-model="form.name" size="small"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="margin-bottom: 20px;margin-top: 20px;">入库物资</el-row>
			<div>
				<el-table :data="tableData" :row-class-name="rowClassName" show-summary border style="width: 100%;text-align: center;">
					<el-table-column type="index" label="序号" center width="50"></el-table-column>
					<el-table-column label="操作">
						<i class=" el-icon-circle-plus-outline" style="font-size: 24px; color: #1890ff;"
							@click="handleAddDetails" />
						<!-- <i class=" el-icon-remove-outline" style="font-size: 24px; color: #1890ff;"
							@click="handleDeleteDetails(scope.$index, scope.row)" /> -->
					 <!-- <template slot-scope="scope">
					            <el-button
					              size="mini"
					              type="danger"
					              @click="handleDeleteDetails(scope.$index, scope.row)"
					              >删除</el-button
					            >
					          </template> -->
					</el-table-column>
					<el-table-column prop="materialcode" label="物资编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="materialname" label="物资名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="物资条码" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="typename" label="物资分类" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="brand" label="物资品牌" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="mll" label="规格型号" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="modelname" label="适用车型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sitepartname" label="安装部位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="unitname" label="物资单位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="backnumber" label="采购数量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="unitprice" label="采购单价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="amountprice" label="采购数额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="税率(%)" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="含税单价" show-overflow-tooltip></el-table-column>
					<el-table-column prop="khhy" label="含税金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="storename" label="仓库库位" show-overflow-tooltip></el-table-column>
					<el-table-column prop="bh" label="备注" show-overflow-tooltip>
					</el-table-column>
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
				入库金额：{{}} &nbsp; 合计税额：{{}}
				含税金额：{{}}
			</span>
			<span class="dialog-footer">
				<el-button @click="add = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<!--查看弹框-->
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
				activeName: "q",
				tableData: [{
					materialcode:'',
					materialname:'',
					khhy:'',
					typename:'',
					brand:'',
					mll:'',
					modelname:'',
					sitepartname:'',
					unitname:'',
					backnumber:'',
					unitprice:'',
					amountprice:'',
					khhy:'',
					khhy:'',
					khhy:'',
					storename:'',
					bh:''
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
			handleDeleteDetails(val,row) {
			      if (this.tableData.length == 0) {
			        this.tableData.splice(row.id, 1);
			      }
			    },
			 handleAddDetails() {
			      if (this.tableData === undefined) {
			        this.tableData = new Array();
			      }
			      var obj = {};
			      obj.materialcode='';
			      obj.materialcode='';
					obj.materialname='';
					obj.khhy='';
					obj.typename='';
					obj.brand='';
					obj.mll='';
					obj.modelname='';
					obj.sitepartname='';
					obj.unitname='';
					obj.backnumber='';
					obj.unitprice='';
					obj.amountprice='';
					obj.khhy='';
					obj.storename='';
					obj.bh='';
			
			      this.tableData.push(obj);
			    },
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
