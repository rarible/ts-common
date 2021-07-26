@Library('shared-library') _

pipeline {
	agent any

	options {
		disableConcurrentBuilds()
	}

	stages {
		stage('build') {
			steps {
				sh 'NPM_TOKEN=na yarn install'
				sh 'NPM_TOKEN=na yarn bootstrap'
				sh 'NPM_TOKEN=na yarn clean'
				sh 'NPM_TOKEN=na yarn build-all'
			}
		}
		stage('release') {
			steps {
				withCredentials([string(credentialsId: 'nexus-ci-npm-token', variable: 'TOKEN')]) {
					sh "NPM_TOKEN=$TOKEN yarn release"
        }
			}
		}
	}

	post {
		always {
			sh 'rm -rf node_modules'
		}
	}
}
