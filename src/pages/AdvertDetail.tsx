import { Trash2, Calendar, Banknote } from "lucide-react";
import type { Advert } from "../interfaces/advert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	getAdvertById,
	deleteAdvertById,
} from "../services/advertDetailService";

const AdvertDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [advert, setAdvert] = useState<Advert | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchAdvert = async () => {
			setIsLoading(true);
			setHasError(null);
			try {
				const data = await getAdvertById(id);
				setAdvert(data);
			} catch (error) {
				setHasError("Can't load the details...");
			} finally {
				setIsLoading(false);
			}
		};

		fetchAdvert();
	}, [id]);

	const handleDelete = async () => {
		if (!id) return;
		try {
			await deleteAdvertById(id);
			navigate("/adverts");
		} catch (error) {
			alert("Something went wrong when trying to delete advert.");
		}
	};

	if (isLoading) {
		return (
			<section className="p-8 text-center text-gray-600">
				<p className="text-xl">Loading advert details...</p>
			</section>
		);
	}

	if (hasError) {
		return (
			<section className="p-8 text-center text-red-600">
				<p className="text-xl">{hasError}</p>
			</section>
		);
	}

	if (!advert) {
		return (
			<section className="p-8 text-center text-gray-600">
				<p className="text-xl">Advert not Found!</p>
			</section>
		);
	}

	const imageUrl =
		advert.photo || "https://placehold.co/400x200/cccccc/333333?text=No+Image";

	return (
		<section className="p-6 rounded-lg shadow-xl bg-white border border-gray-200">
			<div className="flex justify-between items-start mb-6">
				<h2 className="text-4xl font-extrabold text-teal-600 break-words">
					{advert.name}
				</h2>
				<button
					onClick={handleDelete}
					className="p-3 rounded-full bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
					title="Delete advert"
				>
					<Trash2 size={24} />
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
				<p className="flex items-center text-gray-700 text-lg">
					<Banknote
						className="mr-3 text-blue-500"
						size={22}
					/>
					<span className="font-semibold text-gray-800">Price:</span>{" "}
					{advert.price ? `$${advert.price}` : "Ask for price"}
				</p>

				<p className="flex items-center text-gray-700 text-lg">
					<Calendar
						className="mr-3 text-blue-500"
						size={22}
					/>
					<span className="font-semibold text-gray-800">Published on:</span>{" "}
					{new Date(advert.createdAt).toLocaleDateString("es-ES", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>

			<div className="mb-8 flex justify-center">
				<div className="w-full max-w-lg">
					<h3 className="text-2xl font-bold text-teal-600 mb-3">Image</h3>
					<img
						src={imageUrl}
						alt={`Imagen de ${advert.name}`}
						className="w-full h-96 object-cover rounded-lg shadow-md border border-gray-200"
					/>
				</div>
			</div>

			<div className="text-right text-gray-500 text-sm">
				Advert ID: {advert.id}
			</div>
		</section>
	);
};

export default AdvertDetail;
