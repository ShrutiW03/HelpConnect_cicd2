pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ["cat"]
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
      - name: KUBECONFIG
        value: /kube/config
    volumeMounts:
      - name: kubeconfig-secret
        mountPath: /kube/config
        subPath: kubeconfig

  - name: dind
    image: docker:dind
    securityContext:
      privileged: true
    env:
      - name: DOCKER_TLS_CERTDIR
        value: ""
    volumeMounts:
      - name: docker-config
        mountPath: /etc/docker/daemon.json
        subPath: daemon.json

  volumes:
    - name: docker-config
      configMap:
        name: docker-daemon-config
    - name: kubeconfig-secret
      secret:
        secretName: kubeconfig-secret
'''
        }
    }

    environment {
        // 🔐 Supabase (Vite build-time variables)
        VITE_SUPABASE_URL="https://jynjtcputnbzkclrhuip.supabase.co"
        VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bmp0Y3B1dG5iemtjbHJodWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5Nzc1NTAsImV4cCI6MjA4MTU1MzU1MH0.6ZgFMzJ0-WogJVxtMXBpuP2aOxewMxa0VrklHsx8owg"

        // 📦 Image details
        IMAGE_NAME = "helpconnect-frontend"
        IMAGE_TAG  = "latest"
        NEXUS_REGISTRY = "nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085"
        NEXUS_REPO = "2401205-project"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        sleep 15
                        docker build \
                          --build-arg VITE_SUPABASE_URL="${VITE_SUPABASE_URL}" \
                          --build-arg VITE_SUPABASE_ANON_KEY="${VITE_SUPABASE_ANON_KEY}" \
                          -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    withCredentials([string(credentialsId: 'sonar-token-helpconnect', variable: 'SONAR_TOKEN')]) {
                        sh """
                            sonar-scanner \
                              -Dsonar.projectKey=2401205_HelpConnect \
                              -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                              -Dsonar.token=$SONAR_TOKEN \
                              -Dsonar.sources=src \
                              -Dsonar.exclusions=node_modules/**,dist/**
                        """
                    }
                }
            }
        }

        stage('Login to Nexus') {
            steps {
                container('dind') {
                    sh '''
                        docker login ${NEXUS_REGISTRY} -u admin -p Changeme@2025
                    '''
                }
            }
        }

        stage('Tag & Push Image') {
            steps {
                container('dind') {
                    sh '''
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} \
                          ${NEXUS_REGISTRY}/${NEXUS_REPO}/${IMAGE_NAME}:${IMAGE_TAG}

                        docker push \
                          ${NEXUS_REGISTRY}/${NEXUS_REPO}/${IMAGE_NAME}:${IMAGE_TAG}

                        docker image ls
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
           steps {
           container('kubectl') {
             dir('k8s-deployment') {
                sh '''
                    kubectl apply -f deployment.yaml -n 2401205
                '''
                    }
                }
            }
        }
    }
}
