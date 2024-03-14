import { PRODUCTS } from "../endpoints";
import { reqresApiSlice } from "../slices/reqresApiSlice";

type GetProductsPayload = {
	page?: number;
	per_page?: number;
	id?: number;
};

export type Product = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantone_value: string;
};

type ResponseSupport = {
	url: string;
	text: string;
};

type GetProductsResponse = {
	page?: number;
	per_page?: number;
	total?: number;
	total_pages?: number;
	data: Product[] | Product;
	support: ResponseSupport;
};

type GetProductByIdPayload = {
	id: number;
};

type GetProductByIdResponse = {
	data: Product;
	support: ResponseSupport;
};

const apiWithTag = reqresApiSlice.enhanceEndpoints({
	addTagTypes: ["Products"],
});

const productsService = apiWithTag.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<GetProductsResponse, GetProductsPayload>({
			query: ({ page, per_page, id }) => {
				const params = new URLSearchParams({
					...(page && { page: page.toString() }),
					...(per_page && { per_page: per_page.toString() }),
					...(id && { id: id.toString() }),
				});

				return {
					url: `${PRODUCTS}?${params.toString()}`,
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					// params: {
					//   page: page?.toString(),
					//   per_page: per_page?.toString(),
					//   id: id?.toString(),
					// },
				};
			},
			providesTags: ["Products"],
		}),

		getProductById: builder.query<
			GetProductByIdResponse,
			GetProductByIdPayload
		>({
			query: ({ id }) => ({
				url: `${PRODUCTS}/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetProductsQuery } = productsService;
