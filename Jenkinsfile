@Library('shared-library') _

pipeline {
	agent any

	options {
		disableConcurrentBuilds()
	}

	stages {
		stage('build') {
			steps {
				sh 'yarn install'
				sh 'yarn bootstrap'
				sh 'yarn clean'
				sh 'yarn build-all'
			}
		}
	}

	post {
		always {
			sh 'rm -rf node_modules'
		}
	}
}
