import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import Card from "../components/Card";
import { debounce } from "lodash"; // Use lodash for debouncing

const Search: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(100);
  const [sortOrder, setSortOrder] = useState("default");
  const [sortBySideBar, setSortByOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Separate state for search term
  const [filteredData, setFilteredData] = useState([]); // Data for filtered products

  // Handle Sorting Changes
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
    setSortByOpen(false)
    console.log("Selected Sort Order:", event.target.value);
  };

  // Handle Category Changes
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setSelectedCategory(event.target.value);
    setSortByOpen(false)
    console.log("Selected Category:", event.target.value);
  };

  // Handle Price Slider Changes
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  // Toggle Sidebar
  const openSideBar = () => {
    setSortByOpen(!sortBySideBar);
  };

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/product/search-sort?category=${selectedCategory}&price=${minPrice}&time=${sortOrder}`
        );
        setData(data);
        setFilteredData(data); // Set filtered data initially
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategory, minPrice,sortOrder]);

  // Debounced Search Handler
  const handleInputSearch = useCallback(
    debounce((term: string) => {
      const res = data.filter((v: any) =>
        v.product.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(res);
    }, 300),
    [data]
  );

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleInputSearch(term);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-4 w-full">
        {/* Search Input */}
        <div className="flex gap-2 items-center">
          <input
            className="border-2 border-black w-[70vw] md:w-[40vw] px-2 py-2 rounded-lg"
            type="search"
            placeholder="Search a product..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="ml-4 bg-black text-white block px-4 h-6 rounded-md "
            onClick={openSideBar}
          >
            Sort
          </button>
        </div>

        <div className="flex gap-20 mt-4 w-[100vw]">
          {/* Sidebar */}
          <div
            className={`w-30 fixed ${
              sortBySideBar ? "left-0" : "left-[-400px]"
            } transition-all duration-300 ease-in-out h-screen bg-gray-100 p-4 md:w-80 `}
          >
            <div className="flex items-center justify-center text-center gap-1">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="default" disabled>
                  Select sort option
                </option>
                <option value="latest">Latest</option>
                <option value="old">Old</option>
              </select>
            </div>

            <h2 className="text-xl font-bold mb-2 mt-4">Sort by Category</h2>
            <div className="space-y-4">
              {/* Radio Buttons for Category */}
              {["all", "mobile", "laptop", "t-shirt", "pant"].map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={handleCategoryChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 capitalize">{cat}</span>
                </label>
              ))}
            </div>

            {/* Minimum Price */}
            <div className="mt-6">
              <h1 className="font-bold text-xl">Sort by Price</h1>
              <label className="block mb-2 mt-2 text-gray-700">
                Price: ${minPrice}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div
            className="w-[100%] p-0 ml-[0rem] md:ml[18rem] md:p-6"
            onClick={() => setSortByOpen(false)}
          >
            <div className="flex w-[100vw] px-20 flex-col items-center lg:items-start sm:px-16 lg:flex-row">
              <div className="grid w-[97.8vw] gap-4 gap-x-2 grid-y-2 mt-2 gap-y-2 lg:gap-y-0 grid-cols-2 md-gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:w-[98vw]">
                {filteredData.length > 0 ? (
                  filteredData.map((v: any) => <Card key={v.id} data={v} />)
                ) : (
                  <h1>No products found</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
