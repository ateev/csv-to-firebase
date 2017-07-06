# csv-to-firebase
A small command line tool to update firebase database on firebase from a csv file

## Installation
```sh
 npm install -g csvtofirebase
```

## Usage
```sh
csvtofirebase <csv file> <firebase json config> <reference in firebase> <key for each row>
```

Store the firebase config in a JSON file.
```javascript
// firebase.json
{
  "apiKey": "xxx",
  "authDomain": "your-app.firebaseapp.com",
  "databaseURL": "https://your-app-db.firebaseio.com",
  "projectId": "your-app-id",
  "storageBucket": "your-app-storage",
  "messagingSenderId": "your-app-messaging-id"
}
```

## Example
I have a csv data file containing users.
I wanna store my data at the `/users` reference in the database.
The key for each item I want to be userId. My command will be:

```sh
csvtofirebase myUsers.csv config.json users memberId
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

