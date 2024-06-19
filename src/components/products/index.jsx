import React, {useRef} from 'react';
import { APIEndpoint } from "../../../service/apiService.jsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Swal from "sweetalert2";
import helper from "../../../service/helper.jsx";
import noRecord from "../../assets/img/illustrations/no-data.png";

function Index() {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [totalProducts, setTotalProducts] = React.useState(0);
    const [skip, setSkip] = React.useState(10);
    const [limit, setLimit] = React.useState(10);
    const [currentLimit, setcurrentLimit] = React.useState(10);

    const [productCategoriesList, setProductCategoriesList] = React.useState([]);

    React.useEffect(() => {

        fetchProducts();

    }, [category, search]);

    React.useEffect(() => {
        fetchProductCategoriesList();
    }, []);

    const fetchProducts = () => {
        setProducts([]);
        setLoading(true);
        APIEndpoint.products.getAllProducts(search, skip, limit, category).then((response) => {
            setLoading(false);
            setProducts(response?.data?.products);
            setTotalProducts(response?.data?.total);
            setcurrentLimit(response?.data?.limit<10?response?.data?.limit:10);



        }).catch((error) => {
            setLoading(false);
            Swal.fire(
                'Oops!',
                error?.response?.data?.message ?? 'Something went wrong',
                'error'
            );
        });
    };

    const fetchProductCategoriesList = () => {
        setProductCategoriesList([]);
        setLoading(true);
        APIEndpoint.products.getAllProductsCategories().then((response) => {
            setLoading(false);
            setProductCategoriesList(response?.data);
        }).catch((error) => {
            setLoading(false);
            Swal.fire(
                'Oops!',
                error?.response?.data?.message ?? 'Something went wrong',
                'error'
            );
        });
    };

    const addProduct = () => {
        window.location.href = '/products/add';
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <h4 className="fw-bold py-3 mb-1">
                Products
                <i onClick={fetchProducts} className="btn bg-primary m-1 text-white bx bx-sm bx-refresh p-1"></i>
                <button onClick={addProduct} className="btn bg-primary m-1 text-white float-end">Add Product</button>
            </h4>

            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-6">
                                <select onChange={handleCategoryChange} className="form-select" aria-label="Default select example">
                                    <option value="">- Select Category -</option>
                                    {productCategoriesList?.map((category) => {
                                        return (
                                            <option value={category} key={category}>{category.toUpperCase()}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 p-2 text-center">
                        Showing Results 1 - {currentLimit} of {totalProducts}
                    </div>
                    <div className="col-4">
                        <input onInput={handleSearchChange} type="search" className="form-control" placeholder="Search..." />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>Category & Brand</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        {loading ?
                            <tbody>
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', height: '600px' }}>
                                    <div className="spinner-border my-auto mx-auto text-center text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                            : products.length > 0 ?
                                <tbody className="table-border-bottom-0">
                                {products?.map((product) =>
                                    <tr key={product?.id}>
                                        <td>
                                            <img
                                                src={product?.images?.[0]}
                                                alt="Product"
                                                className="rounded"
                                                style={{ width: "45px" }}
                                            />
                                        </td>
                                        <td>
                                            <i className="fab fa-angular fa-lg text-danger"></i><span>  <strong>{product?.title}</strong></span><br />
                                            <a data-tooltip-id="product-description-tooltip" data-tooltip-content={product?.description}>
                                                <a href="javascript:void(0)" className="text-muted"> {helper.truncateString(product?.description, 29)}</a>
                                            </a>
                                        </td>
                                        <td>
                                            Category <span className="badge bg-primary p-1"> {product?.category ?? 'N/A'}</span> <br />
                                            Brand <span className={product.brand ? 'bg-info badge m-1 p-1' : ' badge m-1 p-1 bg-danger'}> {product?.brand ?? 'N/A'}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-dark text-white me-1">{product?.price}</span>
                                        </td>
                                        <td>{helper.renderStars(product?.rating)}</td>
                                        <td>{product?.stock}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn p-0"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    <li><a className="dropdown-item" href="javascript:void(0);">Action</a></li>
                                                    <li><a className="dropdown-item" href="javascript:void(0);">Another action</a></li>
                                                    <li><a className="dropdown-item" href="javascript:void(0);">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                :
                                <tbody>
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                        <img src={noRecord} className="img-fluid" alt="No data found" style={{ width: '500px', height: '400px' }} />
                                        <h4>No Product found</h4>
                                    </td>
                                </tr>
                                </tbody>
                        }
                    </table>
                </div>
                <ReactTooltip
                    id="product-description-tooltip"
                    place="bottom"
                    effect="solid"
                    className="tooltip-custom"
                    style={{ maxWidth: "350px" }}
                    aria-haspopup="true"
                    role="tooltip"
                />
                <ReactTooltip
                    id="product-rating-tooltip"
                    place="bottom"
                    effect="solid"
                    className="tooltip-custom"
                    style={{ maxWidth: "140px" }}
                    aria-haspopup="true"
                    role="tooltip"
                />
            </div>
        </>
    );
}

export { Index as Products };
