const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')


class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
              // файл будет добавлен в корневую директорию
                file.path = name
                await fileService.createDir(file)
            } else {
              // если родительский файл был найден, тогда сначала путь к родительсому, а потом нужное нам имя файла
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                // добавляем к родительскому наш файл
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            // возвращаем в ответе от сервера
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json({files})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    }
}

module.exports = new FileController()