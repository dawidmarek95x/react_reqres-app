import { MoveLeft as LeftArrowIcon } from "lucide-react";
import { MoveRight as RightArrowIcon } from "lucide-react";
import React from "react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	maxVisibleNumberPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	currentPage,
	onPageChange,
	maxVisibleNumberPages,
}) => {
	const handlePageChange = (page: number) => {
		if (page !== currentPage) {
			onPageChange(page);
		}
	};

	const renderPaginationItems = () => {
		const paginationItems = [];

		let startPage = 1;
		let endPage = Math.min(maxVisibleNumberPages, totalPages);

		if (currentPage > Math.floor(maxVisibleNumberPages / 2)) {
			startPage = currentPage - Math.floor(maxVisibleNumberPages / 2);
			endPage = startPage + maxVisibleNumberPages - 1;

			if (endPage > totalPages) {
				endPage = totalPages;
				startPage = endPage - maxVisibleNumberPages + 1;
			}
		}

		if (startPage > 1) {
			paginationItems.push(
				<li
					key="previous"
					className="cursor-pointer rounded-md border border-gray-400 bg-white px-3 py-1 text-black transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-300"
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
							? "border-cyan-300 bg-cyan-300"
							: "border-gray-400 bg-white  transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-300"
					} cursor-pointer rounded-md border  px-3 py-1 text-black `}
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
					className="cursor-pointer rounded-md border border-gray-400 bg-white px-3 py-1 text-black transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-300"
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
