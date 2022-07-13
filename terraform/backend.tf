terraform {
  backend "remote" {
    organization = "nogueira_cloud"

    workspaces {
      prefix = "maketheinternetgo_com-"
    }
  }
}