import axios from "axios";

const login = async (email, password) => {
  try {
    const response = await axios.post(`${url}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
const signUp=async (signUpInfo)=>{
  try {
  return (await axios.post(`${url}/signup`,signUpInfo)).data;
} catch (error) {
  throw new Error(error.response.data.message);
}
}
export default {login,signUp};
