# main.tf specifies top-level resources used by the configuration

# Enable firebase functionality in the given project.
resource "google_firebase_project" "default" {
  project  = google_project.default.project_id
  provider = google-beta
}

# A webapp in the firebase project
resource "google_firebase_web_app" "default" {
  project      = google_firebase_project.default.project
  display_name = "Experiments"
  provider     = google-beta
}
