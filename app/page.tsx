"use client";

import { useState, useEffect } from "react";
import { supabase, Quote } from "../lib/supabase";

export default function Home() {
  const [quote, setQuote] = useState("Click the button below to get an inspiring quote!");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all quotes from Supabase on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      setQuotes(data || []);
      
      // If no quotes in database, seed with initial quotes
      if (!data || data.length === 0) {
        await seedQuotes();
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to fetch quotes from database');
      // Fallback to local quotes if database fails
      setQuotes([
        { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", created_at: "" },
        { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", created_at: "" },
        { id: 3, text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", created_at: "" },
        { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", created_at: "" },
      ]);
    }
  };

  const seedQuotes = async () => {
    const initialQuotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
      { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
    ];

    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert(initialQuotes)
        .select();
      
      if (error) {
        throw error;
      }
      
      setQuotes(data || []);
    } catch (error) {
      console.error('Error seeding quotes:', error);
    }
  };

  const getRandomQuote = async () => {
    if (quotes.length === 0) {
      setQuote("No quotes available. Please try again later.");
      return;
    }

    setLoading(true);
    
    try {
      // Get a random quote from the quotes array
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[randomIndex];
      setQuote(`${selectedQuote.text} - ${selectedQuote.author}`);
      setError(null);
    } catch (error) {
      console.error('Error getting random quote:', error);
      setError('Failed to get quote');
    } finally {
      setLoading(false);
    }
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
        {error && (
          <p 
            className="text-sm text-center mt-4"
            style={{ color: '#d32f2f' }}
          >
            {error}
          </p>
        )}
      </div>

      {/* Get Random Quote Button */}
      <button
        onClick={getRandomQuote}
        disabled={loading}
        className="font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{ 
          backgroundColor: loading ? '#5E936C' : '#3E5F44',
          color: '#E8FFD7'
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#5E936C';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#3E5F44';
          }
        }}
      >
        {loading ? 'Loading...' : 'Get Random Quote'}
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
