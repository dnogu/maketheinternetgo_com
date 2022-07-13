terraform {
  backend "remote" {
    organization = "nogueira_cloud"

    workspaces {
      previxprefix = "maketheinternetgo_com-"
    }
  }
}