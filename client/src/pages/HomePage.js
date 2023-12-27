
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Prices } from '../components/Prices';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { AiOutlineReload } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../style/HomePage.css"

const HomePage = () => {
  const [cart,setCart] = useCart() 
  const navigate = useNavigate()
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={'All products-Best offers'}>
    {/* banner image */}
    <img
        src="/image/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="row mt-2">
        <div className="col-md-3">
          {/* Category filter */}
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)} >More Details</button>
                  <button className="btn btn-secondary ms-1" onClick={() => { setCart([...cart, p]); localStorage.setItem("cart", JSON.stringify([...cart, p])); toast.success("Item Added to cart"); }}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore bg-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : <> Loadmore <AiOutlineReload /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

