<template>
    <div id="background">
        <div class="center-text">
            <p>{{ randomMessage }}</p>
        </div>
        <div class="container">
            <table id="pantryTable" class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Food Name</th>
                        <th>Location</th>
                        <th>Owner</th>
                        <th>Expiration Date</th>
                        <th>Sharing</th>
                        <th>Image</th> <!-- New column for the image -->
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="food in foods" :key="food.id">
                        <td>{{ food.title }}</td>
                        <td>{{ food.location }}</td>
                        <td>{{ food.owner }}</td>
                        <td :class="{ 'text-danger': isPastDate(food.expiration_date) }">{{ formatDate(food.expiration_date) }}</td>
                        <td :class="getSharingClass(food.sharing)">{{ food.sharing }}</td>
                        <td>
                            <img :src="`${serverUrl}/uploads/${food.image_location}`" alt="Food image" height="100"
                                @click="toggleImageSize($event)">
                        </td>
                        <td>
                            <div class="icon-container">
                                <font-awesome-icon class="cursor-pointer trash-icon fa-lg" icon="trash" @click="deleteFood(food.id, food.title)"></font-awesome-icon>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt';
import moment from 'moment';

export default {
    data() {
        return {
            foods: []
        }
    },
    computed: {
        serverUrl() {
            return process.env.VUE_APP_SERVER_URL;
        },
        randomMessage() {
            const messages = ["dear god,,,,.. i LOV eatin.g...", "meow. meow. .   meao.", "-really snazzy jazz solo-", "prepare for something amazing!"];
            return messages[Math.floor(Math.random() * messages.length)];
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_SERVER_URL}/foods`);
        this.foods = response.data;
        console.log(this.foods);


        this.$nextTick(() => {
            $('#pantryTable').DataTable({
                columnDefs: [
                    {
                        targets: 3, // The column index (counting from 0)
                        render: function (data, type) {
                            if (type === 'sort' || type === 'type') {
                                return moment(data).unix();
                            }
                            return data;
                        }
                    }
                ],
                responsive: true,
                autoWidth: false,
                paging: true,
                searching: true,
                info: true,
                dom: 'Bfrtip',
                pageLength: 30,  // Add this line
                buttons: [
                    {
                        extend: 'colvis',
                        className: 'btn btn-warning',
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-success',
                        split: ['pdf', 'excel', 'csv']
                    }
                ],
                createdRow: (row, data) => {
                    const sharingCell = $(row).find('td').eq(4); // replace 5 with the index of the 'sharing' column
                    switch (data[4]) { // replace 5 with the index of the 'sharing' field in the data array
                        case 'Yes':
                            sharingCell.css('background-color', 'green');
                            break;
                        case 'No':
                            sharingCell.css('background-color', 'red');
                            break;
                        case 'Ask me':
                            sharingCell.css('background-color', 'yellow');
                            break;
                    }
                }
            });
        });
    },
    methods: {
        isPastDate(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return new Date(date) < today;
        },
        getSharingClass(sharing) {
            switch (sharing) {
                case 'Yes':
                    return 'green';
                case 'No':
                    return 'red';
                case 'Ask me':
                    return 'yellow';
                default:
                    return '';
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        },
        toggleImageSize(event) {
            event.target.classList.toggle('full-size');
        },
        async deleteFood(foodId, foodName) {
            if (window.confirm(`Are you sure you want to delete ${foodName}?`)) {
                try {
                    await axios.delete(`${this.serverUrl}/foods/${foodId}`);
                    this.foods = this.foods.filter(food => food.id !== foodId);

                    // Destroy the existing DataTable
                    $('#pantryTable').DataTable().destroy();

                    // Wait for Vue to finish updating the DOM
                    this.$nextTick(() => {
                        // Reinitialize the DataTable
                        $('#pantryTable').DataTable();
                    });
                } catch (error) {
                    console.error('Failed to delete food:', error);
                }
            }
        },
    },
}
</script>

<style>
.dataTables_wrapper {
    margin-top: 30px;
}

#pantryTable_wrapper .dataTables_paginate .paginate_button {
    background-color: #8B735B !important;
    border-color: #8B735B !important;
}

#pantryTable_wrapper .dataTables_paginate .paginate_button.current {
    background-color: #D1BFA3 !important;
    border-color: #D1BFA3 !important;
}

.text-danger {
  color: red;
}

.dataTables_wrapper .dt-button {
    background-color: #A47B64;
    /* Change to your desired color */
    border: none;
    border-radius: 4px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.pagination>li>a,
.pagination>li>span {
    background-color: #5a4734
}

.pagination>li.active>a,
.pagination>li.active>span {
    background-color: #8B735B
}

/* Change the style of the DataTables buttons on hover */
.dataTables_wrapper .dt-button:hover {
    background-color: #D1BFA3;
    /* Change to your desired color */
    color: black;
}

/* Style the DataTables dropdown menu */
.dataTables_wrapper .dt-button.buttons-collection {
    position: relative;
    z-index: 1;
}

.full-size {
    width: 100%;
    height: auto;
}

img:hover {
    cursor: pointer;
}

.center-text {
    text-align: center;
    margin-top: 20px;
}

.cursor-pointer {
    cursor: pointer;
}

.trash-icon {
    color: red;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>