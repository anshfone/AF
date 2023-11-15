import { Kafka, KafkaConfig} from "kafkajs"
import Users from "../models/userModel.ts"
import Posts from "../models/postModel.ts"

// Download spotify/kafka image & run sudo docker run -p 2181:2181 -p 9092:9092 --name kafka-docker-container3 --env ADVERTISED_HOST=127.0.0.1 --env ADVERTISED_PORT=9092 spotify/kafka

const kafkaConfig: KafkaConfig = {
    clientId: "FoneAce",
    brokers: ["localhost:9092"]
}
const kafka = new Kafka(kafkaConfig)

const consumer = kafka.consumer({ groupId: "recording-group" })
await consumer.connect()
await consumer.subscribe({ topic: "postCreation"})
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const postData = JSON.parse(message.value.toString())
        console.log(postData)
        const user: any = await Users.findOne({email: postData.creatorEmail})
        const newPost: any = new Posts({creator: user.username,...postData,imageId: postData.file?.id}) 
        await newPost.save()
    }
})

export default kafka
