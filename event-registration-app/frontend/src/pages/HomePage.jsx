import React from "react";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur border-b border-sage-200 z-50 px-6 py-3 flex justify-between items-center">
      <span className="font-bold text-sage-600 text-xl">🌿 EventHub</span>
      <div className="flex gap-6 text-sage-600 font-medium text-sm">
        <a href="#" className="hover:text-sage-400 transition-colors">Events</a>
        <a href="#" className="hover:text-sage-400 transition-colors">About</a>
        <a href="#" className="bg-sage-400 text-white px-4 py-1.5 rounded-lg hover:bg-sage-500 transition-colors">Login</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="bg-summer-cream min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-1 bg-sage-400 rounded-full mb-6"></div>
      <h1 className="text-5xl font-bold text-sage-700 mb-4 leading-tight">
        Join the <span className="text-sage-400">Summer</span> Events 🌿
      </h1>
      <p className="text-sage-600 text-lg max-w-md mb-8">
        Discover, register, and attend the best events near you.
        Powered by AI for smart recommendations.
      </p>
      <div className="flex gap-4">
        <button className="bg-sage-400 hover:bg-sage-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200">
          Browse Events
        </button>
        <button className="border-2 border-sage-400 text-sage-600 hover:bg-sage-50 font-semibold px-8 py-3 rounded-xl transition-all duration-200">
          Register Free
        </button>
      </div>
      <div className="mt-12 w-64 h-64 rounded-full bg-sage-100 flex items-center justify-center text-7xl">
        🌱
      </div>
    </section>
  );
}

function EventCard({ title, date, location, spots }) {
  return (
    <div className="bg-white border border-sage-200 rounded-2xl p-5 hover:shadow-md hover:border-sage-400 transition-all duration-200">
      <span className="bg-sage-100 text-sage-600 text-xs font-semibold px-3 py-1 rounded-full">
        {spots} spots left
      </span>
      <h3 className="font-semibold text-sage-700 text-lg mt-3 mb-1">{title}</h3>
      <p className="text-sage-500 text-sm">📅 {date}</p>
      <p className="text-sage-500 text-sm">📍 {location}</p>
      <button className="mt-4 w-full bg-sage-400 hover:bg-sage-500 text-white py-2 rounded-lg font-semibold transition-colors duration-200">
        Register Now
      </button>
    </div>
  );
}

function EventsSection() {
  const events = [
    { title: "Summer Yoga Festival",  date: "June 15, 2025", location: "Pune",       spots: 12 },
    { title: "Tech & Tea Meetup",     date: "June 20, 2025", location: "Mumbai",     spots: 5  },
    { title: "Green Living Workshop", date: "July 1, 2025",  location: "Aurangabad", spots: 20 },
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-sage-700 text-center mb-10">
        Upcoming Events 🌸
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="pt-14">
        <Hero />
        <EventsSection />
      </div>
    </div>
  );
}