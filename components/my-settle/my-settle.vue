<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState(isFullCheck)"> 
			<radio color="#C00000" :checked="isFullCheck"><text>全选</text></radio>
		</label> <!-- 合计区域 -->
		<view class="amount-box"> 合计:<text class="amount">￥{{checkedGoodsAmount}}</text> </view> <!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			isFullCheck() {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(isFullCheck) {
				console.log(isFullCheck)
				this.updateAllGoodsState(!isFullCheck)
			},
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */ 
		width: 100%; 
		height: 50px; 
		background-color: while;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px; 
		.radio { 
			display: flex;
			align-items: center;
		}
		.amount { 
			color: #c00000; 
		}
		.btn-settle { 
			height: 50px;
			min-width: 100px; 
			background-color: #c00000; 
			color: white; 
			line-height: 50px; 
			text-align: center; 
			padding: 0 10px; 
		} 
	}
</style>
