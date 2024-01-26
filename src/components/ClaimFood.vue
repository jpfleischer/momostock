<template>
    <div>
        <h1>Claim Food</h1>
        <div v-if="claimableFoods.length > 0" class="food-item">
            <h2>IS THIS YOURS? 🤔</h2>
            <h3>{{ claimableFoods[0].title }}</h3>
            <img :src="`${serverUrl}/uploads/${claimableFoods[0].image_location}`" alt="Food image" height="200"
                class="food-image">
            <div>
                <button class="btn btn-primary" @click="openDialog(claimableFoods[0])"
                    style="margin-right: 10px;">Yes</button>
                <button class="btn btn-secondary" @click="denyFood(claimableFoods[0])">No</button>
            </div>
        </div>
        <div v-else-if="!isLoading">
            <h2>No more food to claim</h2>
        </div>
        <div v-if="showDialog" class="dialog d-flex flex-column align-items-center">
            <p>Do you want to share with others?</p>
            <div class="btn-group" role="group">
                <button class="btn btn-success" @click="updateSharing('Yes')">Yes</button>
                <button class="btn btn-danger" @click="updateSharing('No')">No</button>
                <button class="btn btn-warning" @click="updateSharing('Ask me')">Ask me</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.food-item {
    text-align: center;
}
.food-image {
    margin-bottom: 20px;
}
</style>

<script>
import axios from 'axios';

export default {
    name: 'ClaimFood',
    data() {
        return {
            isLoading: true,
            foods: [],
            loggedInUser: localStorage.getItem('loggedInUser'),
            showDialog: false,
            selectedFood: null
        }
    },
    computed: {
        serverUrl() {
            return process.env.VUE_APP_SERVER_URL;
        },
        claimableFoods() {
            return this.foods.filter(food => food.owner === 'Unknown');
        }
    },
    methods: {
        openDialog(food) {
            this.selectedFood = food;
            this.showDialog = true;
        },
        denyFood(food) {
            const notOwnedBy = food.not_owned_by ? [...food.not_owned_by, this.loggedInUser] : [this.loggedInUser];
            axios.put(`${this.serverUrl}/foodsClaim/${food.id}`, { not_owned_by: notOwnedBy, owner: "Unknown", sharing: "Unknown" })
                .then(() => {
                    this.foods = this.foods.filter(item => item.id !== food.id);
                });
        },
        updateSharing(choice) {
            axios.put(`${this.serverUrl}/foodsClaim/${this.selectedFood.id}`, { sharing: choice, owner: this.loggedInUser })
                .then(() => {
                    this.foods = this.foods.filter(food => food.id !== this.selectedFood.id);
                    this.showDialog = false;
                });
        }
    },
    created() {
        axios.get(`${this.serverUrl}/claimableFoods?user=${this.loggedInUser}`)
            .then(response => {
                this.foods = response.data;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
</script>