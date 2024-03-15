import { Search } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProductIdFilter.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import clsx from "clsx";

type SearchData = {
	searchedProductId: string;
};

type ProductIdFilterProps = HTMLAttributes<HTMLDivElement>;

export const ProductIdFilter: FC<ProductIdFilterProps> = ({ ...props }) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const productId = searchParams.get("productId");
	const [focused, setFocused] = useState(false);

	const { register, watch } = useForm<SearchData>({
		defaultValues: {
			searchedProductId: productId ?? "",
		},
	});

	const debouncedValue = useDebounce(watch("searchedProductId"));

	useEffect(() => {
		if (debouncedValue === "") {
			navigate("/");
		} else {
			navigate(`/?productId=${debouncedValue}`);
		}
	}, [debouncedValue]);

	return (
		<div
			{...props}
			className={clsx("container table mx-auto max-w-3xl", props.className)}
		>
			<label
				className={`relative border-2 ${focused ? "border-gray-700" : "border-gray-400"} flex items-center overflow-hidden rounded-lg ring-2 ring-white`}
			>
				<input
					{...register("searchedProductId")}
					className="input-hide-arrows w-full py-2 pl-3 pr-10 focus:outline-none"
					type="number"
					min={1}
					placeholder="Searched ID"
					value={watch("searchedProductId")}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<Search size={16} className="stroke-current opacity-70" />
				</div>
			</label>
		</div>
	);
};
