import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // Sesuaikan dengan lokasi file axiosInstance
import HeroImageSection from "../../components/User/DetailDestinasi/HeroSection";
import TitleAndInfoSection from "../../components/User/DetailDestinasi/TittleAndInfoSection";
import DescriptionSection from "../../components/User/DetailDestinasi/DescriptionSection";
import FacilitiesSection from "../../components/User/DetailDestinasi/FacilitiesSection";
import VideoSection from "../../components/User/DetailDestinasi/VideoSection";
import HeroImageSkeleton from "../../components/User/DetailDestinasi/HeroSectionSkeleton";
import TitleAndInfoSkeleton from "../../components/User/DetailDestinasi/TitleAndInfoSkeleton";
import DescriptionSkeleton from "../../components/User/DetailDestinasi/DescriptionSkeleton";
import FacilitiesSkeleton from "../../components/User/DetailDestinasi/FacilitiesSkeleton";
import VideoSectionSkeleton from "../../components/User/DetailDestinasi/VideoSectionSkeleton";
import { fetchDestinationById } from "../../utils/apiUtils"; // Sesuaikan dengan lokasi file
import SimilarDestinations from "../../components/User/DetailDestinasi/SimilarDestination"; // Import komponen SimilarDestinations
import NotFoundPageUser from "./NotFoundUser";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(destination);
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await fetchDestinationById(id); // Ambil detail destinasi
        setDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <section className="py-10 px-6 mx-auto font-poppins space-y-10">
        <HeroImageSkeleton />
        <TitleAndInfoSkeleton />
        <div className="py-5  w-24 rounded-full bg-gray-300 animate-pulse"></div>
        <DescriptionSkeleton />
        <FacilitiesSkeleton />
        <VideoSectionSkeleton />
      </section>
    );
  }

  if (error || !destination) {
    return <NotFoundPageUser />;
  }

  return (
    <section className="py-10 px-6 mx-auto font-poppins">
      {/* Hero Image */}
      <HeroImageSection images={destination.images} />
      {/* Title and Info */}
      <TitleAndInfoSection destination={destination} />
      <div className="flex mt-5">
        <div className="bg-sky-500 text-white rounded-full py-2 px-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-200 ">
          {destination.category}
        </div>
      </div>
      {/* Description */}
      <DescriptionSection description={destination.description} />
      {/* Facilities Section */}
      <FacilitiesSection facilities={destination.facilities} />
      {/* Video Section */}
      <VideoSection videos={destination.video_contents} />

      {/* Rekomendasi Destinasi Serupa */}
      <SimilarDestinations
        category={destination.category}
        currentDestinationId={destination.id}
        city={destination.city}
      />
    </section>
  );
};

export default DestinationDetail;
