import { TableHTMLAttributes } from "react";
import { Product } from "../../../redux/services/productsService";
import { ProductsTableHead } from "../../molecules/ProductsTableHead/ProductsTableHead";
import clsx from "clsx";
import { ProductsTableBody } from "../../molecules/ProductTableBody/ProductTableBody";

type ProductsTableProps = TableHTMLAttributes<HTMLTableElement> & {
	data?: Product[];
};

export const ProductsTable = ({ data, ...props }: ProductsTableProps) => {
	const headers = ["ID", "Name", "Year"];

	return (
		<table
			{...props}
			className={clsx(
				"container table mx-auto max-w-3xl border-gray-500 text-center shadow-md shadow-gray-400",
				props.className,
			)}
		>
			<ProductsTableHead headers={headers} />
			<ProductsTableBody products={data} />
		</table>
	);
};
