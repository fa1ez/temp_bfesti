import axios from "axios";

import auth, { API_URL } from "src/configs/auth";

axios.defaults.withCredentials = true;

const GetTokenAsync = () => {
  const storedToken: any = window.localStorage.getItem(
    auth.storageTokenKeyName
  );
  console.log(storedToken);
  return storedToken ? JSON.parse(storedToken).token : null;
};

export async function GetArtists() {
  const token = GetTokenAsync();
  const config = {
    method: "get",
    url: API_URL + "/artists/",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function AddArtists(data: any) {
  const config = {
    method: "post",
    url: API_URL + "/artists/add",
    data: data,
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}
export async function updateBlog(data: any, id: any) {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      formData.append(key, value);
    }
  }
  formData.append("badges", "modesty");
  formData.append("badges", "honesty");
  formData.append("badges", "Truth");
  formData.append("blog_id", id);

  const config = {
    method: "post",
    url: API_URL + "/blogs/update-blog",
    data: formData,
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function getBlogByID(id: any) {
  const config = {
    method: "get",
    url: API_URL + `/blogs/content-of-blog-by-id?blog_id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}
export async function imageToBlob(imageUrl: any) {
  try {
    const response = await fetch(API_URL + `/blogs/image?imageUrl=${imageUrl}`);
    if (response.ok) {
      // Use the response as needed (e.g., save it as a File)
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      return file;
    } else {
      console.error("Error fetching image:", response.statusText);

      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);

    return null;
  }
}

export async function deleteBlog(id: number) {
  const config = {
    method: "get",
    url: API_URL + `/blogs/delete-blog?blog_id=${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

//** users */
export async function GetEmailSubscribers() {
  const config = {
    method: "get",
    url: API_URL + "/users/email-subscribers",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}
export async function GetBlogSubscribers() {
  const config = {
    method: "get",
    url: API_URL + "/users/blog-subscribers",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function AddNewEmailSubscriber(data: any) {
  const config = {
    method: "post",
    url: API_URL + "/users/add-email-subscribers",
    data: data,
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}
