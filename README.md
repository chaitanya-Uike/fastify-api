# fastify-api

## for running the project locally
In the project directory:
  
1) Add a .env file, with following values:

        DB_NAME=your_db_name
        DB_USER=your_db_username
        DB_PASS=your_db_password
        DB_HOST=your_db_host
        ACCESS_TOKEN_SECRET=your_JWT_secret
        REFRESH_TOKEN_SECRET=your_refreh_secret
        ACCESS_TOKEN_EXPIRY=access_token_expiry_time (integer)
        REFRESH_TOKEN_EXPIRY=refresh_token_expiry_time (integer)

2) then run:
   ### `docker compose up -d`

3) then run:
   ### `yarn`

4) finally run:
   ### `yarn start` 
