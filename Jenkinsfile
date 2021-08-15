pipeline {
    agent any
    stages {
        stage('BUILD') { 
            steps {
                sh 'yarn' 
                sh 'yarn build'
                sh 'mv ./build /root/jenkins-test'
            }
        }
    }
}