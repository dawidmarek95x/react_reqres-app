import { HTMLAttributes } from "react";
import { ProductIdFilter } from "../../molecules/ProductIdFilter/ProductIdFilter";
import clsx from "clsx";

type HeaderProps = HTMLAttributes<HTMLDivElement>;

export const Header = ({ ...props }: HeaderProps) => {
	return (
		<div
			{...props}
			className={clsx(
				"bg-cyan-500 p-5 shadow-md shadow-gray-400",
				props.className,
			)}
		>
			<ProductIdFilter />
		</div>
	);
};
