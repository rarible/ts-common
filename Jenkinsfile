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
		stage('release') {
			steps {
				withCredentials([string(credentialsId: 'nexus-ci-npm-token', variable: 'NPM_TOKEN')]) {
					sh 'yarn release'
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
