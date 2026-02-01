pipeline {
    agent any

    environment {
        // Your Docker Hub Username
        DOCKERHUB_USERNAME = "rnkbansal"
        // The Project Name (Image Name)
        APP_NAME = "portfolio"
        // Combined Image Name
        DOCKER_IMAGE_NAME = "${DOCKERHUB_USERNAME}/${APP_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                    // Build the image
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Using the same credentials ID as your working reference
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    echo "Logging in to Docker Hub and pushing..."
                    // Login
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    // Push
                    sh "docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Loading the kubeconfig file securely
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    script {
                        echo "Deploying to Kubernetes..."
                        
                        // 1. Update the image in the deployment
                        // Note: We use 'portfolio-deployment' and 'portfolio-container' based on your YAML files
                        sh "kubectl --insecure-skip-tls-verify=true --kubeconfig=$KUBECONFIG set image deployment/portfolio-deployment portfolio-container=${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"

                        echo "Waiting for rollout..."
                        // 2. Wait for it to finish
                        sh "kubectl --insecure-skip-tls-verify=true --kubeconfig=$KUBECONFIG rollout status deployment/portfolio-deployment"
                    }
                }
            }
        }

        stage('Update Public Site (Render)') {
            steps {
                script {
                    echo "Triggering Render.com Deployment..."
                    // Replace the URL below with your actual Render Deploy Hook
                    // Since this is Linux/BlueOcean, 'curl' works natively
                    sh "curl -X POST https://api.render.com/deploy/srv-YOUR_RENDER_ID?key=YOUR_RENDER_KEY"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            sh "docker logout"
        }
    }
}