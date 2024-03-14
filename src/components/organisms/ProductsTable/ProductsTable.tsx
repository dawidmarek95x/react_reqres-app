import { Product } from "../../../redux/services/productsService";
import { ProductsTableBody } from "../../molecules/ProductsTableBody/ProductsTableBody";
import { ProductsTableHead } from "../../molecules/ProductsTableHead/ProductsTableHead";

type ProductsTableProps = {
	data?: Product[];
};

export const ProductsTable = ({ data }: ProductsTableProps) => {
	const headers = ["ID", "Name", "Year"];

	return (
		<table className="container table mx-auto max-w-3xl border-gray-500 text-center shadow-2xl">
			<ProductsTableHead headers={headers} />
			<ProductsTableBody products={data} />
		</table>
	);
};
