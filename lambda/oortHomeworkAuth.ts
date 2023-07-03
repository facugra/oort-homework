import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export const handler = async (event, context) => {
  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid Request" }),
    };
  const { email, password } = JSON.parse(event.body);

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "REPLACE_CLIENT_ID_HERE",
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.AuthenticationResult.IdToken }),
    };
  } catch (error) {
    console.error("Authentication failed:", error);

    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Authentication failed" }),
    };
  }
};
