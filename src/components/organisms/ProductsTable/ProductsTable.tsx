import { TableHTMLAttributes } from "react";
import { ProductsTableHead } from "../../molecules/ProductsTableHead/ProductsTableHead";
import clsx from "clsx";
import { ProductsTableBody } from "../../molecules/ProductTableBody/ProductTableBody";
import { FetchedProducts } from "../../pages/HomePage/HomePage";

type ProductsTableProps = TableHTMLAttributes<HTMLTableElement> & {
	products: FetchedProducts;
};

export const ProductsTable = ({ products, ...props }: ProductsTableProps) => {
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
			<ProductsTableBody products={products} />
		</table>
	);
};
