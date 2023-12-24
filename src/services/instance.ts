import axios from "axios";
import Cookies from "js-cookie"
export default () => {
    const baseURL = "http://localhost:3000";

    let headers = {};

    // for backend request, set token on request header if user has logged in and cookie is set
    const token = Cookies.get("token")
    if (token) {
        headers["Authorization"] = token;
    }
    const AxiosInstance = axios.create({
        baseURL,
        headers
    });

    AxiosInstance.interceptors.response.use(
        (response) =>
            new Promise((resolve, reject) => {
                resolve(response);
            }),
        (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            // global error handler
            switch (error.response.status) {
                case 401:
                    window.location.href = '/auth/login'
                    break;
                case 500:

                    break;

                default:
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });

            }

        }
    );

    return AxiosInstance;
};
