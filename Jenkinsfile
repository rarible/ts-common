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
				sh 'lerna version --no-commit-hooks'
			}
		}
	}

	post {
		always {
			sh 'rm -rf node_modules'
		}
	}
}
