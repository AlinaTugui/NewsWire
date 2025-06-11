//import UserInterface from "../interfaces/UserInterface";
import axios from "axios";
import { authConfig } from "./authConfig";


const usersURL = "http://localhost:8080/users";


const getUserById =  async (id) => {
    return (await axios.get(`${usersURL}/${id}`,authConfig(localStorage.getItem("token")||""))).data;
}

const getUserByEmail = async (email) => {
    console.log("In get user by email with token ",localStorage.getItem("token")||"")
    return (await axios.get(`${usersURL}/email?email=${email}`,authConfig(localStorage.getItem("token")||""))).data;
}

const updateUser = async ( userModified) => {
    return (await axios.put(`${usersURL}`, userModified,authConfig(localStorage.getItem("token")||""))).data;
}

const uploadPicture = async(userId,data, headers)=>{
    return (await axios.post(`${usersURL}/upload/${userId}`,data,headers)).data;
}


export {getUserById, getUserByEmail, updateUser,uploadPicture}