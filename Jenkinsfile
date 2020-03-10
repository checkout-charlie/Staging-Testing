def podlabel = "jenkins-builder.${env.JOB_NAME.replace('%2F','_').reverse().take(38).reverse()}.${env.BUILD_NUMBER}".replace('-', '_').replace('/', '_')
pipeline {
  agent {
      
         kubernetes {
     label podlabel
     yaml """
            apiVersion: v1
            kind: Pod
            metadata:
              name: cypress-test-pod
            spec:
              containers:
              - name: cypress
                image: cypress/base:10
                imagePullPolicy: Always
                command: ["/bin/sleep", "infinity"]
            """
  
         }
    }

environment {
        // we will be recording test results and video on Cypress dashboard
        // to record we need to set an environment variable
        // we can load the record key variable from credentials store
        // see https://jenkins.io/doc/book/using/using-credentials/
        CYPRESS_RECORD_KEY = credentials('9b333d2c-9a19-43a7-aec1-0c4d18759ef8')
 }

  stages {
    stage('build and test') {

      steps {
        sh 'npm install'
        sh 'npm ci'
        sh "npm run test:ci:record"
      }
    }
  }
}
