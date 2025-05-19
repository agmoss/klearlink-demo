import { RequestConfig } from "@/lib/reqres";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  requestConfig: RequestConfig;
  expectedResults: {
    solution: string;
    steps: string[];
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const LENDER_KEY = process.env.NEXT_PUBLIC_LENDER_KEY || "";
const UC_1_CC_ID = process.env.NEXT_PUBLIC_UC_1_CC_ID || "";
const UC_2_CC_ID = process.env.NEXT_PUBLIC_UC_2_CC_ID || "";
const UC_3_CC_ID = process.env.NEXT_PUBLIC_UC_3_CC_ID || "";
const UC_4_CC_ID = process.env.NEXT_PUBLIC_UC_4_CC_ID || "";

const LENDER_1_KEY = process.env.NEXT_PUBLIC_LENDER_1_KEY || "";
const LENDER_2_KEY = process.env.NEXT_PUBLIC_LENDER_2_KEY || "";
const LENDER_3_KEY = process.env.NEXT_PUBLIC_LENDER_3_KEY || "";
const LENDER_4_KEY = process.env.NEXT_PUBLIC_LENDER_4_KEY || "";
const LENDER_5_KEY = process.env.NEXT_PUBLIC_LENDER_5_KEY || "";

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
    expectedResults: {
      solution: "",
      steps: [
        "Status code 201 Created",
        "JSON response containing the created consumer credit record",
        "Response includes created_at and updated_at timestamps",
      ],
    },
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
    expectedResults: {
      solution: "",
      steps: [
        "Status code 200 OK",
        "JSON response containing the updated consumer credit record",
        "Response includes updated_at timestamp",
      ],
    },
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
    expectedResults: {
      solution: "",
      steps: [
        "Status code 200 OK",
        "JSON response containing the consumer credit record",
        "Response includes consumer_facts and credit_facts",
      ],
    },
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
    expectedResults: {
      solution: "",
      steps: [
        "Status code 200 OK",
        "JSON response containing consumer match results",
        "Response includes match statistics and potential matches",
      ],
    },
  },
];

export const demoUseCases: UseCase[] = [
  {
    title: "New Customer TTV Optimization",
    description:
      "BNPL providers have increased credit risk with new customers, mitigated in part by offering a lower first-time limit.  Limited options are available to provide real-time positive (& negative) payment compliance with other lenders at the time of the first credit decision in order to optimize the TTV offering to the new customer, without increasing chargeoff risk.",
    steps: [
      "Customer applies for the first time for a  BNPL product with BNPL provider",
      "The transaction size is $600",
      "BNPL provider defaults to a pay-in-four offer, however New users with BNPL provider are typically offered a maximum transaction size of $200.  This makes the new user ineligible to access the BNPL loan.",
      "The customer is new to the BNPL provider and has never transacted previously with the provider.",
      "BNPL provider is unsure how the new customer has performed, and is performing, on other short-term credit products.",
      "The customer declines the BNPL offer of $150 due to a low credit limit, resulting in a lost opportunity for the BNPL.",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_1_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_2_KEY}` }],
    },
    expectedResults: {
      solution:
        "Using the KlearLink system, the BNPL provider receives a KlearLink match. With this match, the BNPL provider is able to see:",
      steps: [
        "Real-time credit profile data providing up-to-the-minute clarity on risk attributes of the customer",
        "Granular positive payment performance of BNPL and other short-term credit: The new customer has four closed BNPL tradelines on their KlearProfile, and only one active tradeline with another BNPL with an original balance of $400, and a current balance of $100",
        "Outstanding balances owing and upcoming payments on other short-term credit products that the consumer holds: The New customer has one upcoming payment for $100 that will fully satisfy and close the only outstanding BNPL tradeline on the customer’s KlearProfile",
        "Application and credit consumption velocity rates of the new customer to determine appropriate debt thresholds: The new customer’s KlearProfile indicates no new applications in the last 3 weeks for any short-term credit products reported, indicating that this customer is a paceful consumer of BNPL services and a responsible borrower.",
      ],
    },
  },
  {
    title: "Bust Out Fraud",
    description:
      "Fraud rings target BNPL with long-term strategies.  To make this possible, fraudsters either steal an identity or create a synthetic ID and begin obtaining credit from providers.  Taking a patient approach, these fraudsters perform positively with their credit, repaying on time until they can achieve the maximum credit available under the false ID.  Once this occurs, the fraudsters “bust out” and do not repay, causing increased chargeoffs for BNPL providers.  ",
    steps: [
      "Fraudster obtains 4 BNPL tradelines in a span of 7 days using a stolen identity, totalling $1,000 in credit outstanding on a $1,200 TTV.",
      "Fraudster repays all of the tradelines as agreed",
      "Fraudster obtains another 4 with the same providers, now totalling $2,500 in credit outstanding.",
      "All tradelines paid as agreed.",
      "Fraudster applies for a BNPL with a 5th provider for $300",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_2_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_5_KEY}` }],
    },
    expectedResults: {
      solution:
        "Using the KlearLink system, the 5th BNPL provider receives a KlearLink match. With this match, BNPL 5 can see:",
      steps: [
        "IP geo-locating data on the original 4 BNPL tradelines on the KlearProfile",
        "Fraud Scoring - assigns a KlearFraud Score rating based on a combination of likelihood of account duplicity, TxV, # of IP addresses used in the last 1 month, and more.",
        "Transaction Velocity Flags - returns a flag based on the speed and frequency of sector and non-sector-related transactions.",
        "Transaction Velocity Score: Attaches a risk score based on the speed and frequency with which the original applications and originations occurred.",
      ],
    },
  },
  {
    title: "Reduce Chargeoff Risk with Real-Time Decisioning Data",
    description:
      "New customers, thin file and unscorable customers present increased chargeoff risk for BNPL providers, with limited tools to perform decisioning using accurate, real-time credit performance and profile data and insights on these customers to mitigate risk.",
    steps: [
      "Customer applies for the first time online for a BNPL product with a BNPL provider",
      "The transaction size is $200",
      "The customer is new to the BNPL provider and has never transacted previously with the provider.",
      "BNPL provider is unsure how the new customer has performed, and is performing, on other short-term credit products",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_3_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_4_KEY}` }],
    },
    expectedResults: {
      solution:
        "Using the KlearLink system during initial credit application, the BNPL provider receives a KlearLink match. With this match, the BNPL sees:",
      steps: [
        "Granular, positive, and negative BNPL and other sector payment performance: The new customer has one other BNPL tradeline for $100 on their KlearProfile, opened 3 weeks ago. The tradeline is non-compliant.",
        "Real-time decisioning data on the customer: The customer was recently declined for two other BNPL loans within the last 24 hours.",
        "View attribute data indicators involving inquiry velocity and origination velocity, as well as over 50 attributes providing insights into the new customer.",
        "A KlearScore risk score on the new customer to determine the overall credit quality of the customer based on their KlearProfile data and attributes",
      ],
    },
  },
  {
    title: "Chargeoff Risk Mitigation with Existing Customers",
    description:
      "BNPLs lack visibility and tools into how their existing consumers are performing with other short-term credit tradelines, ultimately taking on undue risk with specific existing customers whose risk profile is increasing due to changing variables.",
    steps: [
      "A New Customer completes their first purchase with BNPL 1 for a TTV of $500 and a Pay-in-4 structure of $100 every two weeks.",
      "New Customer completes their first BNPL 1 loan as agreed with no late or returned payments. ",
      "Two months later, a new customer comes back to BNPL 1 to transact again, this time for a TTV of $1,000.",
      "BNPL 1 must decision again to approve the returning customer’s purchase request of $800 in credit outstanding.",
    ],
    requestConfig: {
      method: "GET",
      url: `${API_URL}/consumer-credit/${UC_4_CC_ID}/consumer-match`,
      headers: [{ key: "Authorization", value: `Apikey ${LENDER_1_KEY}` }],
    },
    expectedResults: {
      solution:
        "Using the KlearLink system at the time of initial credit application, the BNPL provider receives a KlearLink match and sets up five flags on the KlearWatch system. With these real-time flag notifications, the BNPL 1 sees:",
      steps: [
        "In the 3 weeks leading up to the returning customer’s purchase request, BNPL obtains a Real-time non-compliance flag alerting BNPL 1 that the customer is non-compliant on two other BNPL tradelines in the data ",
        "Inquiry Flag alerts indicating that the returning customer applied for three other BNPL loans and was declined on 1",
        "Origination Flag Alerts confirming to BNPL 1 that the returning customer obtained two other BNPL loans in the last 7 days.",
        "Granular positive and negative payment performance of BNPL and other short-term credit: The new customer has 3 BNPL tradelines for $200 each on their KlearProfile, all opened within the last 4 weeks with other providers. Every tradeline is non-compliant.",
      ],
    },
  },
];
