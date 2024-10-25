"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Rectiles from '@/components/rectiles';
import React, { useEffect, useState } from 'react';
import { fetchListings } from '@/services/imoveisService'; // Import your service
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import SwiperCore, { Pagination, Navigation } from 'swiper'; // Import Swiper modules
import { FaRegImages } from 'react-icons/fa'; // Import the gallery icon
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { useRouter } from 'next/navigation'; // Updated import



// Install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const API_URL = 'http://localhost:1337'; // Your API base URL

// Define the structure of a listing based on the provided JSON
const ImovelDetail = ({ params }: { params: { id: string } }) => {
    const [imovel, setImovel] = useState<Listing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [swiperRef, setSwiperRef] = useState(null);
    const [bgColor, setBgColor] = useState("#111C22");

    const [whatsappNumber, setWhatsappNumber] = useState("556294774071");
    const [contactMessage, setContactMessage] = useState("");
    const [visitMessage, setVisitMessage] = useState("");

    const router = useRouter(); // Initialize router


    // Fetch property details based on the dynamic ID
    const fetchPropertyDetails = async (id: string) => {
        try {
            const response = await fetchListings(); // Fetch all listings
            console.log('Fetched Listings Response:', response);

            // Ensure the response contains data
            if (!response || !Array.isArray(response)) {
                throw new Error('No listings data found in response.');
            }

            const listings: Listing[] = response;
            console.log('Listings:', listings);

            // Find the property by ID
            const property = listings.find((item) => item.id === parseInt(id, 10));
            console.log('Found Property:', property);

            return property || null; // Return the property or null if not found
        } catch (error) {
            console.error('Error fetching property details:', error);
            setError('Failed to load property details.'); // Set error state
            return null;
        }
    };

    // Set the current URL once the component has mounted
    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = `${window.location.origin}${router.asPath}`;
            setContactMessage(`Olá! Eu gostaria de saber mais sobre este imóvel! ${currentUrl}`);
            setVisitMessage(`Olá! Eu gostaria de agendar uma visita para ver este imóvel pessoalmente! ${currentUrl}`);
        }
    }, [router.asPath]); // Update currentUrl when router.asPath changes

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const property = await fetchPropertyDetails(params.id);
            if (property) {
                setImovel(property);
            } else {
                setError("Property not found.");
            }
            setLoading(false);
        };

        loadData();
    }, [params.id]);
    
    // Effect to handle scroll event for background color change
    useEffect(() => {
        const handleScroll = () => {
            setBgColor(window.scrollY > 0 ? "#FFFFFF" : "#111C22");
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Helper function to extract text from the description object
    const getDescriptionText = (description: any) => {
        if (!description || !Array.isArray(description)) {
            return 'No description available.'; // Fallback if description is missing
        }

        return description
            .map((paragraph: any) =>
                paragraph.children.map((child: any) => child.text).join(' ')
            )
            .join(' ');
    };

    // Determine the appropriate image URL or use a fallback
    const getImageUrl = (images: any): string => {
        if (images && images.length > 0) {
            const largeImage = images[0]?.formats?.large?.url || images[0]?.url;
            return `${API_URL}${largeImage}`;
        }
        return '/path/to/placeholder-image.jpg'; // Fallback image
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message if any
    }

    if (!imovel) {
        return <div>Property not found.</div>; // Show if property is not found
    }

    return (
        <div style={{ backgroundColor: bgColor }} className="transition-colors duration-300">
            <Navbar />

            {/* Full-Screen Swiper Carousel */}
            <Swiper
                onSwiper={setSwiperRef}
                pagination={{ clickable: true }}
                navigation={false} // Disable default navigation arrows
                className="h-screen mb-6"
            >
                {imovel.images && imovel.images.length > 0 ? (
                    imovel.images.map((image: any, index: number) => (
                        <SwiperSlide key={index} className="flex justify-center items-center">
                            <div
                                className="relative w-full h-full"
                                style={{
                                    backgroundImage: `url(${getImageUrl([image])})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Gradient at the bottom of the carousel */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `url('/path/to/placeholder-image.jpg')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>

            {/* Custom Bottom Navigation Arrows */}
            <div className="absolute bottom-4 left-4 z-50 flex items-center space-x-4">
                <button
                    onClick={() => swiperRef?.slidePrev()}
                    className="border border-white bg-transparent p-2  transition duration-300 hover:bg-white hover:text-black"
                    aria-label="Previous image"
                >
                    <svg viewBox="0 0 24 24" width="2em" height="2em" className="fill-current">
                        <path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
                    </svg>
                </button>
                <button
                    onClick={() => swiperRef?.slideNext()}
                    className="border border-white bg-transparent p-2 transition duration-300 hover:bg-white hover:text-black"
                    aria-label="Next image"
                >
                    <svg viewBox="0 0 24 24" width="2em" height="2em" className="fill-current">
                        <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
                    </svg>
                </button>
            </div>


            {/* Property Detail Section */}
            <div className="max-w-screen-xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{imovel.nome || 'No title available'}</h2>
                    <p className="text-lg text-gray-700">{getDescriptionText(imovel.description)}</p>
                    <br/>
                    <p className="text-lg font-bold text-gray-900">
                        <strong>Preço:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(imovel.price)}
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Região:</strong> {imovel.estado && imovel.cidade && imovel.bairro ? `${imovel.estado}, ${imovel.cidade}, ${imovel.bairro}` : 'No location available'}
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Propriedade:</strong> {imovel.property || 'No property type available'}
                    </p>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-6 py-3 bg-black text-white font-bold text-lg shadow hover:bg-gray-800 transition duration-300"
                    >
                        Entrar em contato
                    </a>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(visitMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block ml-4 px-6 py-3 border border-black text-black font-bold text-lg shadow hover:bg-gray-200 transition duration-300"
                    >
                        Agendar visita
                    </a>
                    <p className="text-sm text-gray-600 mt-4">Código do Imóvel: AU001</p>
                </div>
                <Rectiles />
            </div>

            <Footer />
        </div>
    );
};

export default ImovelDetail;