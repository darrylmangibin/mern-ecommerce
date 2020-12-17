import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import FormContainer from "../../components/FormContainer";
import CheckoutSteps from '../../components/CheckoutSteps'

import { saveShippingAddress } from "../../actions/cartActions";

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address || "");
	const [city, setCity] = useState(shippingAddress.city || "");
	const [postalcode, setPostalcode] = useState(
		shippingAddress.postalcode || ""
	);
	const [country, setCountry] = useState(shippingAddress.country || "");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalcode, country }));
		history.push("/payment");
	};

	return (
		<FormContainer>
      <CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalcode">
					<Form.Label>Postalcode</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Postalcode"
						value={postalcode}
						required
						onChange={(e) => setPostalcode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
