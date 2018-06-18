const amqp = require('amqplib/callback_api')

amqp.connect('amqp://queue:5672', (error, connection) => {
  if (error) {
    console.log('Cannot create connection: ', error)
  } else {
    connection.createChannel((error, channel) => {
      if (error) {
        console.log('Cannot create channel: ', error)
      } else {
        channel.assertQueue('message', { durable: false })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C")
        channel.consume('message', (msg) => {
          console.log(" [x] Received %s", msg.content.toString())
        }, { noAck: true })
      }
    })
  }
})