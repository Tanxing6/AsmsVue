<template>
	<p>待收列表</p>
	<div>
		<div style="display: flex;margin-bottom: 20px;">
			<el-input
			  placeholder="请输入内容"
			  v-model="input"
			  clearable>
			</el-input>
			<el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			  <el-select v-model="value" placeholder="请选择来源类型">
			      <el-option
			        v-for="item in options"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>
				<el-button @click="">查询</el-button>
		</div>
		 <el-table
		    :data="tableData"
		    height="250"
		    border
		    style="width: 100%">
		     <el-table-column
		          type="index"
				  label="序号"
		          >
		    </el-table-column>
			<el-table-column
			      type="selection"
			     >
			</el-table-column>
			<el-table-column
			      label="操作"
			      >
				  <el-button type="text">收款</el-button>
			</el-table-column>
		    <el-table-column
		      prop="name"
		      label="单据编号"
		     >
		    </el-table-column>
			<el-table-column
			  prop="address"
			  label="单据日期">
			</el-table-column>
		    <el-table-column
		      prop="address"
		      label="来源单类型"  width="100">
		    </el-table-column>
			<el-table-column
			  prop="address"
			  label="来源单据状态"  width="100">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="往来关系">
			</el-table-column>
			
			<el-table-column
			  prop="address"
			  label="往来客户">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="车牌号/车架号" width="100">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="本单金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="已收金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="免收金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="未收金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="经手人">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="备注">
			</el-table-column>
		  </el-table>
		 
	</div>
</template>

<script>
</script>

<style>
</style>
