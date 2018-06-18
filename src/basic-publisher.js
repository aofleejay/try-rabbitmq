const amqp = require('amqplib/callback_api')

amqp.connect('amqp://queue:5672', (error, connection) => {
  if (error) {
    console.log('Cannot create connection: ', error)
  } else {
    connection.createChannel((error, channel) => {
      if (error) {
        console.log('Cannot create channel: ', error)
      } else {
        channel.assertQueue('message',  { durable: false }, function(error) {
          if (error) {
            console.log('Cannot assert queue: ', error)
          } else {
            channel.sendToQueue('message', new Buffer('Hello World!'))
          }
        })
      }
    })
  }

  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})
