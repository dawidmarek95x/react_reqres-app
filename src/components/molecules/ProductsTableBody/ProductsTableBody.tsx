import { Product } from "../../../redux/services/productsService";

type ProductsTableBodyProps = {
	products?: Product[];
};

export const ProductsTableBody = ({ products }: ProductsTableBodyProps) => {
	const results =
		products?.length ?? 0 > 0 ? (
			products?.map((product) => (
				<tr
					key={product.id}
					className="hover:opacity-90"
					style={{ backgroundColor: `${product.color}` }}
				>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.year}</td>
				</tr>
			))
		) : (
			<tr className="bg-gray-200">
				<td colSpan={3}>Nie znaleziono wyników</td>
			</tr>
		);

	return <tbody className="text-sm">{results}</tbody>;
};
