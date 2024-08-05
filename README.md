# Job board project implementation
This repo contains the job board project [implementation](https://github.com/WebDevSimplified/React-Simplified-Bonus-Project/tree/main/job-board/before) of [React simplified](https://courses.webdevsimplified.com/view/courses/react-simplified-bonus-projects) course  [React Basic and Intermediate] course.

### Frontend Setup

To get the frontend setup running you will need to do the following:
1. Navigate to the client folder `cd client`
2. Run `npm install`
3. Run `npm run dev`

### Backend Setup

To get the backend setup running you will need to do the following:

1. Install Sqlite on your machine
2. Run `npm i`
3. Copy the `.env.example` file to `.env`
4. Run `npx prisma db push`
5. Run `npm run dev`

### API Documentation

Overall the API is broken down into 3 main routes which will each help you tackle a different task.

#### User Routes

1. `POST /users/login` - This takes a simple email/password and will return the user id/email if the credentials are correct. It will also set a cookie in the browser with the user's session. As long as you ensure you always pass the cookie up with each request you will be authenticated. This cookie stays valid for a week which means you can close the browser and come back later and still be logged in.
2. `POST /users/signup` - This route works pretty much identically to the login route, but it will create a brand new user as long as their password meets all requirements. It will also return the user id/email and set a cookie in the browser.
3. `DELETE /users/logout` - This route will clear the cookie in the browser and log the user out.
4. `GET /users/session` - This route will return the user id/email of the currently logged in user. This is useful for getting the user id/email if they leave the page and come back later while their session cookie is still active.

#### Job Listing Routes

1. `GET /job-listings/published` - This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
2. `GET /job-listings/my-listings` - This route will return all the job listings for the currently logged in user (even if they are not published).
3. `POST /job-listings` - This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
4. `PUT /job-listings/:id` - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
5. `DELETE /job-listings/:id` - This route will delete the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the deleted job listing.
6. `POST /job-listings/:id/create-publish-payment-intent` - This route is used as part of our Stripe integration to create a payment intent for the job listing with the given id. This needs to be given a duration for how long to post the job listing for. This will only work if the user is authenticated and the owner of the job listing. It will return the payment intent to be used with Stripe. If you want to learn more checkout the documentation on Stripe for [accepting payments](https://stripe.com/docs/payments/quickstart).

#### Stripe Routes

1. `POST /stripe-webhooks/job-listing-order-complete` - This is not a route that you will need to directly call. Stripe will call this route for us whenever a payment is successfully made and it will update the job listing with the new expiration date. Our dev ops team will set up this webhook in production, but to test this webhook locally you will need to use Stripe's CLI. I will explain more about that in the next section.

### Stripe Setup
We use Stripe to handle all of our payments. This means that you will need to create a Stripe account to test the application. Stripe will ask you for a bunch of information in order to accept payment in production, but you can skip most of that as your account will only ever be needed for testing in development. The most important thing you will need from Stripe is your secret API key. This should be saved in your .env file as `STRIPE_SECRET_KEY`. You will see that we have a `.env.example` file that you can copy to get the basic env variables setup.

#### Webhook Setup

You may notice that this project comes with 3 stripe files in the root of the project. These are the 3 versions of the Stripe CLI that you can use if the version from Stripe's site does not work properly. These are used to help with testing the webhook locally. You can read more about how to test webhooks [here](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local). You must have a Stipe account and be logged in to view this page.

For our particular use case you will want to run the following commands to test the webhook locally:

```bash
stripe login
stripe listen --forward-to localhost:3000/stripe-webhooks/job-listing-order-complete
```

Just replace `stripe` with the correct version of the CLI you are using. For example, if you are one a Mac you should use `stripeMac` instead of `stripe`. If you download and use the CLI directly from Stripe's site you should be able to just use `stripe` as the command.

Once you run the `stripe listen` command you should see a webhook signing secret printed out in the terminal. You will need to copy this and add it to your `.env` file as `STRIPE_ORDER_COMPLETE_WEBHOOK_SECRET`. Once that is done you should be able to test publishing jobs as long as the stripe CLI listen command is running.

### Other Environment Variables

The only other thing you need to change is the `SESSION_SECRET`. This should be set to something random. For testing purposes you can leave it as is or just create something like a random UUID, but in production our devops team will create a unique secrets for us to use.
