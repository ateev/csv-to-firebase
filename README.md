# csv-to-firebase
A small command line tool to update firebase database on firebase from a csv file.

## Installation
```sh
 npm install -g csvtofirebase
```

## Usage
```sh
csvtofirebase <path/to/csv-file> <path/to/private-key-file> "your-database-url.firebaseio.com" <reference in firebase> <key for each csv row>
```

### You can get your private key JSON file by going to [Service Accounts]((https://console.firebase.google.com/u/0/project/offline-cc083/settings/serviceaccounts/adminsdk)) tab in your project's settings page.

## Example
Let's say we have a csv data file containing users information.
Now we wanna store user's data at the `/users` reference in the database.
For each item, we want the key to be userId. So the command that we'll run will be:

```sh
csvtofirebase myUsers.csv private.json "your-database-url.firebaseio.com" users memberId
```

This will save data in the firebase `/users` reference like this:

```
- users
  - 10001
    - name
    - userId
    - favColor
  - 10002
    - name
    - userId
    - favColor
```

License

#### License

MIT © [ateev](https://github.com/ateev)