# Local MFA in PowerApps

MFA in PowerApps is nearly impossible to implement when using out-of-the-box components like Microsoft Authenticator.
A good alternative is to implement your own MFA.

## How to set up a local MFA?
MFA in this applet is build around usage of tokens.
When a user hasn't validated a token and tries to access local data that's private, the user is navigated to a sign-on screen.

## The MFA implementation
Once the user hits the sign-on screen, a record is created and a code will be send to the user via mail.
Once the user fills in the correct code, the session is validated and users can access restricted data.

## The solution
The solution contains an app, flow and a table. Everything is ready to role, simply import it and set the connections from the PowerAutomate flow to your own and enjoy!
