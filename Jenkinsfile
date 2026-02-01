pipeline {
    agent any

    environment {
        // Your Docker Hub Image Name
        DOCKER_IMAGE = 'rnkbansal/portfolio' 
        
        // Ensure these IDs match what you created in the NEW Jenkins Credentials
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
                    // Linux uses 'sh'
                    sh "docker build -t $DOCKER_IMAGE:latest ."
                    sh "docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:$BUILD_NUMBER"
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    echo 'Pushing to Docker Hub...'
                    withCredentials([usernamePassword(credentialsId: REGISTRY_CRED, passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        // Standard Linux login command
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh "docker push $DOCKER_IMAGE:latest"
                        sh "docker push $DOCKER_IMAGE:$BUILD_NUMBER"
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                script {
                    echo 'Deploying to Kubernetes...'
                    
                    // This tells the pipeline to use the 'kubectl' tool you configured in Step 3
                    def kubectl = tool name: 'kubectl', type: 'kubernetes-org.jenkinsci.plugins.kubernetes.cli.KubectlTool'
                    
                    withKubeConfig([credentialsId: KUBECONFIG_CRED]) {
                        // We use ${kubectl} variable to call the command
                        sh "${kubectl} apply -f k8s/deployment.yaml"
                        sh "${kubectl} apply -f k8s/service.yaml"
                        
                        // Force update the image
                        sh "${kubectl} set image deployment/portfolio-deployment portfolio-container=$DOCKER_IMAGE:$BUILD_NUMBER"
                        
                        // Wait for rollout to finish
                        sh "${kubectl} rollout status deployment/portfolio-deployment"
                    }
                }
            }
        }
        
        stage('Update Public Site (Render)') {
            steps {
                script {
                    echo 'Triggering Render Deployment...'
                    // PASTE YOUR RENDER HOOK URL BELOW
                    // Linux has curl built-in, so this works natively
                    sh "curl -X POST https://api.render.com/deploy/srv-YOUR-ID-HERE?key=YOUR-KEY-HERE"
                }
            }
        }
    }
}