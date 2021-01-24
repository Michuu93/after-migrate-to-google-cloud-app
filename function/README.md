#### Login

```
gcloud auth application-default login
```

#### Deploy

```
gcloud functions deploy demo-function --entry-point main --runtime nodejs10 --trigger-topic demo-topic --region europe-west3 --timeout 10 --memory 128MB --max-instances 1 --set-env-vars COLLECTION_NAME=demo-collection --project <TODO_PROJECT_ID>
```
