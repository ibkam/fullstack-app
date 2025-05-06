terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {}

# Create a dedicated network for all containers
resource "docker_network" "app_network" {
  name = "app_network"
}

# PostgreSQL container
resource "docker_container" "db" {
  name  = "db"
  image = "postgres:15"
  env = [
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_DB=mydb"
  ]
  volumes {
    host_path      = abspath("./db")
    container_path = "/docker-entrypoint-initdb.d"
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

# Build Node.js API image
resource "docker_image" "node_app" {
  name = "node-api"
  build {
    context    = "./app"
    dockerfile = "Dockerfile"
  }
}

# Node.js API container
resource "docker_container" "api" {
  name    = "api"
  image   = docker_image.node_app.image_id
  ports {
    internal = 3000
    external = 8000
    ip       = "0.0.0.0"
  }
  env = [
    "DB_PASSWORD=${var.db_password}",
    "NODE_ENV=production"
  ]
  networks_advanced {
    name = docker_network.app_network.name
  }
  depends_on = [docker_container.db]
}

# Build React frontend image (commented out for initial testing)
 resource "docker_image" "react_app" {
   name = "react-frontend"
   build {
     context    = "./frontend"
     dockerfile = "Dockerfile"
   }
 }

# React frontend container (commented out for initial testing)
 resource "docker_container" "frontend" {
   name    = "frontend"
   image   = docker_image.react_app.image_id
   ports {
     internal = 3000
     external = 3000
     ip       = "0.0.0.0"
   }
   env = [
     "REACT_APP_API_URL=http://api:8000"
   ]
   networks_advanced {
     name = docker_network.app_network.name
   }
   depends_on = [docker_container.api]
 }
