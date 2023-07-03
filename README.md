# Cloud Dashboard Application

## Overview

This application provides a custom dashboard for cloud administrators to view all active EC2 instances. It allows auditors to have visibility into the cloud infrastructure without granting them access to the AWS Console.

## Usage

You can access the app hosted on [Amplify](https://main.d3g8d9r9t5d169.amplifyapp.com/), or clone this repo and run it locally.

If you wish to access the hosted version, contact me for credentials.

In order to run it locally you will need to set the `VITE_INSTANCES_ENDPOINT` and `VITE_LOGIN_ENDPOINT` ENV variables, which should be included in the `.env` file. You can contact me if you want the values used by the live version, or you can use your own.

`VITE_LOGIN_ENDPOINT` should take `email` and `password` as body params, and return an object containing a `token` property, containing the user's token

`VITE_INSTANCES_ENDPOINT` should take the `sortBy` and `sortDirection` strings, and the `page` and `pageSize` integers as body params, and return an object containing a `list` property, containing an array of `Instance` type objects (found in the `types` folder), and a `count` integer.

## Commands

`yarn dev` runs the app locally on port 5173.
`yarn build` creates a production bundle.
