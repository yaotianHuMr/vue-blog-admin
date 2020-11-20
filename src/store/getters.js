const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
  visitedViews: state => state.tagsView.visitedViews,
  // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
