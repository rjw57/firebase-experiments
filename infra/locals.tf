# locals.tf sets local variables used by the configuration.

locals {
  # Google project of firebase project
  project_id = "experiments-cfec3"

  # Default region for resources
  default_region = "europe-west2"

  # Billing account for project
  billing_account = "01B0CE-083E92-D6CDAA"
}
