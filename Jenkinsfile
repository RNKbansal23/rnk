pipeline {
    agent any

    environment {
        // Your Docker Hub details
        DOCKER_IMAGE = 'rnkbansal/portfolio' 
        REGISTRY_CRED = 'dockerhub-credentials' 
        KUBECONFIG_CRED = 'kubeconfig'
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
                    echo 'Building Docker Image...'
                    // Windows uses 'bat' instead of 'sh'
                    bat "docker build -t %DOCKER_IMAGE%:latest ."
                    bat "docker tag %DOCKER_IMAGE%:latest %DOCKER_IMAGE%:%BUILD_NUMBER%"
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    echo 'Pushing to Docker Hub...'
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        // Windows Login command
                        bat "docker login -u %USER% -p %PASS%"
                        bat "docker push %DOCKER_IMAGE%:latest"
                        bat "docker push %DOCKER_IMAGE%:%BUILD_NUMBER%"
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                script {
                    echo 'Deploying to Kubernetes...'
                    withKubeConfig([credentialsId: KUBECONFIG_CRED]) {
                        // Apply the deployment and service files
                        bat "kubectl apply -f k8s/deployment.yaml"
                        bat "kubectl apply -f k8s/service.yaml"
                        
                        // Force update the image
                        bat "kubectl set image deployment/portfolio-deployment portfolio-container=%DOCKER_IMAGE%:%BUILD_NUMBER%"
                        
                        // Wait for rollout to finish
                        bat "kubectl rollout status deployment/portfolio-deployment"
                    }
                }
            }
        }
    }
}