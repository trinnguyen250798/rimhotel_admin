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

export default function AddressAutocomplete({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;

  const searchAddress = async (value: string) => {
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `https://us1.locationiq.com/v1/autocomplete.php`,
        {
          params: {
            key: API_KEY,
            q: value,
            format: "json",
            countrycodes: "vn",
            limit: 5,
          },
        }
      );

      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleSelect = (item: any) => {
    setQuery(item.display_name);
    setSuggestions([]);

    onSelect({
      address: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
    });
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => searchAddress(e.target.value)}
        placeholder="Nhập địa chỉ..."
        className="w-full border px-3 py-2 rounded"
      />

      {loading && <div className="text-sm">Đang tìm...</div>}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}