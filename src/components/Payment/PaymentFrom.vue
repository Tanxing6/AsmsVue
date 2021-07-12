<template>
	<p>付款单</p>
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
		      label="来源单类型">
		    </el-table-column>
			<el-table-column
			  prop="address"
			  label="来源单据">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="往来关系">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="单据日期">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="往来客户">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="付款金额">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="免付金额">
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
	import { defineComponent, ref } from 'vue'
	
	export default defineComponent ({
	  setup() {
	    return {
	      input: ref('')
	    }
	  }
	})
</script>

<style>
	.el-input{
		width: 180px;
	}
</style>
