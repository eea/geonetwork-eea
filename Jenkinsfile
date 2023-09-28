pipeline {
  agent {
    node { label "docker-host" }
  }

  environment {
    GIT_NAME = "geonetwork-eea"
    registry = "eeacms/eea-geonetwork"
    default_branch = "eea-4.2.0"
   }

  stages {

    stage ('Docker build and push') {
      when {
        environment name: 'CHANGE_ID', value: ''
      }

      steps {
        script{
            if (env.BRANCH_NAME == env.default_branch ) {
                tagName = GIT_COMMIT.take(8)
            } else {
                tagName = "$BRANCH_NAME"
            }
            try {
                dockerImage = docker.build("$registry:$tagName", "--pull --no-cache --build-arg COMMIT_OR_BRANCH=$tagName ./build-in-docker/")
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
          emailext (subject: summary, body: details, attachLog: true, compressLog: true, recipientProviders: [ [$class: 'CulpritsRecipientProvider']])
        }
      }
    }
}
