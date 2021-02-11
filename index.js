async function run(){
  console.log("ranning ...");
  const config = {
    auth: {
      clientId: "55755b2f-13a5-408f-b3bb-1c4d51327719", 
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: "http://localhost:8080"

    }
  };

  var client = new Msal.UserAgentApplication(config);
  var request = {
    scopes: ['Group.Read.All']
  };

       let loginResponse = await client.loginPopup(request);

       console.dir(loginResponse);

       let tokenResponse = await client.acquireTokenSilent(request);
       console.dir(tokenResponse);

      let payload = await fetch("https://graph.microsoft.com/v1.0/groups?$filter=adatumisv_courses/id eq '123'&$select=id,displayName,adatumisv_courses", {
         headers: {
           'Authorization': 'Bearer ' + tokenResponse.accessToken
         }
       });

       let json = await payload.json();
       console.dir(json);
      }