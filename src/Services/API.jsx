function FetchImages(img, page) {
  const API_KEY = "23793880-43251762e8c5681d941546cf6";

  return fetch(
    `https://pixabay.com/api/?q=${img}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No pictures "${img}" were found`));
  });
}

// const imagesAPI = { FetchImages };

export default FetchImages;
