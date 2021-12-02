<template>
	<view class="goods-item">
		<!-- 左侧商品图片 -->
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="redioClickHandler" ></radio>
			<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧商品信息 -->
		<view class="goods-item-right">
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price | tofixed}}
				</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="item.goods_count" v-if="showNumberbox" @change="numberChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item: {
				type: Object,
				default:{}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumberbox: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4 /pics/movie/celebrity-default-medium.png',
				
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			//radio 的点击处理函数
			redioClickHandler() {
				this.$emit('radio-change',{
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			//商品数量改变处理函数
			numberChangeHandler(newVal) {
				this.$emit ('num-change',{
					goods_id: this.item.goods_id,
					goods_count: newVal-0 //保证是一个数字
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item { 
		display: flex; 
		width: 750rpx;
		// width: 100%;
		box-sizing: border-box;
		padding: 10px 5px; 
		border-bottom: 1px solid #f0f0f0; 
		.goods-item-left { 
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 5px; 
			.goods-pic { 
				width: 100px; 
				height: 100px; 
				display: block; 
			} 
		}
		.goods-item-right { 
			display: flex;
			flex-direction: column; 
			justify-content: space-between; 
			.goods-name {
				font-size: 13px; 
			}
			.goods-info-box{
				display: flex;
				flex: 1;
				justify-content: space-between;
				align-items: center;
				.goods-price {
					font-size: 16px; 
					color: #c00000; 
				} 
			}
			
		} 
	}
</style>
