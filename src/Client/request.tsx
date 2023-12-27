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
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + "/artists/add",
    data: data,
    headers: {
      Authorization: "Bearer " + token,
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
export async function updateArtist(data: any) {
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + "/artists/update",
    data: data,
    headers: {
      Authorization: "Bearer " + token,
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

export async function deleteArtist(id: number) {
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + `/artists/delete`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      artist_Id: id,
      is_deleted: true,
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

//** festivals */
export async function GetFestivals() {
  const token = GetTokenAsync();
  const config = {
    method: "get",
    url: API_URL + "/festivals/",
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
export async function AddFestival(data: any) {
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + "/festivals/add",
    data: data,
    headers: {
      Authorization: "Bearer " + token,
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
export async function GetFestivalById(id: number) {
  const token = GetTokenAsync();
  const config = {
    method: "get",
    url: API_URL + "/festivals/festival-by-id?festival_Id=" + id,
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

export async function deleteFestival(id: number) {
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + `/festivals/delete`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      festival_Id: id,
      is_deleted: true,
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

export async function updateFestival(data: any) {
  const token = GetTokenAsync();
  const config = {
    method: "post",
    url: API_URL + "/festivals/update",
    data: data,
    headers: {
      Authorization: "Bearer " + token,
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
