/**
 * Utility functions for the HTTP Request Dashboard
 */

/**
 * Formats a JSON object for display
 * @param json - JSON object to format
 * @returns Formatted JSON string
 */
export function formatJSON(json: any): string {
  try {
    return JSON.stringify(json, null, 2);
  } catch (error) {
    return String(json);
  }
}

/**
 * Checks if a string is valid JSON
 * @param str - String to check
 * @returns Whether the string is valid JSON
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
