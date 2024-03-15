import { MoveLeft as LeftArrowIcon } from "lucide-react";
import { MoveRight as RightArrowIcon } from "lucide-react";
import React from "react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	maxVisiblePages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	onPageChange,
	maxVisiblePages,
}) => {
	const handlePageChange = (page: number) => {
		if (page !== currentPage) {
			onPageChange(page);
		}
	};

	const renderPaginationItems = () => {
		const paginationItems = [];

		let startPage = 1;
		let endPage = Math.min(maxVisiblePages, totalPages);

		if (currentPage > Math.floor(maxVisiblePages / 2)) {
			startPage = currentPage - Math.floor(maxVisiblePages / 2);
			endPage = startPage + maxVisiblePages - 1;

			if (endPage > totalPages) {
				endPage = totalPages;
				startPage = endPage - maxVisiblePages + 1;
			}
		}

		if (startPage > 1) {
			paginationItems.push(
				<li
					key="previous"
					className="cursor-pointer rounded-md border bg-white px-3 py-1 text-black transition-all duration-200 hover:bg-cyan-300"
					onClick={() => handlePageChange(currentPage - 1)}
				>
					<LeftArrowIcon size={24} className="stroke-black" />
				</li>,
			);
		}

		for (let i = startPage; i <= endPage; i++) {
			paginationItems.push(
				<li
					key={i}
					className={`${
						i === currentPage
							? "bg-cyan-300"
							: "bg-white  transition-all duration-200 hover:bg-cyan-300"
					} cursor-pointer rounded-md border px-3 py-1 text-black`}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</li>,
			);
		}

		if (endPage < totalPages) {
			paginationItems.push(
				<li
					key="next"
					className="cursor-pointer rounded-md border bg-white px-3 py-1 text-black transition-all duration-200 hover:bg-cyan-300"
					onClick={() => handlePageChange(currentPage + 1)}
				>
					<RightArrowIcon size={24} className="stroke-black" />
				</li>,
			);
		}

		return paginationItems;
	};

	return (
		<div className="flex justify-center">
			<ul className="flex space-x-2">{renderPaginationItems()}</ul>
		</div>
	);
};
