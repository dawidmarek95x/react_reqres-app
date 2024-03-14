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
					className="cursor-pointer rounded-md border bg-white px-3 py-1 text-black transition-all duration-200 hover:bg-black hover:text-white"
					onClick={() => handlePageChange(currentPage - 1)}
				>
					Prev
				</li>,
			);
		}

		for (let i = startPage; i <= endPage; i++) {
			paginationItems.push(
				<li
					key={i}
					className={`${
						i === currentPage
							? "bg-black text-white"
							: "bg-white text-black transition-all duration-200 hover:bg-black hover:text-white"
					} cursor-pointer rounded-md border px-3 py-1`}
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
					className="cursor-pointer rounded-md border bg-white px-3 py-1 text-black transition-all duration-200 hover:bg-black hover:text-white"
					onClick={() => handlePageChange(currentPage + 1)}
				>
					Next
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
