import axios from 'axios';

export const authApi = {
  loginIn: async (email, password) => {
    const response = await axios.post('login', { email, password });
    return response;
  },
};
// import axios from 'axios';

// const authApi = async ({ username, password }) => {
//   try {
//     const response = await axios.post('http://localhost:3001/app/login', {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (err) {
//     throw new Error(err.response.data.error);
//   }
// };

// export default authApi;