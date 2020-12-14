VERSION := $$(cat package.json | grep version | sed 's/"/ /g' | awk {'print $$3'})

SVC=ioled-frontend-app
PORT=3000
# REGISTRY_URL=gcr.io/ioled-dev-262215

version v:
	@echo $(VERSION)

init i:
	@echo "[prepare] preparing..."
	@npm install

clean c:
	@echo "[clean] cleaning..."

deploy d:
	@npm run build
	@echo "[PROD][App Engine Deployment] Deploying App"
	@gcloud app deploy app-prod.yaml

deploy-dev dev:
	@npm run build
	@echo "[DEV][App Engine Deployment] Deploying App"
	@gcloud app deploy app-dev.yaml

deploy-testing testing:
	@npm run build
	@echo "[DEV][App Engine Deployment] Deploying App"
	@gcloud app deploy app-testing.yaml

run r:
	@echo "[Running] Running frontend service"
	@PORT=$(PORT)
	@npm start

.PHONY: version v prepare pre clean c deploy d run r 