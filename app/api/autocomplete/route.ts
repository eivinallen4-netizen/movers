const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY || "6c4623bbf24047bd82224404457cde2c";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  console.log("=== AUTOCOMPLETE REQUEST ===");
  console.log("Query param 'q':", query);

  if (!query || query.length < 2) {
    console.log("Query too short or missing, returning empty");
    return Response.json({ items: [] });
  }

  try {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Geoapify Response:", data);

    const calculateSimilarity = (query: string, text: string): number => {
      const q = query.toLowerCase();
      const t = text.toLowerCase();
      let matches = 0;
      for (const char of q) {
        if (t.includes(char)) matches++;
      }
      return matches;
    };

    const items = (data.features || [])
      .map((feature: any, idx: number) => {
        const props = feature.properties || {};
        const coords = feature.geometry?.coordinates || [0, 0];
        const formatted = props.formatted || props.address_line1 || query;
        return {
          title: formatted,
          id: props.place_id || `place-${idx}`,
          address: { label: formatted },
          position: {
            lat: coords[1] || 0,
            lng: coords[0] || 0,
          },
          similarity: calculateSimilarity(query, formatted),
        };
      })
      .sort((a: any, b: any) => b.similarity - a.similarity)
      .map(({ similarity, ...item }: any) => item);

    console.log("Formatted items:", items);
    const responseData = { items };
    console.log("Response data:", responseData);
    console.log("=== END AUTOCOMPLETE REQUEST ===");

    return Response.json(responseData);
  } catch (error) {
    console.error("Geoapify API error:", error);
    console.log("=== END AUTOCOMPLETE REQUEST (ERROR) ===");
    return Response.json({ items: [], error: (error as Error).message }, { status: 500 });
  }
}
