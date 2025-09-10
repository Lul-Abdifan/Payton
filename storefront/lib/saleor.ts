import { GraphQLClient, gql } from 'graphql-request';

/*
 * Saleor GraphQL client wrapper.
 *
 * This module defines typed helper functions to query Saleor's GraphQL API.
 * Each function passes the `channel` from the environment so that pricing
 * and availability are scoped correctly. If the API URL is not provided
 * via the environment the functions return `null` or empty results. In
 * production code you may wish to throw explicit errors instead.
 */

const endpoint = process.env.SALEOR_API_URL ?? '';
const channel = process.env.SALEOR_CHANNEL ?? 'default-channel';
const token = process.env.SALEOR_STOREFRONT_TOKEN;

// Construct the GraphQL client. Include an Authorization header when a
// storefront token is available.
const client = new GraphQLClient(endpoint, {
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// Fetch a single product by its slug. Returns `null` when the product is
// missing or Saleor is not configured.
export async function getProductBySlug(slug: string) {
  if (!endpoint) return null;
  const query = gql`
    query ProductBySlug($slug: String!, $channel: String!) {
      product(slug: $slug, channel: $channel) {
        id
        name
        slug
        description
        pricing {
          priceRangeUndiscounted {
            start {
              amount
              currency
            }
          }
        }
      }
    }
  `;
  try {
    const data = await client.request<{ product: any }>(query, { slug, channel });
    return data.product ?? null;
  } catch (err) {
    console.warn('Saleor getProductBySlug error', err);
    return null;
  }
}

// List a page of products. `first` controls the number of products to
// return and an optional `search` string can filter by name/description.
export async function listProducts({ first = 12, search }: { first?: number; search?: string } = {}) {
  if (!endpoint) return [];
  const query = gql`
    query ListProducts($channel: String!, $first: Int!, $search: String) {
      products(channel: $channel, first: $first, filter: { search: $search }) {
        edges {
          node {
            id
            name
            slug
            pricing {
              priceRangeUndiscounted {
                start {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const variables: any = { channel, first };
    if (search) variables.search = search;
    const data = await client.request<{ products: { edges: { node: any }[] } }>(query, variables);
    const edges = data.products?.edges ?? [];
    return edges.map((edge) => edge.node);
  } catch (err) {
    console.warn('Saleor listProducts error', err);
    return [];
  }
}

// Create a checkout with optional email and line items. Returns the checkout
// id when successful. In a real implementation you would use the mutation
// defined in graphql/createCheckout.gql and include shipping and channel.
export async function createCheckout({
  email,
  lines,
  checkoutInput,
}: {
  email?: string;
  lines: { variantId: string; quantity: number }[];
  checkoutInput?: any;
}) {
  if (!endpoint) return null;
  const mutation = gql`
    mutation CreateCheckout($email: String, $lines: [CheckoutLineInput!]!, $channel: String!) {
      checkoutCreate(input: { email: $email, channel: $channel, lines: $lines }) {
        checkout {
          id
        }
        errors {
          field
          message
        }
      }
    }
  `;
  try {
    const variables = {
      email,
      lines,
      channel,
    };
    const data = await client.request(mutation, variables);
    return data?.checkoutCreate?.checkout ?? null;
  } catch (err) {
    console.warn('Saleor createCheckout error', err);
    return null;
  }
}

// Placeholder functions for remaining checkout mutations. These should be
// implemented as needed using the appropriate Saleor mutations.
export async function addLines(checkoutId: string, lines: { variantId: string; quantity: number }[]) {
  // TODO: implement addLines mutation
  return null;
}

export async function selectShippingMethod(checkoutId: string, shippingMethodId: string) {
  // TODO: implement selectShippingMethod mutation
  return null;
}

export async function completeCheckout(checkoutId: string) {
  // TODO: implement completeCheckout mutation
  return null;
}