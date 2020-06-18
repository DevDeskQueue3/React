import axios from "axios";

export default function axiosWithAuth() {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://devdeskqueue3-pt.herokuapp.com/api/auth",
        headers: {
            Authorization: token,
        },
    });
}