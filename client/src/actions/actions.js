import axios from "axios";
import products from "../Products.json";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const SEARCH_BAR = "SEARCH_BAR";
// export const GET_NAME_SHOE = 'GET_NAME_SHOE'
export const POST_PRODUCT = "POST_PRDUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_REVIEWS = "GET_REVIEWS";
export const GET_REVIEWS_BY_ID = "GET_REVIEWS_BY_ID";
export const POST_REVIEW = "POST_REVIEW";
export const GET_COLORS = "GET_COLORS";
export const FILTER_BY_BEST = "FILTER_BY_BEST";
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
export const FILTER_BY_COLOR = "FILTER_BY_COLOR";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const FAVORITES = "FAVORITES";
export const SHOPCAR = "SHOPCAR";
export const GET_STOCK_BY_PRODUCTID = "GET_STOCK_BY_PRODUCTID";
export const GET_SIZES = "GET_SIZES";
export const GET_SIZES_BY_ID = "GET_SIZES_BY_ID";

// export const getProducts = () => {
//     return {
//         type: 'GET_PRODUCTS',
//         payload: products
//     }
// }

export function getProducts() {
  return async function (dispatch) {
    var json = await axios.get("/products");
    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}

export const filterByBestFor = (payload) => {
  return {
    type: "FILTER_BY_BEST",
    payload,
  };
};
export const favorites = () => {
  var array = [];
  if (localStorage.getItem("favoritos") != null) {
    array = localStorage.getItem("favoritos");
  }
  return {
    type: "FAVORITES",
    payload: array,
  };
};
export const ShopCar = () => {
  var array = [];
  if (localStorage.getItem("favoritos") != null) {
    array = localStorage.getItem("favoritos");
  }
  return {
    type: "SHOPCAR",
    payload: array,
  };
};

export const filterByCategories = (payload) => {
  // console.log(payload)
  return {
    type: "FILTER_BY_CATEGORIES",
    payload,
  };
};

export const filterByColor = (payload) => {
  return {
    type: "FILTER_BY_COLOR",
    payload,
  };
};

export const filterByGender = (payload) => {
  return {
    type: "FILTER_BY_GENDER",
    payload,
  };
};

export function searchBar(keyword) {
  return async function (dispatch) {
    try {
      await axios.get(`/products?search=${keyword}`).then((yeison) => {
        //  console.log(yeison.data)
        dispatch({
          type: "SEARCH_BAR",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      await axios.get(`/categories`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_CATEGORIES",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getColors() {
  return async function (dispatch) {
    try {
      await axios.get(`/colors`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_COLORS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReviews() {
  return async function (dispatch) {
    try {
      await axios.get(`/reviews`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_REVIEWS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReviewsById(payload) {
  return async function (dispatch) {
    try {
      await axios.get(`/reviews/product/${payload}`)
        .then((yeison) => {
        console.log(yeison.data)
        dispatch({
          type: "GET_REVIEWS_BY_ID",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setReviews(payload) {
  return async function (dispatch) {
    try {
      await axios.post(`/reviews`, payload)
        .then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "POST_REVIEWS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    try {
      var yeison = await axios.post("/product", payload);
      return yeison;
    } catch (error) {
      console.log(error);
      console.log(yeison);
    }
  };
}

export function editProduct(payload) {
  return async function (dispatch) {
    try {
      var yeison = await axios.put("/product", payload);
      return yeison;
    } catch (error) {
      console.log(error);
      console.log(yeison);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(json.data);
    }
  };
}

export const quantityCar = (id, quantity) => {
  return {
    type: "QUANTITY_CAR",
  };
};

// actions for products stock
export function getStockByProductId(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/stock/product/${id}`).then((stock) => {
        dispatch({
          type: "GET_STOCK_BY_PRODUCTID",
          payload: stock.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSizes() {
  return async function (dispatch) {
    try {
      await axios.get(`/sizes`).then((sizes) => {
        dispatch({ type: "GET_SIZES", payload: sizes.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSizesById(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/sizes/${id}`).then((size) => {
        dispatch({
          type: "GET_SIZES_BY_ID",
          payload: size.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
