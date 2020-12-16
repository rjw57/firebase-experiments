# main.tf specifies top-level resources used by the configuration

# Enable firebase functionality in the given project.
resource "google_firebase_project" "default" {
  project  = google_project.default.project_id
  provider = google-beta
}
