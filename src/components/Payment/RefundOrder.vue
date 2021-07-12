<template>
	<p>退款单</p>
	<div>
		<div style="display: flex;margin-top: 20px;margin-bottom: 20px;">
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
			</el-table-column>
			<el-table-column
			  prop="name"
			  label="所属门店"
			  width="180">
			</el-table-column>
		    <el-table-column
		      prop="name"
		      label="退款单号"
		      width="180">
		    </el-table-column>
			<el-table-column
			  prop="address"
			  label="单据日期">
			</el-table-column>
		    <el-table-column
		      prop="address"
		      label="单据状态">
		    </el-table-column>
			<el-table-column
			  prop="address"
			  label="客户名称">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="联系电话">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="应付金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="本次付款">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="合计余额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="收款单号">
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
