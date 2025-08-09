import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadAvatar = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.put(apiUrl + url, updatedData, params);
  return res;
};
export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.post(apiUrl + url, updatedData, params);
  return res;
};
export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await axios.put(apiUrl + url, updatedData, params);
  return res;
};
export const deleteData = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await axios.delete(apiUrl + url, params);
  return res;
};
export const updatePassword = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await axios.put(apiUrl + url, updatedData, params);
  return res;
};
export const deleteImages = async (url) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.delete(apiUrl + url, params);
  return res;
};
