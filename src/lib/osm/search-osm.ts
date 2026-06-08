"use server";
import { env } from "../env";

type OsmSearchResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};

export const searchOsm = async (
  keyword: string,
): Promise<OsmSearchResult[]> => {
  const params = new URLSearchParams();
  params.append("format", "json");
  params.append("q", keyword);

  try {
    const response = await fetch(env.OSM_URL + "/search?" + params.toString(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PrimePropertyAgentApp/1.0 (admin@primeproindonesia.com)",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OSM search error", error);
    return [];
  }
};
