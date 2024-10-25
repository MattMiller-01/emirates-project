"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import { fetchListings } from '@/services/imoveisService'; // Import your service

const API_URL = 'http://localhost:1337'; // Your API base URL

const Imoveis = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false); // To check if the filter is applied
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 6;

    // Search Settings State
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100000000]);
    const [sqMeters, setSqMeters] = useState([0, 100000]);
    const [rooms, setRooms] = useState(1);
    const [homeType, setHomeType] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State to hold the location suggestions
    const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
    const [isSearchVisible, setIsSearchVisible] = useState(window.innerWidth >= 950);




    // Fetch listings from Strapi
    const getListings = async () => {
        const data = await fetchListings();
        setListings(data); // Set the listings directly
        setFilteredListings(data); // Set initial filtered listings to all listings
    };

    const parseNumber = (value) => {
        if (typeof value !== 'string') return value; // Return if not a string
        
        // Remove any whitespace
        value = value.trim();
        
        // Normalize the formats: replace commas with dots and remove dots as thousands separators
        if (value.includes(',')) {
            // If there's a comma, it could be a decimal
            // Replace the last comma with a dot for decimal representation
            const lastCommaIndex = value.lastIndexOf(',');
            value = value.replace(/\.|(?<=\d)(?=,)/g, ''); // Remove any dots as thousand separators
            value = value.replace(',', '.'); // Replace the last comma with a dot
        } else {
            // No comma, just ensure any dots are removed (thousands)
            value = value.replace(/\./g, ''); // Remove dots (thousands)
        }
        
        // Convert to float
        const parsedValue = parseFloat(value);
        
        return isNaN(parsedValue) ? 0 : parsedValue; // Return 0 if parsing fails
    };
    
    

    useEffect(() => {
        getListings();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // Update the window width on resize
        };
    
        window.addEventListener('resize', handleResize); // Listen for resize events
        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 950) {
                setIsSearchVisible(true); // Always show on wide screens
            } else {
                setIsSearchVisible(false); // Hide on narrow screens
            }
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the state correctly
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    

    // Handle search input and generate suggestions
    const handleSearchInput = (e) => {
        const inputValue = e.target.value; // Do not trim here, allow normal typing
        setSearchQuery(inputValue);

        if (inputValue.trim()) {
            const searchKeywords = inputValue.toLowerCase().split(/\s+/); // Split by spaces and clean extra spaces

            const matchedSuggestions = listings
                .map((listing) => {
                    const locationArray = [listing.estado, listing.cidade, listing.bairro].filter(Boolean); 
                    return {
                        fullLocation: locationArray.join(', '),
                        estado: listing.estado || 'Unknown',
                        cidade: listing.cidade || 'Unknown',
                        bairro: listing.bairro || 'Unknown'
                    };
                })
                .filter(({ fullLocation }) => 
                    searchKeywords.every((keyword) => fullLocation.toLowerCase().includes(keyword))
                )
                .slice(0, 5);

            setSuggestions(matchedSuggestions);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };
    
    // When handling search, clean the query and allow broader matching when a city is selected:
    const handleSearchUpdate = () => {
        let filtered = listings;
        
        if (searchQuery.trim()) {
            const searchKeywords = searchQuery.toLowerCase().split(/\s+/); // Clean extra spaces
            
            filtered = filtered.filter((listing) => {
                const locationArray = [listing.estado, listing.cidade, listing.bairro].filter(Boolean);
                const fullLocation = locationArray.join(', ').toLowerCase();
                
                // Check if the full location includes the search query keywords
                return searchKeywords.every((keyword) => fullLocation.includes(keyword));
            });
        }
        
        if (priceRange[0] > 0 || priceRange[1] > 0) {
            filtered = filtered.filter((listing) => {
                const listingPrice = parseNumber(listing.price); // Parse listing price
                return listingPrice >= priceRange[0] && listingPrice <= priceRange[1]; // Compare with slider values
            });
        }
        
        // Update in handleSearchUpdate function
        if (sqMeters[0] > 0 || sqMeters[1] > 0) {
            filtered = filtered.filter((listing) => {
                const area = parseNumber(listing.metros); // Use parseNumber to handle decimals
                const minArea = sqMeters[0];
                const maxArea = sqMeters[1] > 0 ? sqMeters[1] : Number.MAX_SAFE_INTEGER; // If max area is 0 or not set, treat as unlimited
                return area >= minArea && area <= maxArea;
            });
        }

        
        if (rooms > 0) {
            filtered = filtered.filter((listing) => listing.Quartos >= rooms);
        }
        
        if (homeType) {
            filtered = filtered.filter((listing) => listing.property.trim().toLowerCase() === homeType.trim().toLowerCase());
        }
        
        setFilteredListings(filtered);
        setCurrentPage(1);
        setIsFilterApplied(true);
    };



    // Handle clearing search parameters
    const handleClearSearch = () => {
        setSearchQuery('');
        setPriceRange([0, 100000000]);
        setSqMeters([0, 100000]);
        setRooms(1);
        setHomeType('');
        setFilteredListings(listings); // Reset filtered listings to the original listings
        setIsFilterApplied(false); // Mark that no filter is applied
        setCurrentPage(1); // Reset to the first page
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate the index range of properties to display on the current page
    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

    const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

    return (
        <>
            <div className="bg-gray-50 text-gray-900 pt-8 pb-8">
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8 mt-10 flex flex-col lg:flex-row gap-8"> {/* Adjusted this line */}
                {windowWidth < 950 && ( // Button appears only below 950px width
                    <div className="flex justify-center mb-4">
                        <button
                           onClick={() => setIsSearchVisible(!isSearchVisible)}
                            className="border border-black text-black px-6 py-2 rounded-none hover:bg-black hover:text-white transition duration-300"
                        >
                            Customizar Busca
                        </button>
                    </div>
                )}
                {/* Search Settings Panel */}
                {isSearchVisible && (
                    <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 lg:mb-0"> {/* Set full width for small screens */}
                        <h3 className="text-2xl font-serif font-bold mb-4">Configurações de pesquisa</h3>
                        <div className="mb-6">
                            <label className="block text-lg mb-2">Região:</label>
                            <input
                                type="text"
                                placeholder="Estado/Cidade/Bairro"
                                value={searchQuery}
                                onChange={handleSearchInput} // Use handleSearchInput for suggestions
                                onKeyDown={(e) => e.key === 'Enter' && handleSearchUpdate()} // Trigger search on Enter
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {showDropdown && suggestions.length > 0 && (
                                <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSearchQuery(suggestion.fullLocation);
                                                setShowDropdown(false);
                                                handleSearchUpdate(); // Trigger search after selecting a suggestion
                                            }}
                                        >
                                            {suggestion.fullLocation}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg mb-2">Tipo:</label>
                            <select value={homeType} onChange={(e) => setHomeType(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Selecionar tipo</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Casa">Casa</option>
                                <option value="Villa">Villa</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Casa de condomínio">Casa de condomínio</option>
                                <option value="Studio/Flat">Studio/Flat</option>
                                <option value="Chacara">Chacara</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg mb-2">Preço Mínimo:</label>
                            <input
                                type="range"
                                min="100000"
                                max="20000000"
                                step="100000" // Increment by 10,000
                                value={priceRange[0]} // Use priceRange[0] for the minimum price
                                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} // Update the minimum price
                                className="w-full"
                            />
                            <p className="text-sm">Mínimo: R$ {new Intl.NumberFormat().format(priceRange[0])}</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg mb-2">Área Minima:</label>
                            <input
                                type="number"
                                placeholder="Área mínima (m²)"
                                value={sqMeters[0]} // First element for minimum area
                                onChange={(e) => setSqMeters([parseInt(e.target.value), sqMeters[1]])} // Update minimum area
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg mb-2">Área Maxima:</label>
                            <input
                                type="number"
                                placeholder="Área máxima (m²)"
                                value={sqMeters[1]} // Second element for maximum area
                                onChange={(e) => setSqMeters([sqMeters[0], parseInt(e.target.value)])} // Update maximum area
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-lg mb-2">Quartos:</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={rooms}
                                onChange={(e) => setRooms(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        {/* Update Search Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSearchUpdate}
                                className="border border-black text-black px-6 py-2 rounded-none hover:bg-black hover:text-white transition duration-300"
                            >
                                Atualizar Pesquisa 
                            </button>
                        </div>

                        {/* Clear Search Button */}
                        {isFilterApplied && ( // Only show this button if a filter is applied
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleClearSearch}
                                    className="border border-red-500 text-red-500 px-6 py-2 rounded-none hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Limpar Pesquisa
                                </button>
                            </div>
                        )}
                    </aside>
                )}

                {/* Listings Display */}
                <div className="w-full lg:w-3/4"> {/* Set full width for small screens */}
                    <h2 className="text-3xl font-bold mb-6">Imóveis</h2>
                    {/* Property Listing Tiles */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {currentListings.map((listing) => (
                            <div
                                key={listing.id}
                                className="relative flex flex-col md:flex-row bg-white shadow-lg overflow-hidden"
                                style={{
                                    backgroundImage: `url(${listing.images[0]?.url ? `${API_URL}${listing.images[0].url}` : ''})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '300px',
                                }}
                            >
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                                <div className="relative w-full md:w-1/2 flex flex-col justify-center p-6 space-y-4 bg-opacity-10 bg-black rounded-md shadow-lg">
                                    {/* Property Title */}
                                    <h2 className="text-4xl font-bold text-white tracking-tight mb-2">{listing.nome}</h2>

                                    {/* Price */}
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        <span className="text-xl text-gray-300">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(listing.price)}
                                    </h3>

                                    {/* CTA Button */}
                                    <Link
                                        href={`/imovel/${listing.id}`} // Link to the detail page
                                        className="border border-white text-white px-6 py-3 text-lg font-medium hover:bg-white hover:text-black transition duration-300 mt-4 "
                                    >
                                        Veja Mais
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 border border-black text-black hover:bg-black hover:text-white transition duration-300"
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 mx-1 border border-black text-black hover:bg-black hover:text-white transition duration-300 ${
                            currentPage === i + 1 ? 'bg-black text-white' : ''
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 border border-black text-black hover:bg-black hover:text-white transition duration-300"
                >
                    Próxima
                </button>
            </div>
        </div>


            <Footer />
        </>
    );
};

export default Imoveis;
