import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth/authSlice.jsx';
import App from './App.jsx'
import Swal from "sweetalert2";



import "./assets/vendor/fonts/boxicons.css"
import "./assets/css/demo.css"
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
import "./assets/vendor/css/pages/page-auth.css"
import "./assets/vendor/libs/apex-charts/apex-charts.css"
import "./assets/vendor/js/helpers.js"
import "./assets/js/config.js"

/*import "./assets/vendor/libs/jquery/jquery.js"
import "./assets/vendor/libs/popper/popper.js"
import "./assets/vendor/js/bootstrap.js"*/
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"

import "./assets/vendor/libs/apex-charts/apexcharts.js"
import "./assets/js/main.js"
 import "./assets/js/dashboards-analytics.js"
import 'react-tooltip/dist/react-tooltip.css'
import '../service/helper.jsx'


import './index.css'
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});



ReactDOM.createRoot(document.getElementById('root')).render(

      <Provider store={store}>
          <App />
      </Provider>
  ,
)
