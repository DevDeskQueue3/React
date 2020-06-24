import axios from "axios";

export default function axiosWithAuth() {
    const token = localStorage.getItem("devdesk-auth");

    return axios.create({
        baseURL: "https://devdeskqueue3-pt.herokuapp.com/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}