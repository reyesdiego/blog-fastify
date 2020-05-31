
up:
	@cd $(shell pwd);\
	docker-compose up -d --build

down:
	@cd $(shell pwd);\
	docker-compose down;\
	docker rm modusbox-nginx -f

stop:
	@cd $(shell pwd);\
	docker-compose stop

build-nginx:
	@cd $(shell pwd)/nginx;\
	docker build -t blog-fastify-nginx:1.0 .;\

stop-nginx:
	@docker stop blog-fastify-nginx

run-nginx: build-nginx
	@docker rm blog-fastify-nginx;\
	docker run --net blog-fastify_default -d -p 8080:80 --link blog-fastify_blog-fastify_1:server --name blog-fastify-nginx  blog-fastify-nginx:1.0