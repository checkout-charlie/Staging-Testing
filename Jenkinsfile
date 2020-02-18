pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('build and test') {
      environment {
        // we will be recording test results and video on Cypress dashboard
        // to record we need to set an environment variable
        // we can load the record key variable from credentials store
        // see https://jenkins.io/doc/book/using/using-credentials/
        CYPRESS_RECORD_KEY = credentials('9b333d2c-9a19-43a7-aec1-0c4d18759ef8')
      }

      steps {
        sh 'npm ci'
        sh "npm run test:ci:record"
      }
    }
  }
}
