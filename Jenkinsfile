pipeline {
    agent any

    environment {
        // CHANGE THIS to your DockerHub Username (e.g., rnkbansal)
        DOCKER_IMAGE = 'rnkbansal/portfolio' 
        
        // --- UPDATE THESE TWO LINES TO MATCH YOUR SCREENSHOT ---
        
        // 1. Use the ID exactly as seen in your screenshot
        REGISTRY_CRED = 'dockerhub-credentials' 
        
        // 2. Use the ID exactly as seen in your screenshot
        KUBECONFIG_CRED = 'kubeconfig'
    }
    
    // ... rest of the pipeline stages ...

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:latest .'
                    sh 'docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:$BUILD_NUMBER'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh 'docker push $DOCKER_IMAGE:latest'
                        sh 'docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Updates the image in the deployment to the new build tag
                    sh "kubectl set image deployment/portfolio-deployment portfolio-container=$DOCKER_IMAGE:$BUILD_NUMBER"
                    sh "kubectl rollout status deployment/portfolio-deployment"
                }
            }
        }
    }
}