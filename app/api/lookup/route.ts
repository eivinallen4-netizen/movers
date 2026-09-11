const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY || "6c4623bbf24047bd82224404457cde2c";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!id && (!lat || !lng)) {
    return Response.json({ error: "ID or lat/lng required" }, { status: 400 });
  }

  if (lat && lng) {
    return Response.json({
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
      address: { label: `${lat}, ${lng}` }
    });
  }

  try {
    const url = `https://api.geoapify.com/v1/geocode/search?id=${encodeURIComponent(id || "")}&apiKey=${GEOAPIFY_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.results?.[0];

    if (!result) {
      return Response.json({ error: "Place not found" }, { status: 404 });
    }

    return Response.json({
      position: { lat: result.lat, lng: result.lon },
      address: { label: result.formatted }
    });
  } catch (error) {
    console.error("Geoapify lookup error:", error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
