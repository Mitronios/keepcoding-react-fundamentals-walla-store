import { useEffect } from "react";
import { Tag, Banknote } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAdverts } from "../store/slices/advertsSlice";
import { fetchTags } from "../store/slices/tagsSlice";
import {
  selectFilteredAdverts,
  selectIsAdvertsLoading,
  selectAdvertsError,
} from "../store/selectors";
import formatPrice from "../utils/formatPrice";
import AdvertFilters from "../components/AdvertFilters";
import { Link } from "react-router-dom";

const Adverts = () => {
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(selectFilteredAdverts);
  const isLoading = useAppSelector(selectIsAdvertsLoading);
  const error = useAppSelector(selectAdvertsError);

  useEffect(() => {
    dispatch(fetchAdverts());
    dispatch(fetchTags());
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className="p-8 text-center text-gray-600">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-xl">Cargando anuncios...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8 text-center text-red-600">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => dispatch(fetchAdverts())}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </section>
    );
  }

  const handleOnError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=No+Image`;
    event.currentTarget.alt = "No image available";
  };

  return (
    <section className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Adverts listed
      </h1>

      <AdvertFilters />
      {adverts.length === 0 ? (
        <article className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-lg p-8">
          <p className="text-2xl text-gray-600 mb-6">
            Sorry no adverts have been published yet. Be the first!
          </p>
          <Link
            to={"/adverts/new-advert"}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create new Advert
          </Link>
        </article>
      ) : (
        //Card
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adverts.map((advert) => (
            <Link
              key={advert.id}
              to={`/adverts/${advert.id}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-xl">
                {advert.photo ? (
                  <img
                    src={advert.photo}
                    alt={advert.name}
                    className="w-full h-full object-cover"
                    onError={handleOnError}
                  />
                ) : (
                  // If Photo is null
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <img
                      src={`https://placehold.co/400x200/cccccc/333333?text=No+Image`}
                      alt="No Image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Buy or sale */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                    advert.sale ? "bg-green-500" : "bg-purple-600"
                  }`}
                >
                  {advert.sale ? "For Sale" : "Buying"}
                </span>
              </div>

              <div className="p-5">
                {/* Advert */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                  {advert.name}
                </h2>

                <div className="flex items-center text-gray-700 mb-3">
                  <Banknote className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-lg font-semibold">
                    {formatPrice(advert.price)}
                  </span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {advert.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                {/* For accesibility*/}
                <button className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200 ease-in-out">
                  See more details
                </button>
              </div>
            </Link>
          ))}
        </article>
      )}
    </section>
  );
};

export default Adverts;
