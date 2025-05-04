import type { ApiResponse } from "./remote-data";
import type { ResponseData } from "./reqres";

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
