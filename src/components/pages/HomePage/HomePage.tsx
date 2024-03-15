import { useSearchParams } from "react-router-dom";
import {
	Product,
	useGetProductsQuery,
} from "../../../redux/services/productsService";
import { ProductsTable } from "../../organisms/ProductsTable/ProductsTable";
import { Pagination } from "../../atoms/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Header } from "../../templates/Header/Header";

type InitialSearchParams = {
	page: number;
	per_page: number;
};

export type FetchedProducts = {
	data: Product[];
	errorStatus?: number;
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

	const [products, setProducts] = useState<FetchedProducts>({
		data: [],
		errorStatus: undefined,
	});

	const {
		data: productsData,
		error,
		isError,
		isFetching,
	} = useGetProductsQuery({
		page: currPage,
		per_page: perPage,
		id: searchedId,
	});

	useEffect(() => {
		if (isFetching) {
			setProducts({ data: [], errorStatus: undefined });
			return;
		}

		if (isError) {
			if ("status" in error && typeof error.status === "number") {
				setProducts({
					data: [],
					errorStatus: error?.status,
				});
			} else {
				setProducts({ data: [], errorStatus: 500 });
			}
			return;
		}

		if (Array.isArray(productsData?.data)) {
			setProducts({ data: productsData?.data, errorStatus: 200 });
		} else if (productsData?.data?.id) {
			setProducts({ data: [productsData?.data], errorStatus: 200 });
		}
	}, [productsData?.data, isError, isFetching]);

	const handlePageChange = (page: number) => {
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
	};

	return (
		<>
			<Header className="mb-5" />
			<main className="px-5">
				<ProductsTable className="mb-5" products={products} />
				{products.data.length > 0 && (
					<Pagination
						totalPages={productsData?.total_pages || 0}
						currentPage={currPage}
						onPageChange={handlePageChange}
						maxVisibleNumberPages={0}
					/>
				)}
			</main>
		</>
	);
};
