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
			}
		}
		stage('release') {
			steps {
				withCredentials([string(credentialsId: 'nexus-ci-npm-token', variable: 'NPM_TOKEN')]) {
					sh 'echo $NPM_TOKEN'
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
