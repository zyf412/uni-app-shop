export default {
	//为当前模块开启命名空间
	namespaced: true,
	
	// 模块的 state 数据
	state: () => ({ 
		// 购物车的数组，用来存储购物车中每个商品的信息对象 
		// 每个商品的信息对象，都包含如下 6 个属性： 
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state } 
		cart: JSON.parse( uni.getStorageSync('cart')  || '[]'), 
	}),
	
	//模块的mutations方法
	mutations: {
		addToCart(state, goods) { 
			// 根据提交的商品的Id，查询购物车中是否存在这件商品 
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象 
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id) 
			if (!findResult) { 
				// 如果购物车中没有这件商品，则直接 push 
				state.cart.push(goods) } 
			else {
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count++ 
			}
			
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车的state状态
		updateGoodsState(state,goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id) 
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			} 
		},
		// 更新购物车的商品数量
		updateGoodsNum(state,goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			} 
		},
		removeGoodsById(state,goods_id) {
			state.cart = state.cart.filter(x => x.goods_id!==goods_id)
			this.commit('m_cart/saveToStorage')
		},
		//更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(item => {
				item.goods_state = newState
			})
			this.commit('m_cart/saveToStorage')
		},
	},
	//模块的getters属性 
	getters: {
		total(state) {
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		// 勾选的商品的总数量 
		checkedCount(state) { 
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品 
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加 
			// reduce() 的返回值就是已勾选的商品的总数量 
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0) 
		},
		//动态渲染已经勾选的商品的价格
		checkedGoodsAmount(state) {
			return state.cart.filter(x=> x.goods_state).reduce((amount,item)=>amount+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	},
}