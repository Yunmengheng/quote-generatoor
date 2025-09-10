"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("Click the button below to get an inspiring quote!");

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(135deg, #E8FFD7 0%, #93DA97 50%, #5E936C 100%)`
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: '#3E5F44' }}
        >
          Quote Generator
        </h1>
        <p 
          className="text-lg"
          style={{ color: '#3E5F44' }}
        >
          Discover wisdom with the click of a button
        </p>
      </div>

      {/* Quote Display Box */}
      <div 
        className="rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl w-full mx-4 mb-8"
        style={{ backgroundColor: '#E8FFD7' }}
      >
        <p 
          className="text-lg md:text-xl text-center leading-relaxed"
          style={{ color: '#3E5F44' }}
        >
          {quote}
        </p>
      </div>

      {/* Get Random Quote Button */}
      <button
        onClick={getRandomQuote}
        className="font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        style={{ 
          backgroundColor: '#3E5F44',
          color: '#E8FFD7'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#5E936C';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#3E5F44';
        }}
      >
        Get Random Quote
      </button>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p 
          className="text-sm"
          style={{ color: '#3E5F44' }}
        >
          © 2025 Quote Generator
        </p>
      </div>
    </div>
  );
}
