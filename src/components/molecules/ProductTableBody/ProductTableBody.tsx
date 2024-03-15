import { useState } from "react";
import { Product } from "../../../redux/services/productsService";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";

type ProductsTableBodyProps = {
	products?: Product[];
};

export const ProductsTableBody = ({ products }: ProductsTableBodyProps) => {
	const [productIndexModalShown, setProductIndexModalShown] = useState<
		number | null
	>(null);

	const toggleModal = (index: number) => {
		setProductIndexModalShown(productIndexModalShown === index ? null : index);
	};

	const results =
		products?.length ?? 0 > 0 ? (
			<>
				{products?.map((product) => (
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
						data={products?.find((p) => p.id === productIndexModalShown)}
						onClose={() => toggleModal(productIndexModalShown)}
					/>
				)}
			</>
		) : (
			<tr className="bg-gray-200">
				<td colSpan={3}>Nie znaleziono wyników</td>
			</tr>
		);

	return (
		<>
			<tbody className="text-sm">{results}</tbody>
		</>
	);
};
