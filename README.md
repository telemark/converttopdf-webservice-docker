[![Build Status](https://travis-ci.org/telemark/converttopdf-webservice-docker.svg?branch=master)](https://travis-ci.org/telemark/converttopdf-webservice-docker)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# converttopdf-webservice-docker

Upload document, get pdf in return.

## Docker

Build the image

```sh
$ docker build -t pdfconverter .
```

Run the image

```sh
docker run -d -p 80:3000 --name pdf pdfconverter
```

Convert a document

```sh
curl \
  -F "file=@test/data/testdoc.docx" \
  http://192.168.99.100 > converted.pdf
```