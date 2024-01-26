import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVueNext from 'bootstrap-vue-next'

// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

/* import specific icons */
import { faCat } from '@fortawesome/free-solid-svg-icons' // Change this line
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faCat) // And this line
library.add(faCoffee)
library.add(faSun, faMoon)
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-bs4';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-buttons/js/buttons.colVis.js';

createApp(App)
    .use(router)
    .use(BootstrapVueNext) // Change this line
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')