import axios from "axios";

export default function axiosWithAuth() {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://reqres.in/api",
        headers: {
            Authorization: token,
        },
    });
}