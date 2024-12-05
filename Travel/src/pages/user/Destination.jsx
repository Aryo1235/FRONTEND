import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Path disesuaikan
import { Pagination } from "flowbite-react";

import SkeletonCard from "../../components/common/SkeletonCard";
import SearchInput from "../../components/common/SearchInput";
import FilterButton from "../../components/User/Destination/FilterButton";
import DestinationCard from "../../components/common/DestinationCard";
import SortButton from "../../components/User/Destination/SortButton";

export default function Destination() {
  const [destinations, setDestinations] = useState([]); // State untuk menyimpan data
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Data untuk pagination
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangkap error
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [sortOption, setSortOption] = useState(""); // Sort option
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const itemsPerPage = 12; // Jumlah item per halaman
  console.log(destinations);
  // Fetch data dari API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/destination", {
          params: {
            search: searchQuery,
            sort: sortOption,
          },
        });
        setDestinations(response.data.destinations || []);
      } catch (err) {
        setError(err.message || "Failed to fetch destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [searchQuery, sortOption]); // Refetch saat search atau sort berubah

  // Filter data berdasarkan halaman saat ini
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setFilteredDestinations(
      destinations.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [destinations, currentPage]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset halaman ke awal saat search
  };

  // Handle sort option
  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset halaman ke awal saat sort
  };

  return (
    <div className=" overflow-x-hidden my-10">
      {/* Header */}
      <div className="max-w-full sm:max-w-md md:max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <header className="flex flex-col justify-center md:flex-row md:justify-center md:items-center mb-8 space-y-3 md:space-y-0 md:space-x-3">
          <SearchInput onSearch={handleSearch} />
          <div className="flex justify-center items-center space-x-3">
            <FilterButton />
            <SortButton onSort={handleSort} />
          </div>
        </header>

        {/* Error Handling */}
        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          // Destinations Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  className="sm:p-2 md:p-4"
                />
              ))
            ) : (
              <p className="col-span-full text-center">
                No destinations found.
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(destinations.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}