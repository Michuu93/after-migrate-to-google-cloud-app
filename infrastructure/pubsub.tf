resource "google_pubsub_topic" "demo-pubsub" {
  provider = google-beta
  name = var.pubsub-topic
}
