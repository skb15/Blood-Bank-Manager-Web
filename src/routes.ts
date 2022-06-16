import Home from './pages/AppHome.vue';
import Result from './pages/ClientResult.vue';
import Dashboard from './pages/AdminDashboard.vue';

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'result', path: '/search', component: Result },
	{ name: 'dashboard', path: '/dashboard', component: Dashboard },
];

export default routes;
