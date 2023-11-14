import { Kafka, KafkaConfig} from "kafkajs"
import Users from "../models/userModel"
import Posts from "../models/postModel"

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
        // const user: any = await Users.findOne({email: req.body.creatorEmail})
        // const newPost: any = new Posts({creator: user.username,...req.body,imageId: req.file?.id}) 
        // await newPost.save()
        // console.log({
        //     value: message.value.toString(),
        //     topic: topic,
        //     partition: partition
        // })
    }
})

export default kafka
