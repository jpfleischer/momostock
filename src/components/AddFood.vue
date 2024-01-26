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
                <input id="image" type="file" @change="onFileChange" accept=".jpg, .jpeg, .png, .gif">
            </div>

            <button type="submit" class="btn btn-primary">Add Food</button>
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
            }
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.newFood.image = files[0];
        },
        async addFood() {
            let formData = new FormData();
            Object.keys(this.newFood).forEach(key => {
                if (this.newFood[key] != null) {
                    formData.append(key, this.newFood[key]);
                }
            });

            await axios.post(`${process.env.VUE_APP_SERVER_URL}/foodAdd`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // if (this.newFood.image) {
            // await axios.post(`http://localhost:3000/foodAdd/${response.data.id}/image`, this.newFood.image, {
            // headers: {
            // 'Content-Type': 'multipart/form-data'
            // }
            // });
            // }
            this.newFood = {
                title: '',
                location: '',
                owner: 'Unknown',
                expiration_date: '',
                sharing: 'Unknown',
                image: null
            };
        }
    }
}
</script>