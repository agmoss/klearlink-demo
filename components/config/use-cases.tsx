import { RequestConfig } from "@/lib/reqres";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  requestConfig: RequestConfig;
  expectedResults: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const LENDER_KEY = process.env.NEXT_PUBLIC_LENDER_KEY || "";
const UC_I_CC_ID = process.env.NEXT_PUBLIC_UC_I_CC_ID || "";
const UC_2_CC_ID = process.env.NEXT_PUBLIC_UC_2_CC_ID || "";
export const apiUseCases: UseCase[] = [
  {
    title: "Submit Consumer Credit Record",
    description: "Create a new consumer credit record with personal and credit information.",
    steps: [
      "Select PUT as the method",
      `Enter ${API_URL}/consumer-credit/123 as the URL`,
      "Add Authorization header with your API key",
      "Add Content-Type header with value 'application/json'",
      "Add the following JSON body:",
      `{
  "consumer_facts": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "date_of_birth": "1990-01-01",
    "address": "123 Main St, Toronto, ON M5V 2H1",
    "phone_number": "+14165551234",
    "institution_names": ["Bank A", "Bank B"]
  },
  "credit_facts": {
    "amount": 1000.00,
    "credit_type": "PDL",
    "application_datetime": "2024-03-20T10:00:00Z",
    "credit_state": "application"
  }
}`,
    ],
    requestConfig: {
      method: "PUT",
      url: `${API_URL}/consumer-credit/123`,
      headers: [
        { key: "Authorization", value: `Apikey ${LENDER_KEY}` },
        { key: "Content-Type", value: "application/json" },
      ],
      body: JSON.stringify(
        {
          consumer_facts: {
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            date_of_birth: "1990-01-01",
            address: "123 Main St, Toronto, ON M5V 2H1",
            phone_number: "+14165551234",
            institution_names: ["Bank A", "Bank B"],
          },
          credit_facts: {
            amount: 1000.0,
            credit_type: "PDL",
            application_datetime: "2024-03-20T10:00:00Z",
            credit_state: "application",
          },
        },
        null,
        2
      ),
    },
    expectedResults: [
      "Status code 201 Created",
      "JSON response containing the created consumer credit record",
      "Response includes created_at and updated_at timestamps",
    ],
  },
  {
    title: "Update Consumer Credit Record",
    description: "Update an existing consumer credit record with new information.",
    steps: [
      "Select POST as the method",
      `Enter ${API_URL}/consumer-credit/123 as the URL`,
      "Add Authorization header with your API key",
      "Add Content-Type header with value 'application/json'",
      "Add the following JSON body:",
      `{
  "credit_facts": {
    "credit_state": "originated",
    "originated_datetime": "2024-03-21T15:30:00Z",
    "payment_due_date": "2024-04-21T15:30:00Z",
    "payment_due_amount": 1100.00
  }
}`,
    ],
    requestConfig: {
      method: "POST",
      url: `${API_URL}/consumer-credit/123`,
      headers: [
        { key: "Authorization", value: `Apikey ${LENDER_KEY}` },
        { key: "Content-Type", value: "application/json" },
      ],
      body: JSON.stringify(
        {
          credit_facts: {
            credit_state: "originated",
            originated_datetime: "2024-03-21T15:30:00Z",
            payment_due_date: "2024-04-21T15:30:00Z",
            payment_due_amount: 1100.0,
          },
        },
        null,
        2
      ),
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing the updated consumer credit record",
      "Response includes updated_at timestamp",
    ],
  },
  {
    title: "View Consumer Credit Record",
    description: "Retrieve details of a specific consumer credit record.",
    steps: [
      "Select GET as the method",
      `Enter ${API_URL}/consumer-credit/123 as the URL`,
      "Add Authorization header with your API key",
      "Click 'Send Request'",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/123`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_KEY}` }],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing the consumer credit record",
      "Response includes consumer_facts and credit_facts",
    ],
  },
  {
    title: "Check Consumer Match",
    description: "View inter-organizational consumer match results for a record.",
    steps: [
      "Select GET as the method",
      `Enter ${API_URL}/consumer-credit/123/consumer-match as the URL`,
      "Add Authorization header with your API key",
      "Click 'Send Request'",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/123/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_KEY}` }],
    },
    expectedResults: [
      "Status code 200 OK",
      "JSON response containing consumer match results",
      "Response includes match statistics and potential matches",
    ],
  },
];

export const demoUseCases: UseCase[] = [
  {
    title: "New Account 3rd Party Fraud",
    description:
      "Fraud rings intentionally use BNPL offers by cashing in on it multiple times using duplicate accounts. To make this possible, fraudsters need to create numerous accounts and then cash in on the BNPL offer repeatedly, exponentially increasing their profit.  This fraud causes significant losses for BNPLs that often go undetected.",
    steps: [
      "Fraudster aims to purchase a small ticket item with BNPL 1.",
      "The transaction size is $250",
      "Fraudster completes transaction with BNPL 1 and repays in full.",
      "The fraudster then aims to purchase a couch with BNPL 1 for $1,500 using the same account.",
      "The fraudster completes the second transaction with $1,075 at credit risk for BNPL 1.",
      "The fraudster then creates a duplicate account to purchase a different product with BNPL 1.",
      "The fraudster completes third purchase transaction with BNPL 1 within 5 minutes.",
      "The transaction size is $1,200 with a credit risk exposure of $900.",
      "Total credit risk exposure is now $1,975 with BNPL 1.",
      "The fraudster then attempts to purchase an item with BNPL 2 using the same profile credentials as the first transaction with BNPL 1.",
      "The transaction size is $250.",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_I_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_KEY}` }],
    },
    expectedResults: [
      "Using KlearSync to access a KlearProfile match successfully, the BNPL provider is able to benefit by:",
      "Reducing third-party fraud chargeoff by saving a potential loss of $250 (or greater)",
      "Reduce charge-off risk resulting from new customers",
    ],
  },
  {
    title: "New Customer Credit Risk",
    description: "BNPL providers have increased credit risk with new users, and limited view on Lenders have limited tools to view positive & negative payment compliance with other lenders at the time of the first credit decision and as borrowing cycles continue.",
    steps: [
      "Customer applies for the first time online for a BNPL product with BNPL provider",
      "The transaction size is $600",
      "BNPL provider defaults to a pay-in-four offer, however New users with BNPL provider are typically offered a maximum transaction size of $200.  This makes the new user ineligible to access the BNPL loan.",
      "The customer is new to the BNPL provider and has never transacted previously with the provider.",
      "BNPL provider is unsure how the new customer has performed, and is performing, on other short-term credit products.",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_2_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_KEY}` }],
    },
    expectedResults: [
      "Using KlearSync to access a KlearProfile match successfully, the BNPL provider can benefit by:",
      "Increasing their transaction size for a new customer by 400%",
      "Reduce charge-off risk resulting from new customers",
      "Increase corresponding revenues from new customer risk-based acquisition",
    ],
  },
];
