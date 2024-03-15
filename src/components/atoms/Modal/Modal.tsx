import { X as CloseIcon } from "lucide-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	onClose: () => void;
	children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ onClose, children }) => {
	const modalRoot = document.getElementById("modal-root")!;
	const modalRef = useRef<HTMLDivElement>(null);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsClosing(true);
			}
		};

		document.addEventListener("keydown", handleKeydown);

		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	}, []);

	const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === modalRef.current) {
			setIsClosing(true);
		}
	};

	const handleTransitionEnd = () => {
		if (isClosing) {
			onClose();
		}
	};

	return createPortal(
		<div
			ref={modalRef}
			className={`fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-30 px-5 transition-opacity ${
				isClosing ? "opacity-0" : "opacity-100"
			}`}
			onClick={handleClose}
			onTransitionEnd={handleTransitionEnd}
		>
			<div className="relative w-full max-w-3xl rounded-md bg-white p-9">
				<button
					className="absolute right-[6px] top-[6px] ms-auto block rounded-lg bg-gray-300 p-1 hover:bg-red-500"
					onClick={() => setIsClosing(true)}
				>
					<CloseIcon />
				</button>
				{children}
			</div>
		</div>,
		modalRoot,
	);
};
