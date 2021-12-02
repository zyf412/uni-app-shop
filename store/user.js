export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address')||'{}')
	}),
	mutations: {
		updateAddress(state,address) {
			state.address = address
			this.commit('m_user/saveAddrssToStorage')
		},
		saveAddrssToStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters: {
		addstr(state) {
			if (!state.address.provinceName) return '' 
			// 拼接 省，市，区，详细地址 的字符串并返回给用户 
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		} 
	}
}