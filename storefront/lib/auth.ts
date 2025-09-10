/*
 * Placeholder for authentication utilities.
 *
 * Saleor and Wagtail authentication flows can be implemented here. For
 * example, you might store JWTs for authenticated customers in HTTP
 * only cookies and expose helpers to retrieve the current customer.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
}

// In a real implementation this function would inspect cookies or
// session storage to return the current user. Returning `null` means
// the visitor is anonymous.
export async function getCurrentUser(): Promise<User | null> {
  return null;
}