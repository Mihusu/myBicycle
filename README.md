# minCykel-frontend


## Start Cypress
npm run cypress:open

# Deployment

### Step 1. Build the app
```console
$ docker build -t client.prod:latest .
```

### Step 2 (Optional). Test the production server locally
Inside /site run the following command to preview how the production server
is going to behave.
```console
$ docker compose up
```