# unity-assignment
## The following repo will trigger a CI/CD pipline that will test, build and deploy a node-js app

This repo is for automating ci/cd. The pipline will trigger for the following branches:
- main       
- develop    
- 'feature/*'
- 'release/*'
- 'hotfix/*'

## 🚀 This is a zero clicks pipline

### 1. **Test**
- Runs on every push, PR, or manual trigger.
- Installs dependencies (`npm ci`).
- Runs unit tests (`npm test`).

### 2. **Build**
- Runs after tests pass.
- Builds a Docker image with a versioned tag.
- Pushes the image to **GitHub Container Registry (GHCR)**.
- Signs the image with **Cosign**.
- Runs a **Snyk container scan**.

### 3. **Deploy to Dev**
- Spins up a **Kind (Kubernetes in Docker)** cluster.
- Deploys the application using the built image.
- Verifies deployment with a `/health` endpoint check.

### 4. **Deploy to Staging**
- Similar to Dev, but runs only if Dev succeeds.
- Ensures promotion to staging works.

### 5. **Deploy to Prod**
- Runs after staging passes & only after a reviewer has approved the deployment step **(change made in the github ui)**
- Deploys to a production Kind cluster.
- Verifies `/health` endpoint.

## 🔒 Security

- **Cosign** signs images for integrity verification.
- **Snyk** scans containers for vulnerabilities (non-blocking).

## 🩺 Healthcheck

- **livenessProbe** → checks if the app is still alive; if it fails, the pod will be restarted.
- **readinessProbe** → checks if the app is ready to serve traffic.
- **curl** → checks the `/health` endpoint at http://localhost:3000/health and outputs whether the check passed or failed

## 📈 Autoscaling

This application supports **horizontal autoscaling** via Kubernetes **Horizontal Pod Autoscaler (HPA)**.  
The number of replicas will automatically scale based on resource usage (CPU in our example).

## ▶️ Running Manually

- Trigger pipeline via **Actions** tab in GitHub using `workflow_dispatch`.

## 🔔 Notiffication to Slack

- Notifications will be sent to Slack via webhook for every deployment stage<br>


## How to Improve this CI/CD and the app performence and stablity

- Adding a cloud provider for kubernetes deployment (AWS/GCP/Azure).
- Implementing terraform to create the cloud provider's infrastructure.
- Adding an industry standard monitoring tool such as DataDog.
- 
- Using a queue system such as ActiveMQ/RabbitMQ.
- Autoscaling by custom app metrics and by queues and not only by CPU/Memory.
- ArgoCD for continuous deployment instead of GitHub Actions. ArgoCD automatically synchronizes your Kubernetes cluster with your repository, making deployments more transparent and enabling easy rollbacks to previous versions.
- Load Balancer like AWS ALB.
- NGINX for the UI.


---

## ✅ Summary
- Automated build & test pipeline  
- Secure image publishing to GHCR  
- Multi-stage Kubernetes deployments: Dev → Staging → Prod  
- Health checks & autoscaling via HPA
