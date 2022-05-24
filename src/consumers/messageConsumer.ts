import KafkaService from "../services/kafkaService";

class MessageConsumer {

    constructor(private kafkaService = new KafkaService()) {
        this.runConsumers();
    }

    async runConsumers() {
        const consumer = await this.kafkaService.createConsumer('test-message-service');
        consumer.subscribe({ topic: "create-message" });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    key: message.key?.toString(),
                    value: message.value?.toString(),
                    headers: message.headers,
                })

                await this.consumeMessage(topic, message.value!.toString());
            },
        })
    }

    consumeMessage = async (topic: string, message: string) => {
        const obj = JSON.parse(message);

        switch (topic) {
            case 'create-user': {
                console.log('create-user', obj);
                break;
            }
            case 'delete-user': {
                console.log("delete-user", obj);
                break;
            }
        }
    }

}

export default new MessageConsumer();