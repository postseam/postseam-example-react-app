# Commands for Git and Protobuf compilation
create_submodule:
	git submodule add -f https://github.com/postseam/postseam-example-api

update_submodules:
	git submodule update --remote --recursive

generate_web_client:
	protoc \
		--js_out=import_style=commonjs:src/generated \
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/generated \
		--proto_path=./postseam-example-api \
		./postseam-example-api/pb/postseam/example/v1/*.proto
