const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
    projectId: process.env.GCP_PROJECT
});

exports.main = (event, context) => {
    const message = JSON.parse(Buffer.from(event.data, 'base64').toString());
    console.log(`Save Pub/Sub message in db [data=${JSON.stringify(message)}, context=${JSON.stringify(context)}]`);

    const document = firestore.collection(process.env.COLLECTION_NAME).doc(message.uuid);
    return document.set({
        uuid: message.uuid,
        manufacturer: message.manufacturer,
        model: message.model
    }).then(doc => {
        console.log(`Data saved [response=${JSON.stringify(doc)}]`);
    }).catch(err => {
        console.error(err);
        throw new Error(`Error saving data...`);
    });
};
