<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="门店设置" name="first">
				<el-row>
					<el-input v-model="input" style="width:200px;margin-right:20px" placeholder="请输入门店名称搜索"></el-input>
					<el-button type="primary" @click="selectLikeName()">查询</el-button>
					<el-button type="primary" style="margin-left:885px" icon="el-icon-circle-plus-outline" @click="setshopOn()">新增门店</el-button>	
				</el-row>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" :index="indexMethod" label="序号" width="70"></el-table-column>
					<el-table-column prop="snumber" label="门店编号" width="130"> </el-table-column>
					<el-table-column prop="sname" label="门店名称" width="220"></el-table-column>
					<el-table-column prop="sfullname" label="门店全称" width="220"></el-table-column>
					<el-table-column prop="sleader" label="门店领导" width="100"></el-table-column>
					<el-table-column prop="sphone" label="联系电话" width="130"></el-table-column>
					<el-table-column prop="saddress" label="门店地址" width="280"></el-table-column>
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
					<el-input v-model="input" style="width:200px;margin-right:20px" placeholder="请输入门店名称搜索"></el-input>
					<el-button type="primary" @click="selectLikeName()">查询</el-button>
					<el-button type="primary" style="margin-left:885px" icon="el-icon-circle-plus-outline" @click="setshopOn()">新增门店</el-button>	
				</el-row>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" :index="indexMethod" label="序号" width="70"></el-table-column>
					<el-table-column prop="snumber" label="门店编号" width="130"> </el-table-column>
					<el-table-column prop="sname" label="门店名称" width="220"></el-table-column>
					<el-table-column prop="sfullname" label="门店全称" width="220"></el-table-column>
					<el-table-column prop="sleader" label="门店领导" width="100"></el-table-column>
					<el-table-column prop="sphone" label="联系电话" width="130"></el-table-column>
					<el-table-column prop="saddress" label="门店地址" width="280"></el-table-column>
					<el-table-column label="操作" width="145">
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
					<el-table-column type="index" :index="indexMethod" label="序号" width="70"></el-table-column>
					<el-table-column prop="snumber" label="门店编号" width="130"> </el-table-column>
					<el-table-column prop="sname" label="门店名称" width="220"></el-table-column>
					<el-table-column prop="sfullname" label="门店全称" width="220"></el-table-column>
					<el-table-column prop="sleader" label="门店领导" width="100"></el-table-column>
					<el-table-column prop="sphone" label="联系电话" width="130"></el-table-column>
					<el-table-column prop="saddress" label="门店地址" width="280"></el-table-column>
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
	</div>

	
</template>

<script>

export default {
data() {
	return {
		input:"",
		tableData: [

		],
		setshop:false,
		storeForm:{}
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
	//添加门店
	addStore(){
		var _this = this
		this.axios.post("http://localhost:8081/store/addStore",this.storeForm)
		.then(function(res){
			// console.log(res.data)
			this.setshop=false
			alert("添加门店成功！")
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
