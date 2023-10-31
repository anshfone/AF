import { Kafka, KafkaConfig } from "kafkajs"

const kafkaConfig: KafkaConfig = {
    clientId: "FoneAce",
    brokers: ["localhost:9092"]
}

const kafka = new Kafka(kafkaConfig)
console.log(kafka)

// const producer = kafka.producer()
// await producer.connect()
// await producer.send({
//     topic: "recording",
//     messages: [
//         { value: "Hello KafkaJS user !" }
//     ]
// })
// await producer.disconnect()

// const consumer = kafka.consumer({ groupId: "recording-group" })
// await consumer.connect()
// await consumer.subscribe({ topic: "recording", fromBeginning: true })
// await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//             value: message.value.toString()
//         })
//     }
// })