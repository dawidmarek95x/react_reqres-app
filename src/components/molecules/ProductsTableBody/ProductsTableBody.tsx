import { Product } from "../../../redux/services/productsService";

type ProductsTableBodyProps = {
	products?: Product[];
};

export const ProductsTableBody = ({ products }: ProductsTableBodyProps) => {
	return (
		<tbody className="text-sm">
			{products?.map((product) => (
				<tr
					key={product.id}
					className="hover:opacity-90"
					style={{ backgroundColor: `${product.color}` }}
				>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.year}</td>
				</tr>
			))}
		</tbody>
	);
};
