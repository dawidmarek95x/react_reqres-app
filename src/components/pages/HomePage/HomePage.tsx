import { useSearchParams } from "react-router-dom";
import {
	Product,
	useGetProductsQuery,
} from "../../../redux/services/productsService";
import { ProductsTable } from "../../organisms/ProductsTable/ProductsTable";
import { Pagination } from "../../atoms/Pagination/Pagination";
import { useEffect, useState } from "react";

type InitialSearchParams = {
	page: number;
	per_page: number;
};

const INITIAL_SEARCH_PARAMS: InitialSearchParams = {
	page: 1,
	per_page: 5,
};

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currPage =
		Number(searchParams.get("page")) || INITIAL_SEARCH_PARAMS.page;
	const perPage =
		Number(searchParams.get("per_page")) || INITIAL_SEARCH_PARAMS.per_page;
	const searchedId = Number(searchParams.get("productId")) || undefined;

	const [products, setProducts] = useState<Product[]>([]);

	const { data: productsData, error } = useGetProductsQuery({
		page: currPage,
		per_page: perPage,
		id: searchedId,
	});

	useEffect(() => {
		if (Array.isArray(productsData?.data)) {
			setProducts(productsData?.data);
		} else if (productsData?.data?.id) {
			setProducts([productsData?.data]);
		}
	}, [productsData?.data]);

	console.log(products);

	console.log(error);
	console.log(productsData);

	const handlePageChange = (page: number) => {
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
	};

	return (
		<main className="px-5">
			<ProductsTable data={products} />
			{products.length > 0 && (
				<Pagination
					totalPages={productsData?.total_pages || 0}
					currentPage={currPage}
					onPageChange={handlePageChange}
					maxVisiblePages={2}
				/>
			)}
		</main>
	);
};
