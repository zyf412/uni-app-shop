<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key = "index" @click="gotoDetail(item)">
				<my-goods :item = "item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词 
					query: '',
					// 商品分类Id 
					cid: '', 
					// 页码值 
					pagenum: 1, 
					// 每页显示多少条数据 
					pagesize: 10 ,
				},
				// 商品列表的数据 
				goodsList: [], 
				// 总数量，用来实现分页 
				total: 0,
				//是否正在请求数据
				isLoading: false,
			};
		},
		onLoad(options) { 
			console.log(options)
			// 将页面参数转存到 this.queryObj 对象中 
			this.queryObj.query = options.query || '' 
			this.queryObj.cid = options.cid || '' 
			this.getGoodsList()
			
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) 
			return uni.$showMsg("数据加载完毕")
			if(this.isLoading) return
			this.queryObj.pagenum+=1
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 1. 重置关键数据 
			this.queryObj.pagenum = 1 
			this.total = 0 
			this.isloading = false
			this.goodsList = []
			// 2. 重新发起请求,并传入一个结束下拉刷新的回调函数
			 this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb) {
				this.isLoading = true
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg() 
				// 为数据赋值 
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id 
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
