export const convertProductLabel = (input: string) => {
	if (input.toLowerCase() === "id") return "ID";

	const parts = input.split("_");

	if (parts?.[0]) {
		parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
	}

	return parts.join(" ");
};
