import axios from "axios";
import Cookies from "js-cookie"
export default () => {
    const baseURL = "http://localhost:3000";

    let headers = {};

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
                resolve(response.data);
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
                    // const navigate = useNavigate();
                    // navigate("/auth/login");
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
