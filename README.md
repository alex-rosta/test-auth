# Test Auth Project

## Overview
This project is a Flask-based web application that uses OpenID Connect for authentication. It integrates with an external identity provider to retrieve specified claims from the ID-token provided by the Identity Provider. In this case PhenixID and the authentication method is Freja eID.
The claims extracted are:
```yaml
usergivenname: #firstname
usersurname: #surname
registrationlevel: #freja registration level 'plus' is required
ssn: #social security number
country: #iso standard country code
```

## Required `.env` File
To run this project, you need to create a `.env` file in the root directory of the project. The `.env` file should contain the following environment variables:

```yaml
client_id=<Your Client ID>
client_secret=<Your Client Secret>
server_metadata_url=<Your Server Metadata URL>
```

### Example `.env` File
```yaml
client_id=yourid
client_secret=secret
server_metadata_url=https://idppreprod.regionsormland.se/testauth/.well-known/openid-configuration
```

Replace the placeholder values with the actual credentials and metadata URL provided by your identity provider.

## Running the Application
1. Install the required dependencies using `pip install -r requirements.txt`.
2. Ensure the `.env` file is properly configured.
3. Run the application using `python app.py`.

The application will be available at `http://0.0.0.0:5000`. 