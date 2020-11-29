'use strict';

module.exports.hellowithdb = (event, context, cb) => {
  console.log('Inside the hellowithdb lamdba function');
  context.callbackWaitsForEmptyEventLoop = false;



  const MongoClient = require('mongodb').MongoClient;
  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  console.time("db-connect");

  client.connect(err => {
    console.timeEnd("db-connect");

    if (err) {
      console.log(`conn err: ${err}`);
    }

    const collection = client.db("sample_training").collection("companies");
    // perform actions on the collection object
    collection.findOne({}).then(function (item) {
      console.log(`item: ${JSON.stringify(item.name)}`);

      client.close();

      console.log(2);

      let response = {
        statusCode: 200,
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
        body: JSON.stringify(
          {
            message: process.env.MESSAGE,
            input: event,
          },
          null,
          2
        )
      };

      cb(null, response);

      // return ({
      //   statusCode: 200,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   body: JSON.stringify(
      //     {
      //       message: process.env.MESSAGE,
      //       input: event,
      //     },
      //     null,
      //     2
      //   ),
      // });

    }, function (err) {
      console.log(`collection err: ${err}`);
    });



  });




  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.hello = (event, context, cb) => {
  console.log('Inside the hello lamdba function');
  context.callbackWaitsForEmptyEventLoop = false;

  cb(null, {
    statusCode: 200,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    body: JSON.stringify(
      {
        message: process.env.MESSAGE,
        input: event,
      },
      null,
      2
    )
  });
};