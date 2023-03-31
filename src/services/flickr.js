import { FLICKR_URL, FLICKR_API_KEY } from "./../common/constants";
const SERVICE_NOT_AVAILABLE_MESSAGE =
  "This service is not available, please try again in a few minutes";

function flickrFecth({ method, extraQueryParams }) {
  let queryParams = {
    method,
    api_key: FLICKR_API_KEY,
    format: "json",
    nojsoncallback: "1",
    ...extraQueryParams,
  };
  return new Promise((resolve) => {
    fetch(`${FLICKR_URL}?${new URLSearchParams(queryParams)}`)
      .then(
        (res) => {
          if (res.status >= 500)
            return { stat: "bad", message: SERVICE_NOT_AVAILABLE_MESSAGE };
          else return res.json();
        },
        (error) => {
          return { stat: "bad", message: SERVICE_NOT_AVAILABLE_MESSAGE };
        }
      )
      .then((result) => {
        if (result.stat === "ok") {
          resolve({ result });
        } else {
          resolve({
            error: { message: result.message || SERVICE_NOT_AVAILABLE_MESSAGE },
          });
        }
      });
  });
}

function getPhoto(photo_info) {
  return new Promise((resolve) => {
    flickrFecth({
      method: "flickr.photos.getInfo",
      extraQueryParams: {
        photo_id: photo_info.id,
        secret: photo_info.secret,
      },
    }).then((res) => {
      if ("error" in res) resolve(res);
      else {
        let photo = res.result.photo;
        resolve({
          id: photo_info.id,
          createdBy: photo.owner.username,
          takenOn: photo.dates.taken.replace(" ", "T") + ".000Z",
          tags: photo.tags.tag.map((tag) => tag.raw),
          photoUrl: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
        });
      }
    });
  });
}

export function getPhotos({ page, pageSize }) {
  return new Promise((resolve) => {
    flickrFecth({
      method: "flickr.interestingness.getList",
      extraQueryParams: { page: page, per_page: pageSize },
    }).then((res) => {
      if ("error" in res) resolve(res);
      else {
        Promise.all(res.result.photos.photo.map(getPhoto)).then((data) => {
          resolve({ result: { pages: res.result.photos.pages, data } });
        });
      }
    });
  });
}
export function searchPhotos({ tag, page, pageSize }) {
  return new Promise((resolve) => {
    flickrFecth({
      method: "flickr.photos.search",
      extraQueryParams: { page: page, per_page: pageSize, tags: tag },
    }).then((res) => {
      if ("error" in res) resolve(res);
      else {
        Promise.all(res.result.photos.photo.map(getPhoto)).then((data) => {
          resolve({ result: { pages: res.result.photos.pages, data } });
        });
      }
    });
  });
}
