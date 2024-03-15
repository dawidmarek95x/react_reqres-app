import { FC } from "react";

type ProductsTableHeadProps = {
	headers: string[];
};

export const ProductsTableHead: FC<ProductsTableHeadProps> = ({ headers }) => {
	return (
		<thead className="text-sm">
			<tr className="bg-slate-800 text-white">
				{headers.map((header) => (
					<th key={header}>{header}</th>
				))}
			</tr>
		</thead>
	);
};
