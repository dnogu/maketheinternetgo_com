data "cloudflare_zone" "example" {
  name = "maketheinternetgo.com"
}

output "cldname" {
  value = data.cloudflare_zone.example.id
}