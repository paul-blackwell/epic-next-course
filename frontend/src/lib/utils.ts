import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Flattens the attributes of a given object by merging nested 'attributes' or 'data' objects into the top-level object.
 *
 * @param data - The input data to be flattened. It can be of any type.
 * @returns The flattened object with merged attributes. If the input is not an object, it returns the input as is.
 *
 * @remarks
 * - If the input is an array, the function will recursively apply flattening to each element of the array.
 * - If the input is a plain object, it will recursively merge nested 'attributes' or 'data' objects.
 * - The function skips inherited properties from the prototype chain.
 *
 * @example
 * ```typescript
 * const data = {
 *   id: 1,
 *   attributes: {
 *     name: 'John',
 *     details: {
 *       age: 30
 *     }
 *   },
 *   data: {
 *     info: 'Sample'
 *   }
 * };
 *
 * const flattened = flattenAttributes(data);
 * console.log(flattened);
 * // Output: { id: 1, name: 'John', details: { age: 30 }, info: 'Sample' }
 * ```
 */
export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== 'object' ||
    data === null ||
    data instanceof Date ||
    typeof data === 'function'
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === 'attributes' || key === 'data') &&
      typeof data[key] === 'object' &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
}

/**
 * Returns the full URL for a given media URL from Strapi.
 *
 * @param {string | null} url - The media URL to process.
 * @returns {string | null} - The full URL if the input is a relative URL, or the original URL if it is already a full URL or a data URL. Returns null if the input is null.
 */
export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${getStrapiURL()}${url}`;
}
