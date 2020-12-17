# main.tf specifies top-level resources used by the configuration

# Enable firebase functionality in the given project.
resource "google_firebase_project" "default" {
  provider = google-beta
}

# Default location for firebase resources.
resource "google_firebase_project_location" "default" {
  location_id = local.default_region

  provider = google-beta
  depends_on = [
    google_firebase_project.default
  ]
}

# A webapp in the firebase project
resource "google_firebase_web_app" "default" {
  display_name = "Experiments"

  provider = google-beta
  depends_on = [
    google_firebase_project_location.default,
  ]
}

# App config for the default webapp
data "google_firebase_web_app_config" "default" {
  web_app_id = google_firebase_web_app.default.app_id
  provider   = google-beta
}
