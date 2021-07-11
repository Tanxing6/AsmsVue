<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="门店设置" name="first">
				<el-row>
					<el-input v-model="input" style="width:200px;margin-right:20px" placeholder="请输入门店名称搜索"></el-input>
					<el-button type="primary" size="mini" @click="selectLikeName()">查询</el-button>
					<el-button type="primary" size="mini" style="margin-left:885px" icon="el-icon-circle-plus-outline" @click="setshopOn()">新增门店</el-button>	
				</el-row>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" :index="indexMethod" label="序号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="snumber" label="门店编号" show-overflow-tooltip> </el-table-column>
					<el-table-column prop="sname" label="门店名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sfullname" label="门店全称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sleader" label="门店领导" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sphone" label="联系电话" show-overflow-tooltip></el-table-column>
					<el-table-column prop="saddress" label="门店地址" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" width="145">
						<template #default="scope">
							<el-button @click="handlerApiList(scope.row.id)" type="text" size="small">编辑</el-button>
							<el-button @click="handleCreate1(scope.row.id)" type="text" size="small">删除</el-button>
							<el-button @click="handleDelete(scope.row.id)" type="text" size="small">停用</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<el-tab-pane label="部门设置" name="second">
				<el-row>
					<el-select v-model="deptFrom.suptypeid" placeholder="请选择" id="select1" size="small">
						<el-option @click.native="change(item.sid)" v-for="item in tableData" :key="item.sid" :label="item.sname" :value="item.sid">
						</el-option>
					</el-select>					
					<el-button type="primary" size="mini"  style="margin-left:10px" @click="selectLikeName()">查询</el-button>
					<el-button type="primary" size="mini" style="margin-left:885px" icon="el-icon-circle-plus-outline" @click="setdept()">添加部门</el-button>	
				</el-row>
				<el-table :data="deptFrom" stripe style="width: 100%">
					<el-table-column type="index" :index="indexMethod" label="序号" show-overflow-tooltip ></el-table-column>
					<el-table-column prop="snumber" label="所属门店" show-overflow-tooltip> </el-table-column>
					<el-table-column prop="sname" label="部门编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sfullname" label="部门名称" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" show-overflow-tooltip>
						<template #default="scope">
							<el-button @click="handlerApiList(scope.row.id)" type="text" size="small">编辑</el-button>
							<el-button @click="handleCreate1(scope.row.id)" type="text" size="small">删除</el-button>
							<el-button @click="handleDelete(scope.row.id)" type="text" size="small">停用</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>

			<el-tab-pane label="岗位设置" name="third">
				<el-row>
					<el-input v-model="input" style="width:200px;margin-right:20px" placeholder="请输入门店名称搜索"></el-input>
					<el-button type="primary" @click="selectLikeName()">查询</el-button>
					<el-button type="primary" style="margin-left:885px" icon="el-icon-circle-plus-outline" @click="setshopOn()">新增门店</el-button>	
				</el-row>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" :index="indexMethod" label="序号" show-overflow-tooltip></el-table-column>
					<el-table-column prop="snumber" label="所属名店" show-overflow-tooltip> </el-table-column>
					<el-table-column prop="sname" label="部门编码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="sfullname" label="部门名称" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" width="145">
						<template #default="scope">
							<el-button @click="handlerApiList(scope.row.id)" type="text" size="small">编辑</el-button>
							<el-button @click="handleCreate1(scope.row.id)" type="text" size="small">删除</el-button>
							<el-button @click="handleDelete(scope.row.id)" type="text" size="small">停用</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
  		</el-tabs>

		<el-dialog title="添加门店" v-model="setshop">
			<el-form :model="storeForm" label-width="70px" style="width: 740px;margin-left:100px">
				<el-row span="2">
					<el-col span="2">
						<el-form-item label="门店编号" :label-width="formLabelWidth">
							<el-input v-model="storeForm.snumber" size="small" disabled placeholder="自动生成"></el-input>
						</el-form-item>
						<el-form-item label="门店名称" :label-width="formLabelWidth">
							<el-input v-model="storeForm.sname" size="small"></el-input>
						</el-form-item>
						<el-form-item label="门店全称" :label-width="formLabelWidth">
							<el-input v-model="storeForm.sfullname" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col span="2" style="margin-left:30px">
						<el-form-item label="门店领导" :label-width="formLabelWidth">
							<el-input v-model="storeForm.sleader" size="small"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" :label-width="formLabelWidth">
							<el-input v-model="storeForm.sphone" size="small"></el-input>
						</el-form-item>
						<el-form-item label="门店地址" :label-width="formLabelWidth">
							<el-input v-model="storeForm.saddress" size="small"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="setshop = false">取 消</el-button>
				<el-button type="primary" @click="addStore">添 加</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog title="添加部门" v-model="deptSet" width="30%">
			<el-form :model="deptAddForm" label-width="70px" style="width: 340px;margin-left:70px">
				<el-row span="2">
					<el-col span="2">
						<el-form-item label="部门名称" :label-width="formLabelWidth">
							<el-input v-model="deptAddForm.dname" size="small"></el-input>
						</el-form-item>
						<el-form-item label="部门编码" :label-width="formLabelWidth">
							<el-input v-model="deptAddForm.dcode" size="small" disabled placeholder="自动生成"></el-input>
						</el-form-item>
						<el-form-item label="所属门店" :label-width="formLabelWidth">
							<el-select v-model="deptAddForm.sid" placeholder="请选择" id="select2" size="small">
								<el-option v-for="item in tableData2" :key="item.sid" :label="item.sname" :value="item.sid"></el-option>
							</el-select>	
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="deptSet = false">取 消</el-button>
				<el-button type="primary" @click="addDept()">添 加</el-button>
			</span>
		</template>
	</el-dialog>
	</div>

	
</template>

<script>

export default {
data() {
	return {
		input:"",
		tableData: [

		],
		tableData2:[

		],
		deptFrom:[

		],
		setshop:false,
		deptSet:false,
		storeForm:{},
		deptAddForm:{}
	}
},
methods:{
	//初始化方法
	init(){
		var _this = this
		this.axios.get("http://localhost:8081/store/selectAll")
		.then(function(res){
			// console.log(res.data)
			_this.tableData=res.data
			_this.tableData2=res.data
		})
	},
	indexMethod(index) {
        return index+1;
    },
	//根据门店名称模糊查询门店
	selectLikeName(){
		var _this = this
		this.axios.get("http://localhost:8081/store/selectByName",{params:{name:this.input}})
		.then(function(res){
			// console.log(res.data)
			_this.tableData=res.data
		})
	},
	//打开添加门店窗口
	setshopOn(){
		this.setshop=true
	},
	//打开添加部门窗口
	setdept(){
		this.deptSet=true
	},
	//添加门店
	addStore(){
		var _this = this
		this.axios.post("http://localhost:8081/store/addStore",this.storeForm)
		.then(function(res){
			// console.log(res.data)
			_this.setshop=false
			alert("添加门店成功！")
		})
	},
	//添加部门
	addDept(){
		var _this = this
		this.axios.post("http://localhost:8081/dept/addDept",this.deptAddForm)
		.then(function(res){
			// console.log(res.data)
			_this.setshop=false
			alert("添加部门成功！")
		})
	},
	//通过门店id查询下属部门
	change(id){
		var _this = this
		this.axios.get("http://localhost:8081/dept/selectDept",{params:{id:this.id}})
		.then(function(res){
			// console.log(res.data)
			_this.deptFrom=res.data
		})
	}

},
// 创建完毕状态
created: function() {
	this.init();
},

}
</script>

<style>
</style>
