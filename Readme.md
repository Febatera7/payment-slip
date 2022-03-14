# PaymentSlip
An app that reads a typeable line of slips and generates the barcode, displays the value and expiration date of the same.

# How to use
Download the code and install its dependencies.
After that, create an .env file and choose the port you want. If not, it will automatically run on port 3500.
Run npm run start or yarn run start.
Now just call on the chosen port (or on the default) with the endpoint /boleto/{typeableLine}

# Scripts
yarn run start || npm run start
yarn run test || npm run test
