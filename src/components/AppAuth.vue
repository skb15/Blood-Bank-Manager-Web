<template>
	<section class="absolute flex items-center justify-center w-screen h-screen z-10 bg-black/50 ">
		<div class="max-w-fit bg-slate-200 p-8 rounded-lg">
			<header>
				<img src="../assets/logo-small.svg" alt="logo" class="w-16 mx-auto mb-5" />
			</header>
			<form @submit.prevent="authenticate">
				<div>
					<label class="block mb-2 text-slate-500" for="username">Username</label>
					<input v-model="username"
						class="w-full p-2 mb-6 text-slate-700 border-b-2 border-slate-500 outline-none focus:bg-gray-300"
						type="text" name="username">
				</div>
				<div>
					<label class="block mb-2 text-slate-500" for="password">Password</label>
					<input v-model="password"
						class="w-full p-2 mb-6 text-slate-700 border-b-2 border-slate-500 outline-none focus:bg-gray-300"
						type="password" name="password">
				</div>
				<div>
					<input class="w-full bg-slate-700 hover:bg-red-700 text-white font-medium py-2 px-4 mb-6 rounded"
						type="submit" value="Login">
				</div>
			</form>
			<footer>
				<span class="block w-fit mx-auto text-red-600 font-medium">{{ error }}</span>
			</footer>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
	name: "AppAuth",
	emits: ["login"],
	data() {
		return { username: '', password: '', error: '' }
	},
	methods: {
		async authenticate() {
			const response = await axios.post(`http://127.0.0.1:5000/users`, {
				username: this.username,
				password: this.password
			})

			if (response.data.error) {
				this.error = response.data.error
			} else {
				if (response.data.type == "bank") {
					this.$router.push({
						name: "dashboard",
						query: { id: response.data.id }
					})
				} else {
					this.$emit('login', true)
				}
			}
		}
	}
})
</script>