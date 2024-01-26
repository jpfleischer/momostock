<template>
<div id="app" :class="theme">
    <b-navbar toggleable="lg" :style="{ backgroundColor: `var(--${theme}-navbar-background)`, color: `var(--${theme}-navbar-text-color)` }">
      <b-navbar-brand to="/">
        <font-awesome-icon icon="cat" style="padding-left: 10px;" /> momostock
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="me-auto">
          <b-nav-item to="/">View Foods</b-nav-item>
          <b-nav-item to="/add">Add Food</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <!-- Login/logout nav item is outside the collapsible section -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="loggedInUser" to="/claim">
              <div class="claim-button">
                Claim Food
                <span class="notification-bubble" v-if="claimableFoodsCount > 0">{{ claimableFoodsCount }}</span>
              </div>
        </b-nav-item>
        <b-nav-item v-if="loggedInUser">
          <span class="nav-link">Hi, {{ loggedInUser }}</span>
          <b-button variant="link" @click="logout">Sign Out</b-button>
        </b-nav-item>
        <b-nav-item v-else to="/login">Login</b-nav-item>
        <b-nav-item>
          <b-button variant="link" @click="toggleTheme">
            <font-awesome-icon :icon="theme === 'dark' ? faSun : faMoon" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view @add-food="addFood" :foods="foods" />
  </div>
</template>

<script>
import axios from 'axios';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
export default {
  name: 'App',
  data() {
    return {
      foods: [],
      theme: 'light',
      faSun,
      faMoon,
      loggedInUser: localStorage.getItem('loggedInUser'),
      claimableFoodsCount: 0,
    }
  },
    // This will disable all Vue.js 2 legacy features for your component
  compatConfig: { MODE: 3 },

  methods: {
    addFood(food) {
      this.foods.push(food);
    },
    setTheme(theme) {
      document.body.classList.remove(this.theme); // Remove the current theme class
      this.theme = theme;
      document.body.classList.add(this.theme); // Add the new theme class
    },
    toggleTheme() {
      this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    },
    logout() {
      localStorage.removeItem('loggedInUser');
      this.loggedInUser = null;
      this.$router.push('/login');
    },
    async fetchClaimableFoodsCount() {
      const response = await axios.get(`${process.env.VUE_APP_SERVER_URL}/claimableFoodsCount`, {
        params: {
          user: this.loggedInUser
        }
      });
      this.claimableFoodsCount = response.data;
    },
  },
  async created() {
    const response = await axios.get(`${process.env.VUE_APP_SERVER_URL}/foods`);
    this.foods = response.data;
    this.fetchClaimableFoodsCount();
  },
  mounted() {
    this.setTheme('dark'); // Set the initial theme
  },
}
</script>

<style>
:root {
  --light-navbar-text-color: black;
  --dark-navbar-text-color: white;
  --light-navbar-toggler-color: black;
  --dark-navbar-toggler-color: white;
  --light-navbar-background: #f4e1d2;
  --dark-navbar-background: #3e2723;
  /* dark mocha */
  --light-navbar-brand-color: #000000;
  /* or whatever color you want in light mode */
  --dark-navbar-brand-color: #d3d3d3;
  /* light grey */
  --light-background: #ffffff;
  --light-text: #000000;

  --dark-background: #4c382c;
  --dark-text: #ffffff;
}

.light {
  background-color: var(--light-background);
  color: var(--light-text);
}

.dark {
  background-color: var(--dark-background);
  color: var(--dark-text);
}


.dark .navbar-nav .nav-link,
.dark .navbar-brand {
  color: var(--dark-navbar-text-color) !important;
}

.light .navbar-nav .nav-link,
.light .navbar-brand {
  color: var(--light-navbar-text-color) !important;
}

.right-align {
  text-align: right;
}

.claim-button {
  position: relative;
  display: inline-block;
}

.notification-bubble {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(90%, -50%);
  display: inline-block;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
}
.navbar-toggler {
    color: var(--light-navbar-toggler-color);
}

.dark .navbar-toggler {
    color: var(--dark-navbar-toggler-color);
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.dark .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>