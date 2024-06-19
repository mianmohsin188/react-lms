import axios from "axios";
import {useDispatch} from "react-redux";
import {logout} from "../src/store/auth/authSlice.jsx";
import Swal from "sweetalert2";


const API=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})
const APIEndpoint = {
    products:{
        getAllProducts: (search,skip,limit,category) => {
            let url = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL
            if(search){
                url += `/search?q=${search}`
            }
            if(!category && skip && search!==''){
                url += `&limit=${limit}`
                return API.get(url)
            }

            if(skip){
                url += `?skip=${skip}`
            }
            if(limit){
                url += `&limit=${limit}`
            }
            if (!search && category){
                url = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL+`/category/${category}?limit=${limit}`
            }
            if (search && category){
                url = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL+`/search?q=${search}&category=${category}`
            }
           return  API.get(url)
        },
        getAllProductsCategories: () => {
            let url = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL+import.meta.env.VITE_APP_PRODUCTS_CATEGORIES_LIST_URL
           return  API.get(url)
        },

    }


}

const setupInterceptors = (store) => {

    API.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    API.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                const dispatch = useDispatch()
                dispatch(logout);
                Swal.fire("Session Expired!", "Please login again to continue", "warning");
                window.location.href = '/login'; // Redirect to login page
            }
            return Promise.reject(error);
        }
    );
};



export { API, APIEndpoint, setupInterceptors };