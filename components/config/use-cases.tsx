import { RequestConfig } from "@/lib/reqres";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  requestConfig: RequestConfig;
  expectedResults: string[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com/posts/1";

export const useCases: UseCase[] = [
  {
    title: "Basic GET Request",
    description: "Learn how to make a simple GET request to retrieve data from a public API.",
    steps: [
      "Select GET as the method",
      `Enter ${apiUrl}/posts/1 as the URL`,
      "Click 'Send Request'",
      "Observe the JSON response in the response viewer",
    ],
    requestConfig: {
      method: "GET",
      url: `${apiUrl}/posts/1`,
      headers: [],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing a post object",
      "Response includes id, title, body, and userId fields",
    ],
  },
  {
    title: "POST Request with JSON Body",
    description: "Learn how to create a resource by sending a POST request with a JSON body.",
    steps: [
      "Select POST as the method",
      `Enter ${apiUrl}/posts as the URL`,
      "Add a header with key 'Content-Type' and value 'application/json'",
      "Add the following JSON body:",
      `{
    "title": "My New Post",
    "body": "This is the content of my post.",
    "userId": 1
  }`,
    ],
    requestConfig: {
      method: "POST",
      url: `${apiUrl}/posts`,
      headers: [{ key: "Content-Type", value: "application/json" }],
      body: JSON.stringify(
        {
          title: "My New Post",
          body: "This is the content of my post.",
          userId: 1,
        },
        null,
        2
      ),
    },
    expectedResults: [
      "Status code 201 Created",
      "JSON response containing the created post",
      "Response includes a new id assigned by the server",
    ],
  },
  {
    title: "Error Handling",
    description: "Learn how to handle and interpret error responses from APIs.",
    steps: [
      "Select GET as the method",
      `Enter ${apiUrl}/nonexistent as the URL`,
      "Click 'Send Request'",
      "Observe the error response in the response viewer",
    ],
    requestConfig: {
      method: "GET",
      url: `${apiUrl}/nonexistent`,
      headers: [],
    },
    expectedResults: [
      "Status code 404 Not Found",
      "Empty response body or error message",
      "Error displayed in the response viewer",
    ],
  },
  {
    title: "Working with Headers",
    description: "Learn how to use request headers to modify API behavior.",
    steps: [
      "Select GET as the method",
      `Enter ${apiUrl}/headers as the URL`,
      "Add a custom header with key 'X-Custom-Header' and value 'MyCustomValue'",
      "Click 'Send Request'",
      "Observe your custom header in the response",
    ],
    requestConfig: {
      method: "GET",
      url: `${apiUrl}/headers`,
      headers: [{ key: "X-Custom-Header", value: "MyCustomValue" }],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing a headers object",
      "Response includes your custom X-Custom-Header",
    ],
  },
];
