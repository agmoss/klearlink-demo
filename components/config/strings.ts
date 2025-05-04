export const strings = {
  app: {
    title: "HTTP Request Dashboard",
    description: "Configure and test API requests with our interactive dashboard",
  },
  useCases: {
    title: "Use Cases",
    description:
      "Select a use case below to learn how to use the dashboard for different API request scenarios.",
  },
  requestConfig: {
    title: "Request Configuration",
    noConfigSelected: "Select a use case to view its request configuration",
    method: {
      get: "GET",
      post: "POST",
      put: "PUT",
      delete: "DELETE",
    },
    sections: {
      headers: "Headers",
      body: "Request Body",
    },
    buttons: {
      sendRequest: "Send Request",
      sending: "Sending...",
    },
  },
  response: {
    title: "Response",
    notAsked: "Send a request to see the response here",
    tabs: {
      body: "Body",
      headers: "Headers",
      raw: "Raw",
    },
  },
} as const;
