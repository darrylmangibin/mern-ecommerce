import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Product from "../../components/Product";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import ProductCarousel from "../../components/ProductCarousel";
import Meta from "../../components/Meta";

import { listProducts } from "../../actions/productActions";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<Fragment>
			<Meta
				title="Welcome to Bao Shop | Home"
				keyword="pets accessories, pet foods, pet vitamins and medicines"
				description="We sell the best products for cheap prices"
			/>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Fragment>
					<Row>
						{products.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</Fragment>
			)}
		</Fragment>
	);
};

export default HomeScreen;
