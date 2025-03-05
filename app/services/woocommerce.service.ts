import OAuth from "oauth-1.0a";
import { createHmac } from "node:crypto"; // Use built-in crypto module
import striptags from "striptags";
import dotenv from "dotenv";

dotenv.config();


export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
}

const API_URL = process.env.WOOCOMMERCE_API_URL ?? "http://localhost/pc-nexus/wp-json/wc/v3";
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY ?? "";
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET ?? "";

if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
  throw new Error("WooCommerce API credentials are missing");
}

// Create OAuth 1.0a client
const oauth = new OAuth({
  consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function(base_string: string, key: string) {
    return createHmac("sha1", key).update(base_string).digest("base64"); 
  },
});

/**
 * Removes HTML tags from a given string.
 * @param {string} html - The HTML string to clean.
 * @returns {string} - Clean text without HTML tags.
 */

const stripHtmlTags = (html: string): string => {
  return striptags(html);
};


/**
 * Fetches products from WooCommerce API using OAuth 1.0a.
 * @param {number} [page=1] - Page number for pagination.
 * @param {number} [limit=10] - Number of products per page.
 * @returns {Promise<Product[]>} - A promise resolving to an array of Product objects.
 */

export const getWooCommerceProducts = async (page = 1, limit = 10): Promise<Product[]> => {
  const url = new URL(`${API_URL}/products`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", limit.toString());

  const request_data = { url: url.toString(), method: "GET" };
  const oauthHeaders = oauth.toHeader(oauth.authorize(request_data));

  const headers: Record<string, string> = {
    ...oauthHeaders,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();

    return products.map((product: any) => ({
      id: product.id || 0,
      name: product.name || "No name",
      price: product.price || "0.00",
      description: stripHtmlTags(product.description) || "No description",
      image: (product.images && product.images[0]?.src) || "https://via.placeholder.com/150",
      rating: parseFloat(product.average_rating) || 0,
      reviews: product.rating_count || 0,
      category: product.categories.length > 0 ? product.categories[0].name : "Uncategorized",
      brand: product.brands.length > 0 ? product.brands[0] : "Unknown",
      permalink: product.permalink || "",
    }));
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return [];
  }
};

