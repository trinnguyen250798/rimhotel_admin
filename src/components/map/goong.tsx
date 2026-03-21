"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  onSelect: (data: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function GoongAddress({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_GOONG_API_KEY;

  const search = async (value: string) => {
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://rsapi.goong.io/Place/AutoComplete",
        {
          params: {
            api_key: API_KEY,
            input: value,
          },
        }
      );

      setSuggestions(res.data.predictions || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = async (item: any) => {
    setQuery(item.description);
    setSuggestions([]);

    // 👉 gọi geocode để lấy lat/lng
    const res = await axios.get(
      "https://rsapi.goong.io/Geocode",
      {
        params: {
          api_key: API_KEY,
          address: item.description,
        },
      }
    );

    const location = res.data.results[0]?.geometry?.location;

    onSelect({
      address: item.description,
      lat: location.lat,
      lng: location.lng,
    });
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Nhập địa chỉ..."
        className="w-full border px-3 py-2 rounded"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}