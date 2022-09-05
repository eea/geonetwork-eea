pipeline {
  agent {
            node { label "docker-host" }
  }

  environment {
    GIT_NAME = "geonetwork-eea"
    SONARQUBE_TAGS = "cr.eionet.europa.eu"
    registry = "eeacms/eea-geonetwork"
   }

  stages {
    
    stage ('Docker build and push') {
      when {
          environment name: 'CHANGE_ID', value: ''
      }
      steps {
        script{
                 sh '''env''' 
                 if (env.BRANCH_NAME == 'michimau-eea-4.2.0') {
                         tagName = '$GIT_COMMIT'
                 } else {
                         tagName = "$BRANCH_NAME"
                 }
                 try {
                          dockerImage = docker.build("$registry:$tagName", "--no-cache ./build-in-docker/")
                          docker.withRegistry( '', 'eeajenkins' ) {
                             dockerImage.push()
                          }
                      } 
                 finally {
                           sh "docker rmi $registry:$tagName"
                      }
            }
          }
        }
    
  }

  post {
      always {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true)
        script {
          def url = "${env.BUILD_URL}/display/redirect"
          def status = currentBuild.currentResult
          def subject = "${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
          def summary = "${subject} (${url})"
          def details = """<h1>${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${status}</h1>
                           <p>Check console output at <a href="${url}">${env.JOB_BASE_NAME} - #${env.BUILD_NUMBER}</a></p>
                        """
          emailext (subject: '$DEFAULT_SUBJECT', to: '$DEFAULT_RECIPIENTS', body: details, recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'CulpritsRecipientProvider']])
        }
      }
    }
}
