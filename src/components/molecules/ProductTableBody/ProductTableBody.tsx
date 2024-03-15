import { useState } from "react";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";
import { FetchedProducts } from "../../pages/HomePage/HomePage";

type ProductsTableBodyProps = {
	products: FetchedProducts;
};

export const ProductsTableBody = ({ products }: ProductsTableBodyProps) => {
	const [productIndexModalShown, setProductIndexModalShown] = useState<
		number | null
	>(null);

	const toggleModal = (index: number) => {
		setProductIndexModalShown(productIndexModalShown === index ? null : index);
	};

	let results = (
		<tr className="bg-gray-200">
			<td colSpan={3}>Loading data...</td>
		</tr>
	);

	if (products?.errorStatus) {
		switch (products?.errorStatus) {
			case 200:
				results =
					products?.data?.length ?? 0 > 0 ? (
						<>
							{products?.data?.map((product) => (
								<tr
									key={product.id}
									className="hover:opacity-90"
									style={{ backgroundColor: `${product.color}` }}
									onClick={() => toggleModal(product.id)}
								>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.year}</td>
								</tr>
							))}
							{productIndexModalShown && (
								<ProductDetailsModal
									data={products?.data?.find(
										(p) => p.id === productIndexModalShown,
									)}
									onClose={() => toggleModal(productIndexModalShown)}
								/>
							)}
						</>
					) : (
						<tr className="bg-gray-200">
							<td colSpan={3}>No results found.</td>
						</tr>
					);
				break;

			case 400:
				results = (
					<tr className="bg-gray-200">
						<td colSpan={3}>Error while retrieving data.</td>
					</tr>
				);
				break;

			case 404:
				results = (
					<tr className="bg-gray-200">
						<td colSpan={3}>No results found.</td>
					</tr>
				);
				break;

			case 500:
				results = (
					<tr className="bg-gray-200">
						<td colSpan={3}>
							Error connecting to the server. Please try again later.
						</td>
					</tr>
				);
				break;

			default:
				results = (
					<tr className="bg-gray-200">
						<td colSpan={3}>
							Unexpected server error. Please try again later.
						</td>
					</tr>
				);
				break;
		}
	}

	return (
		<>
			<tbody className="text-sm">{results}</tbody>
		</>
	);
};
