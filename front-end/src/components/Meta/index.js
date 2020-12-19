import { Helmet } from "react-helmet";

const Meta = ({ title, keyword, description }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keyword} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to Bao shop",
	description: "",
	keyword: "",
};

export default Meta;
