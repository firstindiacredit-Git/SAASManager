import { useState } from "react";

const TrafficChecker = () => {
  const [url, setUrl] = useState(""); // User input
  const [trafficData, setTrafficData] = useState(null); // API response data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Function to extract the domain from a URL
  const extractDomain = (inputUrl) => {
    try {
      const { hostname } = new URL(inputUrl); // Extract hostname from URL
      return hostname.replace(/^www\./, ""); // Remove 'www.' if present
    } catch {
      return inputUrl; // Return as-is if it's already a domain
    }
  };

  // Handle form submission
  const handleUrlSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    setLoading(true);

    const domain = extractDomain(url); // Sanitize the URL input

    try {
      const response = await fetch(
        `https://similarweb-traffic.p.rapidapi.com/traffic?domain=${domain}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": "4418627201msh7986898a90dc9b9p11b3a7jsn0fc2cf19b847", // Replace with your key
            "x-rapidapi-host": "similarweb-traffic.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();

      console.log("API Response:", data); // Log API response for debugging

      if (response.ok) {
        const trafficSources = data?.TrafficSources || {};
        const topCountries = data?.TopCountryShares?.map(
          (country) => `${country.CountryCode} (${(country.Value * 100).toFixed(2)}%)`
        );

        setTrafficData({
          totalVisits: data?.Engagments?.Visits || "N/A",
          topCountries: topCountries || [],
          trafficSources: {
            Direct: (trafficSources.Direct || 0) * 100,
            Search: (trafficSources.Search || 0) * 100,
            Social: (trafficSources.Social || 0) * 100,
            Mail: (trafficSources.Mail || 0) * 100,
            Referrals: (trafficSources.Referrals || 0) * 100,
            PaidReferrals: (trafficSources["Paid Referrals"] || 0) * 100,
          },
        });
      } else {
        setError(data.message || "No traffic data available for this domain.");
      }
    } catch (err) {
      setError("An error occurred while fetching traffic data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-xl font-bold">Website Traffic Checker</h1>
      </header>

      {/* Input Form */}
      <div className="mt-6 text-center">
        <form onSubmit={handleUrlSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter Website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-3/4 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Check Traffic
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Traffic Data Display */}
      <div className="mt-10">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {trafficData && (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Traffic Data for {extractDomain(url)}
            </h2>
            <ul className="list-disc pl-6">
              <li>Total Visits: {trafficData?.totalVisits || "N/A"}</li>
              <li>
                Top Countries:{" "}
                {trafficData?.topCountries?.length > 0
                  ? trafficData.topCountries.join(", ")
                  : "N/A"}
              </li>
              <li>
                Traffic Sources:
                <ul className="pl-4 list-circle">
                  {Object.entries(trafficData?.trafficSources || {}).map(
                    ([source, value]) => (
                      <li key={source}>
                        {source}: {value.toFixed(2)}%
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficChecker;
