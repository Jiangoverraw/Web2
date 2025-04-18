import React from 'react';
import Navbar from '../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Hero + Swiper Section */}
            <section className="relative text-center w-full h-screen">
                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <h2 className="text-4xl font-bold text-white">Find & Sell Your Best Car Easily & Trusted</h2>
                    <p className="text-gray-300 mt-4">
                        We will help you sell or buy & bid your dream car here easily and quickly that is reliable
                    </p>
                    <button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                        Learn More
                    </button>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="rounded-none w-full h-full"
                    style={{}}
                >
                    <SwiperSlide>
                        <div className="relative h-full">
                            <img
                                src="https://hips.hearstapps.com/hmg-prod/images/dwburnett-pagani-huayrabc018-1637264970.jpg?resize=2048:*"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                                <h4 className="text-xl font-bold">Pagani Huayra</h4>
                                <p className="text-gray-300">2023 · Automatic · 10,000km</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full">
                            <img
                                src="https://media.auto5.vn/files/quanganh/2024/04/28/untitled-073852.jpg"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                                <h4 className="text-xl font-bold">Tesla Model S</h4>
                                <p className="text-gray-300">2022 · Electric · 5,000km</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full">
                            <img
                                src="https://media.adtorqueedge.com/new-cars/bmw-nz/m4-coupe/banner-new.jpg"

                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                                <h4 className="text-xl font-bold">BMW M4</h4>
                                <p className="text-gray-300">2021 · Manual · 20,000km</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            {/* Search Bar */}
            <div className="px-6">
                <input
                    type="text"
                    placeholder="Search car model or keyword"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
                />
            </div>

            {/* Hot Bids Section */}
            <section className="py-12 px-6">
                <h3 className="text-2xl font-bold mb-6 text-white">Hot Bids Feature</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Lamborghini Aventador */}
                    <div className="relative rounded-lg overflow-hidden group h-[300px]">
                        <img
                            src="https://i1-vnexpress.vnecdn.net/2021/07/07/Aventador-Ultimae-Coupe-1-3961-1625659942.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=-bQfhP52fmZis8gCgeHLoQ"
                            alt="Lamborghini Aventador"
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6 bg-black/60  text-white">
                            <div>
                                <h4 className="text-xl font-bold">Lamborghini Aventador</h4>
                                <p className="text-gray-300 mt-2">8,000km · 2023 · V12 · Dubai</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <p>Current Bid:</p>
                                    <p className="text-xl font-bold">$450,000</p>
                                </div>
                                <button className="mt-4 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-600">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* BMW M5 Competition */}
                    <div className="relative rounded-lg overflow-hidden group h-[300px]">
                        <img
                            src="https://www.supercarclub.pl/wp-content/uploads/2022/05/BMW-M5-1.jpg"
                            alt="BMW M5 Competition"
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6 bg-black/60  text-white">
                            <div>
                                <h4 className="text-xl font-bold">BMW M5 Competition</h4>
                                <p className="text-gray-300 mt-2">20,000km · 2022 · Automatic · Munich</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <p>Current Bid:</p>
                                    <p className="text-xl font-bold">€98,000</p>
                                </div>
                                <button className="mt-4 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-600">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Ferrari F8 Tributo */}
                    <div className="relative rounded-lg overflow-hidden group h-[300px]">
                        <img
                            src="https://autopro8.mediacdn.vn/thumb_w/640/2019/2/28/ferrari-f8-tributo-1-15513616685531834237255.jpg"
                            alt="Ferrari F8 Tributo"
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6 bg-black/60  text-white">
                            <div>
                                <h4 className="text-xl font-bold">Ferrari F8 Tributo</h4>
                                <p className="text-gray-300 mt-2">5,000km · 2022 · Twin-Turbo V8 · Rome</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <p>Current Bid:</p>
                                    <p className="text-xl font-bold">€310,000</p>
                                </div>
                                <button className="mt-4 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-600">
                                    Place Bid
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Filter Section */}
            <section className="py-12 px-6 bg-gray-800">
                <h3 className="text-2xl font-bold mb-6">Let’s Find Dream Car</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <select className="bg-black text-white px-4 py-3 rounded-lg">
                        <option>Brand</option>
                        <option>Lamborghini</option>
                        <option>BMW</option>
                        <option>Mercedes</option>
                    </select>
                    <select className="bg-black text-white px-4 py-3 rounded-lg">
                        <option>Model</option>
                        <option>Huracan</option>
                        <option>Series 3</option>
                        <option>G Class</option>
                    </select>
                    <select className="bg-black text-white px-4 py-3 rounded-lg">
                        <option>Location</option>
                        <option>Semarang</option>
                        <option>Jakarta</option>
                    </select>
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                        Find Car
                    </button>
                </form>
            </section>

            {/* Car Listings */}
            <section className="py-12 px-6">
                <h3 className="text-2xl font-bold mb-6">Most Popular</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Car Card */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/800x400"
                            alt="Car"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h4 className="text-xl font-bold">Mustang GT 500</h4>
                            <p className="text-gray-400 mt-2">100,000km · 2023 · Manual · Semarang</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-gray-400">Price:</p>
                                <p className="text-xl font-bold">Rp 1,800,000,000</p>
                            </div>
                            <button className="mt-4 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-600">
                                View Details
                            </button>
                        </div>
                    </div>
                    {/* Add more car cards as needed */}
                </div>
            </section>

            {/* Section 1 */}
            <section className="py-12 px-6 bg-gray-900 text-white">
                <h3 className="text-2xl font-bold mb-6">Luxury Cars</h3>
                <p className="text-gray-400 mb-4">
                    Explore our collection of luxury cars that combine elegance and performance.
                </p>
                <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                    View Collection
                </button>
            </section>

            {/* Section 2 */}
            <section className="py-12 px-6 bg-gray-800 text-white">
                <h3 className="text-2xl font-bold mb-6">Affordable Cars</h3>
                <p className="text-gray-400 mb-4">
                    Find the best deals on affordable cars that fit your budget.
                </p>
                <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                    Browse Deals
                </button>
            </section>

            {/* Section 3 */}
            <section className="py-12 px-6 bg-gray-700 text-white">
                <h3 className="text-2xl font-bold mb-6">Electric Cars</h3>
                <p className="text-gray-400 mb-4">
                    Discover the future of driving with our range of electric vehicles.
                </p>
                <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                    Learn More
                </button>
            </section>

            {/* Section 4 */}
            <section className="py-12 px-6 bg-gray-600 text-white">
                <h3 className="text-2xl font-bold mb-6">Family Cars</h3>
                <p className="text-gray-400 mb-4">
                    Browse our selection of family-friendly cars for comfort and safety.
                </p>
                <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                    View Options
                </button>
            </section>

            {/* Section 5 */}
            <section className="py-12 px-6 bg-gray-500 text-white">
                <h3 className="text-2xl font-bold mb-6">Sports Cars</h3>
                <p className="text-gray-400 mb-4">
                    Experience the thrill of driving with our high-performance sports cars.
                </p>
                <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600">
                    Explore Now
                </button>
            </section>

            {/* Join Section */}
            <section className="py-12 px-6 bg-yellow-500 text-black text-center">
                <h3 className="text-2xl font-bold">Join Us</h3>
                <p className="mt-4">We will help you to find your dream car here easily and quickly that is reliable</p>
                <form className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded-lg outline-none"
                    />
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
                        Subscribe
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Home;