pipeline {
    agent any
    stages {
        stage('BUILD') { 
            steps {
                sh 'yarn' 
                sh 'yarn build'
                sh 'mv . ~/jenkins-test'
            }
        }
    }
}