<template>
    <div>
        <h1>Add a new food item</h1>
        <form @submit.prevent="addFood">
            <div class="mb-3">
                <label for="title">Title:</label>
                <input id="title" v-model="newFood.title" required>
            </div>

            <div class="mb-3">
                <label for="location">Location:</label>
                <select id="location" v-model="newFood.location" required>
                    <option>Fridge Door Top Rack</option>
                    <option>Fridge Door Middle Rack</option>
                    <option>Fridge Door Bottom Rack</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="owner">Owner:</label>
                <select id="owner" v-model="newFood.owner" required>
                    <option>J.P.</option>
                    <option>Joe</option>
                    <option>Jonah</option>
                    <option>Joshua</option>
                    <option>Unknown</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="expiration_date">Expiration Date:</label>
                <input id="expiration_date" type="date" v-model="newFood.expiration_date" required>
            </div>

            <div class="mb-3">
                <label for="sharing">Sharing:</label>
                <select id="sharing" v-model="newFood.sharing" required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Ask me">Ask me</option>
                    <option value="Unknown">Unknown</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="image">Image:</label>
                <input id="image" type="file" ref="fileInput" @change="onFileChange" accept=".jpg, .jpeg, .png, .gif">
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isUploading">
                <span v-if="isUploading">
                    <font-awesome-icon icon="spinner" pulse /> Loading...
                </span>
                <span v-else>
                    Add Food
                </span>
            </button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            newFood: {
                title: '',
                location: '',
                owner: 'Unknown',
                expiration_date: '',
                sharing: 'Unknown', // New property for sharing
                image: null
            },
            fileInput: null, // New property
            isUploading: false,
        }
    },
    methods: {
        onFileChange(e) {
            this.newFood.image = e.target.files[0];
        },
        async addFood() {
            this.isUploading = true;
            let formData = new FormData();
            Object.keys(this.newFood).forEach(key => {
                formData.append(key, this.newFood[key]);
            });

            await axios.post(`${process.env.VUE_APP_SERVER_URL}/foodAdd`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.alert('mmm momo appreciates your delectable food');

            // Reset the form
            this.newFood = {
                title: '',
                location: '',
                owner: 'Unknown',
                expiration_date: '',
                sharing: 'Unknown',
                image: null
            };
            this.$refs.fileInput.value = ''; // Clear the file input field
            this.isUploading = false;
        },
    }
}
</script>