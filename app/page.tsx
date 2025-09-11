"use client";

import { useState, useEffect } from "react";
import { supabase, Quote } from "../lib/supabase";

export default function Home() {
  const [quote, setQuote] = useState("Click the button below to get an inspiring quote!");
  const [author, setAuthor] = useState("");
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
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to connect to database. Please check your connection and try again.');
      setQuotes([]);
    }
  };

  const getRandomQuote = async () => {
    if (quotes.length === 0) {
      setQuote("No quotes available in database. Please check your Supabase connection.");
      setAuthor("");
      setError("Database connection required");
      return;
    }

    setLoading(true);
    
    try {
      // Get a random quote from the quotes array
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[randomIndex];
      setQuote(selectedQuote.text);
      setAuthor(selectedQuote.author);
      setError(null);
    } catch (error) {
      console.error('Error getting random quote:', error);
      setError('Failed to get quote');
      setAuthor("");
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
          className="text-lg md:text-xl text-center leading-relaxed mb-4"
          style={{ color: '#3E5F44' }}
        >
          "{quote}"
        </p>
        {author && (
          <p 
            className="text-base md:text-lg text-center font-medium"
            style={{ color: '#5E936C' }}
          >
            — {author} —
          </p>
        )}
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
          © Quote Generator by MengHeng
        </p>
      </div>
    </div>
  );
}
