// All files in api/ folder became a routes on back-end

// We can to type the request and response on next using typescript
import { NextApiRequest, NextApiResponse } from "next";

// API Routes - When we need to have more security in our application, we make that operation in a back-end, because if we made this operation on front-end this operation became public. But the NextJS, sometimes for some features, we can make a back-end inside of NextJS, because the NextJS use a Node Server for execute.
// API Routes use Serverless, i.e., it don't execute 24h, that execute when necessary and it's deleted when the operation it's completed
export default (request: NextApiRequest, response: NextApiResponse) => {
  // Inside of this function we can make all operation that we make on a Node back-end
  const users = [
    { id: 1, name: "Hildebrando" },
    { id: 2, name: "Lara" },
    { id: 3, name: "João" },
  ];

  return response.json(users);
};
