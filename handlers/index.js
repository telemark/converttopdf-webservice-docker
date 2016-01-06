'use strict'

var fs = require('fs')
var uuid = require('uuid')
var unoconv = require('unoconv2')

function showFrontpage (request, reply) {
  reply({
    message: 'Only POST is supported'
  })
}

function handleUpload (request, reply) {
  var data = request.payload
  if (data.file) {
    var nameArray = data.file.hapi.filename.split('.')
    var fileEndingOriginal = nameArray.pop()
    var newNameConverted = nameArray.join('.') + '.pdf'
    var temporaryName = uuid.v4()
    var pathPre = process.cwd() + '/uploads/' + temporaryName
    var fileNameTempOriginal = pathPre + '.' + fileEndingOriginal
    var fileNameTempConverted = pathPre + '.pdf'
    var file = fs.createWriteStream(fileNameTempOriginal)

    file.on('error', function (error) {
      reply(error)
    })

    data.file.pipe(file)

    file.on('finish', function (err) {
      if (err) {
        reply(err)
      } else {
        unoconv.convert(fileNameTempOriginal, 'pdf', function (err, result) {
          if (err) {
            reply(err)
          } else {
            fs.writeFile(fileNameTempConverted, result, function (err) {
              if (err) {
                reply(err)
              } else {
                reply.file(fileNameTempConverted, {
                  filename: newNameConverted
                }).on('finish', function(){
                  fs.unlink(fileNameTempOriginal)
                  fs.unlink(fileNameTempConverted)
                })
              }
            })
          }
        })
      }
    })
  }
}

module.exports.showFrontpage = showFrontpage

module.exports.handleUpload = handleUpload
