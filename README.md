# 🚀 Rajat Bansal | Cloud & DevOps Portfolio

![DevOps](https://img.shields.io/badge/DevOps-CI%2FCD-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5)
![Jenkins](https://img.shields.io/badge/Jenkins-Pipeline-D24939)
![Status](https://img.shields.io/website?url=https%3A%2F%2Frajat-portfolio.onrender.com)

A fully responsive, modern personal portfolio website designed to showcase my skills in **Cloud Computing, Automation, and Full Stack Development**.

Unlike standard static sites, this project is a **Live DevOps Demo**. It is containerized, managed via Kubernetes manifests, and deployed using a custom Jenkins CI/CD pipeline.

---

## 🌐 Live Demos

| Version | Provider | Description | Link |
| :--- | :--- | :--- | :--- |
| **Frontend Optimized** | **Vercel** | High-speed CDN delivery for instant loading. | [**Visit Vercel Site**](https://rnkbansal.vercel.app/) |
| **DevOps Demo** | **Render** | Docker container deployed via Jenkins Pipeline. | [**Visit Render Site**](https://rnk-dy28.onrender.com/) |

---

## 🛠️ The Architecture (CI/CD Pipeline)

This project demonstrates a complete **GitOps workflow**. Every push to the `main` branch triggers an automated pipeline.

```mermaid
graph LR
    A[Code Push] -->|GitHub Webhook| B(Jenkins Local)
    B -->|Build| C{Docker Image}
    C -->|Push| D[Docker Hub]
    D -->|Pull| E[Kubernetes Cluster]
    E -->|Rolling Update| F[Live Pods]
    B -->|Trigger Webhook| G[Render Cloud]



    
