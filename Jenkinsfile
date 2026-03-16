pipeline {
    agent any 
    environment{
        IMAGE_NAME= 'vinod5982/node-image'
        
    }
    
    stages{
        stage('checkout'){
            steps{
                echo " checkout the code from github"
                git branch: 'main', url: 'https://github.com/vinod-o/node-ci-cd.git'
            }
        }
        stage('Install dependencies'){
            steps{
                sh ' npm install '
            }
        }
        stage('test'){
            steps{
                sh 'npm test'
            }
        }
        stage('SonarQube'){
            steps{
                script{
                    echo " we need to perform static code analysis here"
                    sh ''' mvn sonar:sonar \\
                        -Dsonar:host.url= http://98.87.156.107:9000/ \\
                        -Dsonar:host.login= sqa_2322cf3fbe6134f8bab1ebe1dcaae1e8a4931eaa '''
                }
            }
        }
        stage('Quality Gate'){
            steps{
                echo " quality gate"
                tiemout(time: 2, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Docker build'){
            steps{
                echo "docker build"
                sh 'docker build -t $IMAGE_NAME:${BUILD_NUMBER} .'
            }
        }
        stage("trivy scan"){
            steps{
                sh ' trivy image --exit-code 1 $IMAGE_NAME:${BUILD_NUMBER}'
            }
        }
        stage('Docker push'){
            steps{
                echo 'push image to docker hub '
                script{
                    withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]){
                        sh ' docker login -u vinod5982 -p ${dockerhub}'
                        sh 'docker push $IMAGE_NAME:${BUILD_NUMBER}'
                        echo 'pushed suscessufully check'
                    }
                }
'
            }
        }
    }
}