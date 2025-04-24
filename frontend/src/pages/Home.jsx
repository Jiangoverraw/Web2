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
            <Navbar />


            <section className="relative text-center w-full h-screen">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <h2 className="text-4xl font-bold text-white">Find & Sell Your Best Car Easily & Trusted</h2>
                    <p className="text-gray-300 mt-4">
                        We will help you sell or buy & bid your dream car here easily and quickly that is reliable
                    </p>
                </div>

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


            <section className="py-12 px-6">
                <h3 className="text-2xl font-bold mb-6 text-white">Hot Bids Feature</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <section className="py-6 px-4 bg-yellow-500 text-black">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1 text-left">
                        <img className="h-9 mb-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg" alt="dummyLogoDark" />
                        <p className="text-sm">
                            Welcome to Jezcar, your trusted partner in buying and selling cars. We are dedicated to helping you find your dream car or sell your current one with ease and reliability. Experience the best car deals with us!
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <h2 className="font-semibold mb-3 text-gray-800">Company</h2>
                            <ul className="text-sm space-y-1">
                                <li><a href="#" className="hover:underline">Home</a></li>
                                <li><a href="#" className="hover:underline">About us</a></li>
                                <li><a href="#" className="hover:underline">Contact us</a></li>
                                <li><a href="#" className="hover:underline">Privacy policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800 mb-3">Subscribe</h2>
                            <div className="text-sm">
                                <p>Get updates and offers directly in your inbox.</p>
                                <div className="flex items-center gap-2 mt-4">
                                    <input className="border border-gray-300 placeholder-gray-500 outline-none w-full max-w-xs h-8 rounded px-2" type="email" placeholder="Enter your email" />
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-600">
                    Copyright 2024 © Jezcar. All Rights Reserved.
                </p>
            </section>
        </div>
    );
};

export default Home;