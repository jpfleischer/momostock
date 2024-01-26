<template>
    <div>
        <input v-model="newFood" placeholder="Enter food item" />
        <button @click="addFood">Add</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newFood: ''
        }
    },
    methods: {
        addFood() {
            this.$emit('add-food', this.newFood);
            this.newFood = '';
        }
    }
}
</script>