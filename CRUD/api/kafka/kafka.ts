import { Kafka, KafkaConfig} from "kafkajs"
import Users from "../models/userModel.ts"
import Posts from "../models/postModel.ts"

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
