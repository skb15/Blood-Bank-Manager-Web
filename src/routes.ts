import Home from "./pages/PageIndex.vue"
import Result from "./pages/PageResult.vue"

const routes = [
	{ name: "home", path: "/", component: Home },
	{ name: "result", path: "/search", component: Result }
]

export default routes