"use client";
import { useState, useEffect } from "react";
import { User, Phone, Clock, ShieldCheck, Mail, MapPin, Home } from "lucide-react";

export const SentRequests = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Please login to view your enquiries");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/requests/tenents`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Session expired. Please login again.");
          } else {
            throw new Error("Failed to fetch enquiries");
          }
        }

        const data = await response.json();
        setMyBookings(data);
      } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        setError(error.message || "Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);
  
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "pending":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      case "rejected":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  const getStatusMessage = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "Your enquiry has been confirmed!";
      case "pending":
        return "Waiting for owner's response";
      case "rejected":
        return "This enquiry was declined";
      default:
        return "Status unknown";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading your enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-red-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Oops!</h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (myBookings.length === 0) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="text-slate-400" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">No Enquiries Yet</h3>
          <p className="text-slate-500 mb-6">
            You haven't sent any enquiries yet. Start exploring PGs to find your perfect stay!
          </p>
          <a 
            href="/findpg"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition"
          >
            Browse PGs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">My Enquiries</h2>
        <p className="text-slate-600">Track all your PG enquiries in one place</p>
      </div>

      <div className="flex flex-col gap-6">
        {myBookings.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="size-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <Home size={28} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {req.pg_name || "PG Name"}
                    </h3>
                    {req.location && (
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {req.location}
                      </p>
                    )}
                  </div>
                  
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyles(req.status)}`}
                  >
                    {req.status || "Pending"}
                  </span>
                </div>

                <p className="text-slate-600 mb-4">
                  {getStatusMessage(req.status)}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={16} className="text-orange-500" />
                    <span>Sent on {new Date(req.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </div>
                  
                  {req.owner_name && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <User size={16} className="text-orange-500" />
                      <span>Owner: {req.owner_name}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  {req.owner_phone && (
                    <a
                      href={`tel:${req.owner_phone}`}
                      className="px-5 py-2.5 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-slate-800 transition"
                    >
                      <Phone size={16} />
                      Call Owner
                    </a>
                  )}
                  
                  {req.owner_email && (
                    <a
                      href={`mailto:${req.owner_email}`}
                      className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-slate-50 transition"
                    >
                      <Mail size={16} />
                      Email Owner
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
