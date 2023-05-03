# MinCykel-frontend


## Start Cypress
npm run cypress:open

# Deploy to production 🚀

## Prerequisites

* Logged in to docker (Get the docker credentials from discord)

Remember to test on the production server locally before deploying. See step 3.

### Step 1. Build the app
```console
$ docker build -t jsaad20/production:client .
```

### Step 2. Push to production
```console
$ docker build -t jsaad20/production:client .
```

### Step 3 (Optional). Test the production server locally
Inside /site run the following command to preview how the production server
is going to behave.
```console
$ docker compose up
```

Now go to http://localhost, you should see the site comming up.