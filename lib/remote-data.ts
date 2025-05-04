import type { ResponseData } from "./reqres";

// Define RemoteData type as a generic
export type ApiResponse<T = ResponseData> =
  | { status: "not-asked" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "failure"; error: string };

// Additional utility functions for working with RemoteData
export const fold = <T, R>(
  response: ApiResponse<T>,
  onNotAsked: () => R,
  onLoading: () => R,
  onSuccess: (data: T) => R,
  onFailure: (error: string) => R
): R => {
  switch (response.status) {
    case "not-asked":
      return onNotAsked();
    case "loading":
      return onLoading();
    case "success":
      return onSuccess(response.data);
    case "failure":
      return onFailure(response.error);
  }
};

// Utility to transform the data in a success state
export const map = <T, U>(response: ApiResponse<T>, fn: (data: T) => U): ApiResponse<U> => {
  if (response.status === "success") {
    return {
      status: "success",
      data: fn(response.data),
    };
  }
  return response as ApiResponse<U>;
};

// Utility to chain operations on RemoteData
export const chain = <T, U>(
  response: ApiResponse<T>,
  fn: (data: T) => ApiResponse<U>
): ApiResponse<U> => {
  if (response.status === "success") {
    return fn(response.data);
  }
  return response as ApiResponse<U>;
};

// Define a type for the handlers
type RemoteDataHandlers<T> = {
  notAsked: () => T;
  loading: () => T;
  success: (data: ResponseData) => T;
  failure: (error: string) => T;
};

// Pattern matching function for RemoteData
export function match<T>(response: ApiResponse, handlers: RemoteDataHandlers<T>): T {
  switch (response.status) {
    case "not-asked":
      return handlers.notAsked();
    case "loading":
      return handlers.loading();
    case "success":
      return handlers.success(response.data);
    case "failure":
      return handlers.failure(response.error);
  }
}

// Create a new RemoteData in the not-asked state
export const notAsked = <T>(): ApiResponse<T> => ({ status: "not-asked" });

// Create a new RemoteData in the loading state
export const loading = <T>(): ApiResponse<T> => ({ status: "loading" });

// Create a new RemoteData in the success state
export const success = <T>(data: T): ApiResponse<T> => ({ status: "success", data });

// Create a new RemoteData in the failure state
export const failure = <T>(error: string): ApiResponse<T> => ({ status: "failure", error });
