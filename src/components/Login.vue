<template>
    <div class="login">
        <h1>Login</h1>
        <p>Select a user to login as:</p>
        <button v-for="user in users" :key="user" @click="login(user)">{{ user }}</button>
    </div>
</template>

<script>
export default {
    name: 'UserLogin',
    data() {
        return {
            users: ['J.P.', 'Joe', 'Jonah', 'Joshua']
        }
    },
    methods: {
        login(user) {
            // Here you can handle the login logic
            // For example, you can save the selected user in the local storage
            localStorage.setItem('loggedInUser', user);
            // Then redirect the user to the home page
            window.location.href = '/';
        }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

button {
    margin: 10px;
}
</style>