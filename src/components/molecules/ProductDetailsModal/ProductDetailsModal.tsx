import { Modal } from "../../atoms/Modal/Modal";
import { convertProductLabel } from "../../../utils/convertProductLabel";
import { Product } from "../../../redux/services/productsService";

type ProductDetailsModalProps = {
	data?: Product;
	onClose: () => void;
};

export const ProductDetailsModal = ({
	data,
	onClose,
}: ProductDetailsModalProps) => {
	if (!data) {
		return <></>;
	}

	return (
		<Modal onClose={onClose}>
			<h2>Product details</h2>
			{Object.keys(data).map((key) => (
				<p key={key} className="text-lg">
					<span className="font-medium">{convertProductLabel(key)}:</span>{" "}
					{data[key as keyof Product]}
				</p>
			))}
		</Modal>
	);
};
